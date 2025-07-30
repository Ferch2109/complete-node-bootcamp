const express = require('express');
const morgan = require('morgan');

const app = express();
const API = '/api/v1';

const tourRouter = require('./routes/tour.routes');
const userRouter = require('./routes/user.routes');

// MIDDLEWARES
// IMPORTANT: Middleware (function that can modify the upcoming request data).
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
// 	console.log('Hello from the middleware');
// 	next();
// });

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// ROUTE
// mounting routers
app.use(`${API}/tours/`, tourRouter);
app.use(`${API}/users/`, userRouter);

module.exports = app;
