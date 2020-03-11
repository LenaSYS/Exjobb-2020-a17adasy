const express = require("express"),
	app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/mongodb", require("./routes/mongo"));
app.use("/couchbase", require("./routes/couchbase"));

const port = 3000;
const ip = "192.168.1.32";
app.listen(port, ip, () =>
	console.log(`Example app listening on ${ip}:${port}!`)
);
