var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
	return {
	add: function(req, res) {
			console.log('adding new user');
			var user = new User(req.body);
			console.log(user);
				user.save(function(err){
				if(err){
					console.log('add failed');
				}else {
					console.log('successfully added user');
					console.log(user);
					res.json(user);
					// console.log(user);
				}
			});
	},
	viewUser: function(req, res){
		console.log(req.params.name);
		User.findOne({name: req.params.name}).exec(function(err, data){
			if(err){
				console.log(err);
			}else {
				console.log(data);
				res.json(data);
			}
		});
	},

	show: function(req, res){
		// User.add
	}

}
})();
console.log("Going through USERS CONTROLLER");
