const express = require('express');

const {
	getAllOrders,
	createUser,
	updateUser,
	deleteUser,
	login,
    getOrderById,
} = require('../controllers/user.controller');

const { userExists } = require('../middlewares/users.middlewares');
const { orderExists, orderVerified } = require('../middlewares/orders.middlewares');

const {
	protectSession,
	protectUsersAccount,
	protectOrdersOwners,
} = require('../middlewares/auth.middlewares');
const {
	createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);
usersRouter.post('/login', login);
usersRouter.use(protectSession);
usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);
usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);
usersRouter.get('/orders', orderVerified, protectOrdersOwners, getAllOrders);
usersRouter.get('/orders/:id', orderExists, protectOrdersOwners, getOrderById);

module.exports = { usersRouter };