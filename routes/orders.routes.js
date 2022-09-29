const express = require('express');

const {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/order.controller');

const {orderExists, orderVerified } = require('../middlewares/orders.middlewares');
const { mealIdExists } = require('../middlewares/meals.middlewares');
const {
    protectSession,
    protectOrdersOwners,
} = require('../middlewares/auth.middlewares'); 

const ordersRouter = express.Router();

ordersRouter.use(protectSession);
ordersRouter.get('/me', orderVerified, protectOrdersOwners, getAllOrders);
ordersRouter.post('/', mealIdExists, createOrder);
ordersRouter.patch('/:id', orderExists, protectOrdersOwners, updateOrder);
ordersRouter.delete('/:id', orderExists, protectOrdersOwners, deleteOrder);

module.exports = { ordersRouter };