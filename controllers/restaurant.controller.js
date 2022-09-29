const { Review } = require('../models/review.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createRestaurant = catchAsync(async (req, res, next ) => {
    const { name, address, rating } = req.body;

    const newRestaurant = await Restaurant.create({
        name,
        address,
        rating,
    });

    res.status(201).json({
        status: 'success',
        data: { newRestaurant },
    });
});

const getAllRestaurants = catchAsync( async (req, res, next ) => {
    const restaurants = await Restaurant.findAll({
        where: { status: 'active' },
        include: [{ model: Review }],
    });

    res.status(200).json({
        status: 'success',
        data: { restaurants},
    });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    const restaurants = await Restaurant.findOne({
        where: {id: restaurant.id},
        include: [{ model: Review }],
    });

    res.status(200).json({
        status: 'success',
        data: { restaurants },
    });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { name, address } = req.body;
    const { restaurant } = req;

    await restaurant.update({ name, address });

    res.status(200).json({
		status: 'success',
		data: { restaurant },
	});
});

const deleteRestaurant = catchAsync(async (req, res, next ) => {
    const { restaurant } = req;

    await restaurant.update({ status: 'deleted'});

    res.status(204).json({ status: 'success'})
});

const createReview = catchAsync(async (req, res, next) => {
    const { restaurantId } = req.params;
	const { comment, rating } = req.body;
	const { sessionUser } = req;

	const newReview = await Review.create({
		userId: sessionUser.id,
		restaurantId,
		comment,
        rating,
	});

	res.status(201).json({
		status: 'success',
		data: { newReview },
	});
});

const updateReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;
    const { review } = req;

    await review.update({ comment, rating });

    res.status(200).json({
		status: 'success',
		data: { review },
	});
});

const deleteReview = catchAsync(async (req, res, next) => {
	const { review } = req;

	await review.update({ status: 'deleted' });

	res.status(200).json({
		status: 'success',
	});
});

module.exports = {
	createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview,
};
