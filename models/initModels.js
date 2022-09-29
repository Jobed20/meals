const { User } = require('./user.model');
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Review } = require('./review.model');
const { Restaurant } = require('./restaurant.model');

const initModels = () => {
    //  user - Mult review
    User.hasMany(Review, { foreignKey: 'userId' });
    Review.belongsTo(User);

    //  user - Mult order
    User.hasMany(Order, { foreignKey: 'userId' });
    Order.belongsTo(User);

    //  restaurant - Mult review
    Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
    Review.belongsTo(Restaurant);

    //  restaurant - Mult meal
    Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
    Meal.belongsTo(Restaurant);

    //  meal ---  order
    Meal.hasOne(Order, { foreignKey: 'mealId' });
    Order.belongsTo(Meal);

};

module.exports = {initModels};