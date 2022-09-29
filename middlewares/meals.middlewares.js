const { Meal } = require('../models/meal.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const mealExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const meal = await Meal.findOne({ where: { id, status: 'active' } });

	if (!meal) {
		return next(new AppError('meal does not exists', 404));
	}

	req.meal = meal;
	next();
});

const mealIdExists = catchAsync(async (req, res, next) => {
	const { mealId } = req.body;

	const meals = await Meal.findOne({ where: { id: mealId, status: 'active' } });

	if (!meals) {
		return next(new AppError('mealId does not exists', 404));
	}

	req.meals = meals;
	next();
});

module.exports = { mealExists, mealIdExists };