const app = require('./app');
const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./models/tour.model');

// NOTE: Catches uncaught exceptions.
process.on('uncaughtException', (err) => {
	console.log(err.name, err.message);
	console.log('UNCAUGHT EXCEPTION!💥 Shutting down...👁️ 👄👁️');
	process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD,
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then((con) => console.log('DB Connection successful'));

const port = process.env.PORT || 3000;
// NOTE: Start server
const server = app.listen(port, () => {
	console.log(chalk.green(`App running on port ${port}...`));
});

// NOTE: Catches unhandled rejections.
process.on('unhandledRejection', (err) => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION!💥 Shutting down...👁️ 👄👁️');
	server.close(() => {
		process.exit(1);
	});
});