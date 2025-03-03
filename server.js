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

		app.use(express.json({ strict: false }));
		app.use(express.urlencoded({ extended: true }));

        app.use((req, res, next) => {
            let rawData = "";
        
            req.on("data", (chunk) => {
                rawData += chunk;
            });
        
            req.on("end", () => {
                console.log("🔴 RAW REQUEST BODY RECEIVED:");
                console.log(rawData);  // ✅ Print the exact data received from MQL4
                try {
                    let parsed = JSON.parse(rawData); // ✅ Attempt to parse it manually
                    console.log("✅ Successfully Parsed JSON:", parsed);
                } catch (error) {
                    console.error("❌ JSON Parsing Error:", error.message);
                }
            });
        
            next();
        });

		app.get("/", (req, res) => {
			res.send({ message: "Welcome to my Express API!" });
		});

		app.post("/api/order", async (req, res) => {
			console.log("RAW BODY RECEIVED:", JSON.stringify(req.body));

			const { orderNo, symbol, orderType, open, tp, sl, size, orderDateTime } = req.body;

			if (!symbol || !orderType || !open || !tp || !sl || !size || !orderDateTime) {
				return res.status(400).json({ error: "Missing required fields" });
			}

			// Response format
			const response = {
				message: "Order received successfully",
				order: {
					orderNo,
					symbol,
					orderType,
					open,
					tp,
					sl,
					size,
					orderDateTime,
				},
			};

			const orders = await Orders.findAll({ raw: true });

			res.status(200).json(orders);
		});

		app.get("/api/order/:accountId", async (req, res) => {
			const accountId = req.params.accountId;

			const orders = await Orders.findOne({ raw: true });

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
