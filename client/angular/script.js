//angular routes
var my_App = angular.module('my_App', ['ngRoute', 'ngMessages']);

	my_App.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html'
        })
        .when('/main',{
            templateUrl: 'partials/main.html'
        })
        .when('/addQuestion',{
            templateUrl: 'partials/addquestion.html'
        })
        .when('/question/:id',{
            templateUrl: 'partials/question.html'
        })
        .when('/answer/:id',{
            templateUrl: 'partials/answer.html'
        })
				.when('/user/:name',{
            templateUrl: 'partials/user.html'
        })
        .otherwise({
        	redirectTo: '/'
        });
    });
//factory
my_App.factory('UsersFactory', function($http){
	console.log("users factory loaded");
	var factory = {};
	var users = [];
	factory.logged_user = null;
	factory.getQuestions = function(callback){
		$http.get('/questions').success(function(output){
			questions = output;
			// console.log(questions);
			callback(questions);
		})
	}
	factory.addUser = function(info, callback) {
		// console.log(info);
		$http.post('/addUser', info).success(function(){
			// console.log("test");
			factory.logged_user = info;
			callback(factory.logged_user);
		});
	}
	factory.readUser = function(callback) {
		callback(thisUser);
	}
	factory.viewUser = function(name, callback) {
		console.log("inside view user", name);
		$http.get('/user/'+name).success(function(data) {
			console.log("VIEWUSER FACTORY TEST", data);
			callback(data);
		});
	}
	factory.addQuestion = function(info, callback){
		$http.post('/addQ', info).success(function(data){
			callback(data);
		});
	}
	factory.getQ = function(id, callback) {
		$http.get('/getQ/'+id).success(function(data){
			callback(data);
		});
	}
	factory.addAnswer = function(info, callback){
		$http.post('/addAnswer', info).success(function(data){
			callback(data);
		});
	}
	factory.likes = function(info, callback){
		console.log(info);
		$http.post('/likes', info).success(function(data){
			callback(data);
		});
	}
	factory.dislikes = function(info, callback){
		console.log(info);
		$http.post('/dislikes', info).success(function(data){
			callback(data);
		});
	}


	//ADDED TO REMOVE QUESTION TO USER
	factory.removeQuestion = function(question, callback) {
			$http.post("/remove/" + question._id).success(function() {
				console.log('successfully removed', question._id);
					callback();
			})
	}



	return factory;
})

//controller
my_App.controller('AnswerController', function($scope, $location, $routeParams, UsersFactory){
	UsersFactory.getQ($routeParams.id, function(data){
		$scope.question = data;
	})
	UsersFactory.getQuestions(function(data){
		$scope.questions = data;
	})
		$scope.addAnswer = function(question_id){
		$scope.new_answer.name = UsersFactory.logged_user.name;
		$scope.new_answer.question_id = question_id;
		UsersFactory.addAnswer($scope.new_answer, function(data){
			UsersFactory.getQ($routeParams.id, function(data){
				$scope.question = data;
			})
				this.new_answer = {};
				$location.path('/question/'+$routeParams.id)
		});
		UsersFactory.getQuestions(function(data){
		$scope.questions = data;
	})
	}
})

my_App.controller('QuestionController', function($scope, $location, $routeParams, UsersFactory){
	UsersFactory.getQ($routeParams.id, function(data){
		$scope.question = data;
		$location.path('/question/'+$routeParams.id)
	})
	$scope.likes = function(id){
		$scope.like = {
			id: id,
			question_id: $scope.question._id
		};

		UsersFactory.likes($scope.like, function(data){
			UsersFactory.getQ($routeParams.id, function(data){
				$scope.question = data;
			})
		});
	}

	$scope.dislikes = function(id){
		$scope.dislike = {
			id: id,
			question_id: $scope.question._id
		};

		UsersFactory.dislikes($scope.dislike, function(data){
			UsersFactory.getQ($routeParams.id, function(data){
				$scope.question = data;
			})
		});

	}




	// //ADDED TO DELETE QUESTION OF OWNER
// 	$scope.removeQuestion = function(id) {
// 		$scope.removeQ = {
// 			id: id,
// 			question_id: $scope.question.id
// 		};
//     UsersFactory.removeQuestion($scope.removeQ, function(data) {
//         UsersFactory.getQ(function($routeParams.id, function(data)) {
//             $scope.questions = data;
// 					})
//       });
// }

})

my_App.controller('UsersController', function($scope, $location, UsersFactory) {
	console.log('Users controller loaded');
	UsersFactory.getQuestions(function(data){
		$scope.questions = data;
	})
	$scope.login = function(new_user){
		console.log(new_user);
		UsersFactory.addUser(new_user, function(){
			$scope.logged_user = UsersFactory.logged_user;
			this.new_user = {};
			// console.log($scope.logged_user);
			$location.path('/main');
		});
	},
	$scope.logout = function(){
		this.logged_user = {};
		$location.path('/');
	}


	$scope.addquestion = function(){
		this.new_question.name = $scope.logged_user.name;
		UsersFactory.addQuestion(this.new_question, function(data){
			UsersFactory.getQuestions(function(data){
				$scope.questions = data;
				this.new_question = {};
				$location.path('/main');
			})
		})
		UsersFactory.getQuestions(function(data){
		$scope.questions = data;
			});
		}

})

// SHOW USER controller
my_App.controller('ShowUserController', function($scope, $location, $routeParams, UsersFactory) {
	$scope.user = {}

	//get the user's information
	UsersFactory.viewUser($routeParams.name, function(data){
		console.log("GETTING USER", data);
		$scope.user = data;
	})

})

console.log("Going through FACTORY");
