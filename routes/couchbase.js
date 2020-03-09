const express = require("express"),
	router = express.Router(),
	couchbase = require("couchbase");

const cluster = new couchbase.Cluster("http://127.0.0.1:8091", {
	username: "Administrator",
	password: "Administrator",
});
const bucket = cluster.bucket("travel-sample");
const collection = bucket.defaultCollection();

router.get("/", async (req, res) => {
	try {
		const result = await cluster.query("SELECT * FROM `travel-sample`");
		res.send(result);
	} catch (err) {
		return console.log(err);
	}
});

module.exports = router;
