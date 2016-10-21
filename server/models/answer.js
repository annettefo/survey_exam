var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	answer: String,
	details: String,
	name: String,
	like: Number,
	dislike: Number,
}, {timestamps: true});
console.log("Going through model answer");
mongoose.model('Answer', AnswerSchema);
