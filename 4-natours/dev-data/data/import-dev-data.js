const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tour.model');

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

const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

const importData = async () => {
	try {
		await Tour.create(JSON.parse(tours));
		console.log('Data successfully loaded!');
	} catch (error) {
		console.log(error);
	}
};

const deleteData = async () => {
	try {
		await Tour.deleteMany();
		console.log('Data successfully deleted!');
	} catch (error) {
		console.log(error);
	}
};

const command = process.argv[2];

if (command === '--import') {
	importData();
} else if (command === '--delete') {
	deleteData();
}
