const fs = require('fs');
const Tour = require('./../models/tour.model');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.aliasTopTours = async (req, _, next) => {
	req.query.limit = 5;
	req.query.sort = '-ratingsAverage,price';
	req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

	next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
	console.log('first ', req.query);

	// Execute query
	const features = new APIFeatures(Tour.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();
	const tours = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		length: tours.length,
		data: tours,
	});
});

exports.getTour = catchAsync(async (req, res, next) => {
	const tour = await Tour.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		tour,
	});
});

exports.createTour = catchAsync(async (req, res, next) => {
	const tour = await Tour.create(req.body);
	res.status(201).json({
		status: 'success',
		data: { tour },
	});
});

exports.updateTour = catchAsync(async (req, res, next) => {
	const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
		new: true, // true to return the modified document rather than the original.
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: { tour },
	});
});

exports.deleteTour = catchAsync(async (req, res, next) => {
	await Tour.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.getToursStats = catchAsync(async (req, res, next) => {
	const stats = await Tour.aggregate([
		{
			$match: {
				ratingsAverage: { $gte: 4.5 },
			},
		},
		{
			$group: {
				// _id: null, // sets all in 1 big group
				_id: { $toUpper: '$difficulty' }, // will set a group for each level
				numTours: { $sum: 1 }, // for each tour will add one
				numRatings: { $sum: '$ratingsQuantity' },
				avgRating: { $avg: '$ratingsAverage' },
				avgPrice: { $avg: '$price' },
				minPrice: { $min: '$price' },
				maxPrice: { $max: '$price' },
			},
		},
		{
			$sort: { avgPrice: 1 },
		},
		// {
		// 	$match: {
		// 		_id: { $ne: 'EASY' },
		// 	},
		// },
	]);

	res.status(200).json({
		status: 'success',
		data: { stats },
	});
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
	const year = req.params.year;
	const plan = await Tour.aggregate([
		{
			$unwind: '$startDates',
		},
		{
			$match: {
				startDates: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`),
				},
			},
		},
		{
			$group: {
				_id: { $month: '$startDates' },
				numTourStarts: { $sum: 1 },
				tours: { $push: '$name' },
			},
		},
		{
			$addFields: { month: '$_id' },
		},
		{
			$project: {
				_id: 0,
			},
		},
		{
			$sort: {
				numTourStarts: -1,
			},
		},
		{
			$limit: 6,
		},
	]);

	res.status(200).json({
		status: 'success',
		results: plan.length,
		data: { plan },
	});
});
