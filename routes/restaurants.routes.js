const express = require('express');

const { 
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/restaurant.controller');

const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const {
    protectSession,
    protectAdmin,
    protectReviewsOwners
} = require('../middlewares/auth.middlewares');

const { reviewExists } = require('../middlewares/reviews.middlewares');
const {
    createReviewValidator,
    createRestaurantValidators,
} = require('../middlewares/validators.middlewares');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllRestaurants);
restaurantsRouter.get('/:id', restaurantExists, getRestaurantById);
restaurantsRouter.use(protectSession);
restaurantsRouter.post('/', createRestaurantValidators, createRestaurant)
restaurantsRouter.patch(
    '/:id', 
    restaurantExists,
    protectAdmin,
    updateRestaurant,
);

restaurantsRouter.delete(
    '/:id',
    restaurantExists,
    protectAdmin,
    deleteRestaurant,
);

restaurantsRouter.post(
    '/reviews/:restaurantId',
    createReviewValidator,
    createReview,
);

restaurantsRouter.patch(
    '/reviews/:id',
    reviewExists,
    protectReviewsOwners,
    updateReview,
);

restaurantsRouter.delete(
    '/reviews/:id',
    reviewExists,
    protectReviewsOwners,
    deleteReview,
);

module.exports = {restaurantsRouter};