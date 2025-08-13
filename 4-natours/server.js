const app = require('./app');
const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./models/tour.model');

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

const port = process.env.PORT;
// NOTE: Start server
app.listen(port, () => {
	console.log(chalk.green(`App running on port ${port}...`));
});
