import amqp from "amqplib";

const queue = "product_inventory";
const text = {
	item_id: "teste",
	text: "message",
};

const queueConfig = {
	durable: true,
	messageTtl: 30 * 24 * 60 * 60 * 1000
};

(async () => {
	let connection;
	try {
		connection = await amqp.connect("amqp://rabbitmq");
		const channel = await connection.createChannel();

		await channel.assertQueue(queue, queueConfig);

		channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)), { persistent: true });
		console.log(" [x] Sent '%s'", text);

		await channel.close();
	} catch (err) {
		console.warn(err);
	} finally {
		if (connection) await connection.close();
	}
})();
