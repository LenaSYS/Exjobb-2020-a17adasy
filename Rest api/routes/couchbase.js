const express = require("express"),
	router = express.Router(),
	couchbase = require("couchbase");

// Connects to the local couchbase database and setups the the right "bucket"
const cluster = new couchbase.Cluster("http://127.0.0.1:8091", {
	username: "Administrator",
	password: "password",
});
const bucket = cluster.bucket("population");
const collection = bucket.defaultCollection();

// shows all documents from the Couchbase database
router.get("/", async (req, res) => {
	try {
		const result = await cluster.query("SELECT * FROM `population`");
		res.send(result.rows);
	} catch (err) {
		console.log(err);
	}
});

// Shows all documents with the same year as from the :year value from the url
router.get("/:year", async (req, res) => {
	try {
		const theYear = parseInt(req.params.year);
		const data = await cluster.query(
			`SELECT * FROM \`population\` WHERE Year = ${theYear}`
		);
		res.send(data.rows);
	} catch (err) {
		console.log(err);
	}
});

// Shows all documents with the value >= to the :pop value from url, then sorts it in descending order
router.get("/population/:pop", async (req, res) => {
	try {
		const population = parseInt(req.params.pop);
		const data = await cluster.query(
			`SELECT * FROM \`population\` WHERE \`Value\` >= ${population} ORDER BY \`Value\` DESC`
		);
		res.send(data.rows);
	} catch (err) {
		console.log(err);
	}
});

// Shows the first matching document with code
router.get("/country-code/:code", async (req, res) => {
	try {
		const data = await cluster.query(
			`SELECT * FROM \`population\` WHERE \`Country Code\` = "${req.params.code}" LIMIT 1`
		);
		res.send(data.rows);
	} catch (err) {
		console.log(err);
	}
});

// Show Value field when searching code
router.get("/country-value/:code", async (req, res) => {
	try {
		const data = await cluster.query(
			`SELECT \`Value\` FROM \`population\` WHERE \`Country Code\` = "${req.params.code}"`
		);
		res.send(data.rows);
	} catch (err) {
		console.log(err);
	}
});

// Only for filling couchbase with the dataset
const MongoPop = require("../models/MongoPop");
router.post("/mongo-to-couch", async (req, res) => {
	await MongoPop.find()
		.lean()
		.exec((err, alldata) => {
			if (err) console.log(err);
			try {
				alldata.map(async (data) => {
					await collection.insert(
						data._id.toString(),
						{
							"Country Code": data["Country Code"],
							"Country Name": data["Country Name"],
							Value: data.Value,
							Year: data.Year,
						},
						function (err, result) {
							if (!err) {
								console.log(
									"stored document successfully. CAS is %j",
									result.cas
								);
							} else {
								console.error(
									"Couldn't store document: %j",
									err
								);
							}
						}
					);
				});
				console.log("done");
			} catch (err) {
				console.log(err);
			}
		});
});

module.exports = router;
