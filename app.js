const express = require("express"),
	mongoose = require("mongoose"),
	app = express();

//Database
mongoose
	.connect("mongodb://localhost:27017/Exjobb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/mongodb", require("./routes/mongo"));
app.use("/couchbase", require("./routes/couchbase"));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
