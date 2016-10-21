var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	// question: String,with description
	topic: String,
	name: String,
	category: String,
	category2: String,
	category3: String,
	category4: String,
	like: Number,
	dislike:Number,
	createdAt: {type: Date, default: new Date},
	answers: []
}, {timestamps: true});
console.log("Going through model question");
mongoose.model('Question', QuestionSchema);
