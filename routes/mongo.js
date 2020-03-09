const express = require("express"),
	router = express.Router(),
	MongoPop = require("../models/MongoPop");

router.get("/", async (req, res) => {
	try {
		const data = await MongoPop.find();
		res.send(data);
	} catch (err) {
		console.log(err);
	}
});

router.get("/:year", async (req, res) => {
	try {
		const theYear = parseInt(req.params.year);
		const data = await MongoPop.find({ Year: theYear });
		res.send(data);
	} catch (err) {
		console.log(err);
	}
});

router.get("/population/:pop", async (req, res) => {
	try {
		const population = parseInt(req.params.pop);
		const data = await MongoPop.find({
			Value: { $gte: population },
		}).sort({ Value: 1 });
		res.send(data);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
