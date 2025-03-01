/* const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
	res.send({ message: "Welcome to my Express API!" });
});

app.post("/api/order", (req, res) => {
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

	res.status(200).json(response);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
 */