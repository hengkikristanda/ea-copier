const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const Orders = sequelize.define(
	"Orders",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		order_no: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		symbol: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		order_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		op_price: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		sl_price: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		tp_price: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		order_size: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		order_datetime: {
			type: DataTypes.DATE(3),
			allowNull: true,
		},
	},
	{
		tableName: "orders",
		timestamps: false,
	}
);

module.exports = { Orders, sequelize };
