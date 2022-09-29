const { db, DataTypes } = require('../utils/database.util');

const Review = db.define('review', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    comment: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	restaurantId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	rating: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = { Review };
