const express = require('express');

const {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
} = require('../controllers/meal.controller');

const { mealExists } = require('../middlewares/meals.middlewares');
const {
    protectSession,
    protectAdmin,
} = require('../middlewares/auth.middlewares');
const {
    createMealValidator
} = require('../middlewares/validators.middlewares');

const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeals);
mealsRouter.get('/:id', mealExists, getMealById);
mealsRouter.use(protectSession);
mealsRouter.post('/:id', createMealValidator, createMeal);
mealsRouter.patch('/:id', mealExists, protectAdmin, updateMeal);
mealsRouter.delete('/:id', mealExists, protectAdmin, deleteMeal);

module.exports = { mealsRouter };