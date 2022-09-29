const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');
const { Restaurant } = require('../models/restaurant.model');
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({path: './config.env' });

const getAllOrders = catchAsync(async (req, res, next) => {
    const { order } = req;
    const orders = await Order.findAll({
        where: { userId : order.userId, status: 'completed' },
        include: [
            {model: Meal, 
			include: { model: Restaurant}},
        ],
    });
	
    res.status(200).json({
        status: 'success',
        data: { orders },
    });
});

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

	if (role !== 'admin' && role !== 'normal') {
		return next(new AppError('Invalid role', 400));
	}

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
		role,
	});

	newUser.password = undefined;

	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
});

const updateUser = catchAsync(async (req, res, next) => {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });

    res.status(200).json({
        status: 'success',
        data: { user },
    })
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({
		where: { email, status: 'active' },
	});

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Wrong credentials', 400));
	}

	user.password = undefined;

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({
		status: 'success',
		data: { user, token },
	});
});

const getOrderById = catchAsync( async (req, res, next) => {
    const { order } = req;

	const orders = await Order.findOne({
        where: {id: order.id, status: 'completed'},
        include: [
            {model: Meal, 
			include: { model: Restaurant}},
        ],
    });

	if (!orders) {
		return next(new AppError('Order does not exists', 404));
	}

    res.status(200).json({
        status: 'success',
        data: { orders },
    });
});

module.exports = {
	getAllOrders,
	createUser,
	updateUser,
	deleteUser,
	login,
  getOrderById,
};