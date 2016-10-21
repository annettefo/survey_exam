var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Question = mongoose.model('Question');

module.exports = (function(){
	return{
	add: function(req, res) {
		console.log(req.body);
	var category = new Category({
		category:req.body.category,
		topic:req.body.topic,
		// description:req.body.description,
		// answer:req.body.answer,
		// details:req.body.details,
		name: req.body.name,
		like:0,
		dislike:0});
		console.log(category);
	Question.findOne({_id:req.body.question_id}, function(err, question){
		question.answers.push(category);
		question.save(function(err){
		category.save(function(err){
			if(err){
					console.log('add failed');
					res.json(false);
				}else {
					console.log('successfully added answer');
					res.json(answer);
				}
			});
			console.log(question);
			})
		});
	},
	likes: function(req, res){
		// console.log(req.body.question_id);
		var ObjectId = require('mongoose').Types.ObjectId;
		// var query = {"_id:": req.body.question_id, "answers._id":req.body.id};
		// var update = { $inc: {"answers.$.like":1}};

		Question.findOneAndUpdate({_id: new ObjectId(req.body.question_id), "categories._id":new ObjectId(req.body.id)}, { $inc: {"categories.$.like":1}}, function(err, question){
			// question.save(function(err){
			if(err){
					console.log('add failed');
					res.json(false);
				}else {
					console.log('WENT UP 1 like for category 1');
					res.json(question);
				}
			});
	},
	dislikes: function(req, res){
		// console.log(req.body.question_id);
		var ObjectId = require('mongoose').Types.ObjectId;
		// var query = {"_id:": req.body.question_id, "answers._id":req.body.id};
		// var update = { $inc: {"answers.$.like":1}};

		Question.findOneAndUpdate({_id: new ObjectId(req.body.question_id), "answers._id":new ObjectId(req.body.id)}, { $inc: {"answers.$.dislike":1}}, function(err, question){
			// question.save(function(err){
			if(err){
					console.log('add failed');
					res.json(false);
				}else {
					console.log('WENT DOWN 1 DISLIKE');
					res.json(question);
				}
			});

	}
}
})();

console.log("Going through ANSWERS CONTROLLER");
