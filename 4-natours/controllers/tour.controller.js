const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`);
let tours = JSON.parse(data);

// middleware
exports.validateID = (req, res, next, val) => {
	const id = val * 1;
	if (isNaN(id)) {
		return res.status(400).json({
			status: 'fail',
			message: 'Invalid ID: Must be a number',
		});
	}

	const tour = tours.find((t) => t.id === id);
	if (!tour) {
		return res.status(400).json({
			status: 'fail',
			message: 'Invalid ID: No coincidences',
		});
	}

	next();
};

exports.validateBody = (req, res, next) => {
	if (!req.body || !req.body.name || !req.body.price) {
		return res.status(400).json({
			status: 'fail',
			message: 'Missing name or price',
		});
	}

	next();
};

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		length: tours.length,
		data: tours,
	});
};

exports.getTour = (req, res) => {
	const id = req.params.id * 1;
	const tour = tours.find((t) => t.id === id);

	return res.status(200).json({
		status: 'success',
		tour,
	});
};

exports.createTour = (req, res) => {
	const id = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id }, req.body);

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: { tour: newTour },
			});
		}
	);
};

exports.updateTour = (req, res) => {
	const id = req.params.id * 1;
	const { idx, tour } = tours.map((t, idx) => {
		if (t.id === id) {
			return {
				idx,
				tour: t,
			};
		}
	});

	const updTour = {
		...tour,
		...req.body,
	};

	tours[idx] = updTour;

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(200).json({
				status: 'success',
				data: { tour: updTour },
			});
		}
	);
};

exports.deleteTour = (req, res) => {
	const id = req.params.id * 1;
	tours = tours.filter((t) => t.id !== id);

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(204).json({
				status: 'success',
				data: null,
			});
		}
	);
};
