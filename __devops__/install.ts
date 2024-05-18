const fs = require('fs-extra');
const path = require('path');

const timerTitle = 'Project Install';

const containersFolder = './__containers__';

console.time(timerTitle);

fs.ensureDirSync(path.resolve(process.cwd(), containersFolder, 'rabbitmq/data'));
fs.ensureDirSync(path.resolve(process.cwd(), containersFolder, 'rabbitmq/log'));
fs.ensureDirSync(path.resolve(process.cwd(), containersFolder, 'publisher/node_modules'));
fs.ensureDirSync(path.resolve(process.cwd(), containersFolder, 'consumer/node_modules'));

fs.ensureFileSync(path.resolve(process.cwd(), containersFolder, 'publisher/yarn.lock'));
fs.ensureFileSync(path.resolve(process.cwd(), containersFolder, 'consumer/yarn.lock'));

console.timeEnd(timerTitle);
