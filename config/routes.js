var users = require('./../server/controllers/users.js');
var questions = require('./../server/controllers/questions.js')
var answers = require('./../server/controllers/answers.js')
var bodyparser = require('body-parser');

module.exports = function(app) {
	app.use(bodyparser.json());
	// //friends routes
	app.post('/addUser', function(req, res) {
	users.add(req,res);
	})
	app.get('/user/:name', function(req, res){
	users.viewUser(req, res);
	})
	app.get('/questions', function(req, res){
	questions.show(req, res);
	})
	app.post('/addQ', function(req, res) {
	questions.addQ(req, res);
	})
	app.get('/getQ/:id', function(req, res){
	questions.getQ(req, res);
	})
	app.post('/addAnswer', function(req, res){
	answers.add(req, res);
	})
	app.post('/likes', function(req, res){
	answers.likes(req, res);
	})
	app.post('/dislikes', function(req, res){
		console.log(req.body);
	answers.dislikes(req, res);
	})
	// app.post("/remove/:question._id", function(req, res) {
	// questions.removeQuestion(req, res);
	// })
}

console.log("Going through ROUTES");
