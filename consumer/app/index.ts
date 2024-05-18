import amqp from 'amqplib';
const process = require('node:process');

const queue = 'product_inventory';

const queueConfig = {
	durable: true,
	messageTtl: 30 * 24 * 60 * 60 * 1000
};

const whoAmI = process.env?.CONSUMER_ID || 'error';

(async () => {
	try {
		const connection = await amqp.connect('amqp://rabbitmq');
		const channel = await connection.createChannel();

		process.once('SIGINT', async () => {
			await channel.close();
			await connection.close();
		});

		await channel.assertQueue(queue, queueConfig);
		await channel.consume(
			queue,
			(message) => {
				if (message) {
					console.log(
						` [x] ${whoAmI} received '%s'`,
						JSON.parse(message.content.toString())
					);

					if (whoAmI === 'alpha') {
						channel.ack(message);
					} else if (whoAmI === 'beta') {
						// IF beta crashes, this will also happen
						channel.reject(message);
					}
				}
			},
			{ noAck: false }
		);

		console.log(` [*] ${whoAmI} waiting for messages.`);
	} catch (err) {
		console.warn(err);
	}
})();
