const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createOrder = catchAsync(async( req, res, next) => {
    const { quantity, mealId } = req.body;
    const { sessionUser } = req;
    
    const meal = await Meal.findOne({ where: { id: mealId, status: 'active' } })
    var totPrice = quantity * meal.price;

    const newOrder = await Order.create({
       quantity,
       mealId,
       userId: sessionUser.id,
       totalPrice: totPrice,
    });

    res.status(201).json({
		status: 'success',
		data: { newOrder },
	});
});

const getAllOrders = catchAsync(async (req, res, next) => {
    const { order } = req;
    const orders = await Order.findAll({
        where: { userId : order.userId },
        include: [
            {model: Meal, include: { model: Restaurant}},
        ],
    });

    res.status(200).json({
		status: 'success',
		data: { orders },
	});
});

const updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    await order.update({ status: 'completed' });

    res.status(200).json({
		status: 'success',
		data: { order },
	});
});

const deleteOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    await order.update({ status: 'cancelled' });

    res.status(200).json({
		status: 'success',
		data: { order },
	});
});

module.exports = {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};