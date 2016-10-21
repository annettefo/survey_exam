var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports = (function(){
	return {
	addQ: function(req, res) {
			// console.log(req.body.name)
			var question = new Question({name: req.body.name, category: req.body.category, category2: req.body.category2, category3: req.body.category3, category4: req.body.category4, topic: req.body.topic, like: 0, dislike: 0, createdAt: req.body.createdAt});
			//  question: req.body.question,
				question.save(function(err){
				if(err){
					console.log('add failed');
				}else {
					console.log('successfully added Q');
					res.json(question);
					// console.log(user);
				}
			});
	},
	show: function(req, res){
		Question.find({}, function(err, results){
			if(err){
				console.log(err);
			}else {
				res.json(results);
			}
		});
	},
	getQ: function(req, res){
		Question.findOne({_id: req.params.id}, function(err, results){
			if(err){
				console.log(err);
			}else {
				res.json(results);
			}
		});
	},

	// removeQuestion: function(req, res) {
	// 		Question.remove({_id: req.params.question._id}, function(err, result) {
	// 				if(err) {
	// 					console.log(err);
	// 				}
	// 				else {
	// 					res.json(result);
	// 				}
	// 		});
	// }

	removeQuestion: function(req, res){
		Question.remove({_id: req.params.id}, function(err, results){
			if(err){
				console.log(err);
			}else {
				res.json(results);
			}
		});
	}

	//end
}
})();
console.log("Going through QUESTIONS CONTROLLER");
