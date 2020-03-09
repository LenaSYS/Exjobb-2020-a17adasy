const mongoose = require("mongoose");

const MongoSchema = new mongoose.Schema({
	countryName: String,
	countryCode: String,
	year: Number,
	value: Number,
});

const MongoPop = mongoose.model("MongoPop", MongoSchema);

module.exports = MongoPop;
