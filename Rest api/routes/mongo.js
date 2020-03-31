const express = require("express"),
	router = express.Router(),
	mongoose = require("mongoose"),
	MongoPop = require("../models/MongoPop");

//Connects to the local MongoDB database
mongoose
	.connect("mongodb://localhost:27017/Exjobb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

// shows all documents from mongodb database
router.get("/", async (req, res) => {
	try {
		const data = await MongoPop.find();
		res.send(data);
	} catch (err) {
		console.log(err);
	}
});

// only for getting array for testing
router.get("/random", async (req, res) => {
	try {
		const randomData = await MongoPop.aggregate([
			{ $sample: { size: 2000 } },
		]);
		const data = randomData.map((d) => {
			return d.Year;
		});
		res.send(data);
	} catch (err) {
		console.log(err);
	}
});

// Shows all documents with the same year as from the :year value from the url
router.get("/:year", async (req, res) => {
	try {
		const theYear = parseInt(req.params.year);
		const data = await MongoPop.find({ Year: theYear });
		res.send(data);
	} catch (err) {
		console.log(err);
	}
});

// Shows all documents with the value >= to the :pop value from url, then sorts it in descending order
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
