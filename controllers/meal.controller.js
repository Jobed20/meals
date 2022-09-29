const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { catchAsync } = require('../utils/catchAsync.util');

const createMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const newMeal = await Meal.create({
        name,
        price,
        restaurantId: id,
    });

    res.status(201).json({
        status: 'success',
        data: { newMeal },
    });
});

const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = await Meal.findAll({
        where: { status: 'active' },
        include: [{ model: Restaurant }],
    });

    res.status(200).json({
        status: 'success',
        data: { meals},
    });
});

const getMealById = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const meals = await Meal.findOne({
        where: {id: meal.id},
        include: [{ model: Restaurant }],
    });

    res.status(200).json({
        status: 'success',
        data: { meals },
    });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;
    const { meal } = req;

    await meal.update({ name, price });

    res.status(200).json({
		status: 'success',
		data: { meal },
	});
});

const deleteMeal = catchAsync(async ( req, res, next) => {
    const { meal } = req;

    await meal.update({ status: 'deleted'});

    res.status(204).json({ status: 'success'})
});

module.exports = {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
};