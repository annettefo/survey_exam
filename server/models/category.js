var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	// answer: String,
  category: String,
  topic: String,
	// details: String,
	name: String,
	like: Number,
	dislike: Number,
}, {timestamps: true});
console.log("Going through model category");
mongoose.model('Category', CategorySchema);
