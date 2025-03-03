const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database");

const { Orders } = require("./src/model/orders");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
	try {
		await sequelize.authenticate();
		console.log("✅ Database connection successful");

		await sequelize.sync({ force: false });
		console.log("✅ Database synced");

		// ✅ Use built-in body parser (DO NOT manually process req.on("data"))
		app.use(express.json({ limit: "1mb" }));
		app.use(express.urlencoded({ extended: true }));

		// ✅ Log headers and parsed body
		app.use((req, res, next) => {
			console.log("🔴 HEADERS RECEIVED:", req.headers);
			console.log("🔴 BODY RECEIVED:", req.body); // ✅ This should now work properly
			next();
		});

		app.get("/", (req, res) => {
			res.send({ message: "Welcome to my Express API!" });
		});

		app.post("/api/order", async (req, res) => {
			console.log("🟢 Parsed JSON Body:", req.body);

			const { orderNo, symbol, orderType, open, tp, sl, size, orderDateTime } = req.body;

			if (!symbol || !orderType || !open || !tp || !sl || !size || !orderDateTime) {
				return res.status(400).json({ error: "Missing required fields" });
			}

			// Response format
			const response = {
				message: "Order received successfully",
				order: { orderNo, symbol, orderType, open, tp, sl, size, orderDateTime },
			};

			const orders = await Orders.findAll({ raw: true });

			res.status(200).json(orders);
		});

		app.listen(port, () => {
			console.log(`✅ Server is running on port ${port}`);
		});
	} catch (err) {
		console.error("❌ Error during initialization:", err);
	}
}

startServer();
