const express = require('express');

const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { usersRouter } = require('./routes/users.routes');

const { globalErrorHandler } = require('./controllers/error.controller');

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter); 
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.use(globalErrorHandler);

app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };