const express = require("express"),
	app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/mongodb", require("./routes/mongo"));
app.use("/couchbase", require("./routes/couchbase"));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
