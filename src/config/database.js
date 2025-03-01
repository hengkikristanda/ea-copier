const { Sequelize } = require("sequelize");
const { config } = require("dotenv");

config(); // Load environment variables

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: "127.0.0.1",
		port: 3307, // The local port of the manually opened SSH tunnel
		dialect: "mysql",
		dialectModule: require("mysql2"),
		logging: false,
	}
);

module.exports = sequelize;
