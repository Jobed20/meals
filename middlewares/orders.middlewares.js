const { Order } = require('../models/order.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const orderExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const order = await Order.findOne({ where: { id } });

	if (!order) {
		return next(new AppError('Order does not exists', 404));
	}

	req.order = order;
	next();
});

const orderVerified = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;

	const order = await Order.findOne({ where: { userId: sessionUser.id } });

	if (!order) {
		return next(new AppError('Order does not exists', 404));
	}

	req.order = order;
	next();
});
module.exports = { orderExists, orderVerified };
