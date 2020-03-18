const express = require("express"),
	cors = require("cors"),
	app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/mongodb", require("./routes/mongo"));
app.use("/couchbase", require("./routes/couchbase"));

const port = 3000;
// - Stationär dator
// const ip = "192.168.1.32";
// - LAPTOP
const ip = "192.168.39.97"
app.listen(port, ip, () =>
	console.log(`Example app listening on ${ip}:${port}!`)
);
