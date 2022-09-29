const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const protectSession = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]; // -> [Bearer, token]
	}

	if (!token) {
		return next(new AppError('The token is invalid', 403));
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		return next(
			new AppError('The owner of the session is no active', 403)
		);
	}
	req.sessionUser = user;
	next();
});


const protectUsersAccount = (req, res, next) => {
	const { sessionUser, user } = req;

	if (sessionUser.id !== user.id) {
		return next(new AppError('You are not the owner of this account.', 403));
	}
	next();
};

const protectReviewsOwners = (req, res, next) => {
	const { sessionUser, review } = req;

	if (sessionUser.id !== review.userId) {
		return next(new AppError('This review does not belong to you.', 403));
	}

	next();
};

const protectOrdersOwners = (req, res, next) => {
	const { sessionUser, order } = req;

	if (sessionUser.id !== order.userId) {
		return next(new AppError('This order does not belong to you.', 403));
	}

	next();
};

const protectAdmin = (req, res, next) => {
	const { sessionUser } = req;

	if (sessionUser.role !== 'admin') {
		return next(new AppError('You do not have access level.', 403));
	}

	next();
};

module.exports = {
	protectSession,
	protectUsersAccount,
	protectReviewsOwners,
  protectOrdersOwners,
	protectAdmin,
};
