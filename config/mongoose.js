var mongoose = require('mongoose');

var fs = require('fs');

mongoose.connect('mongodb://localhost/blackbelt_survey');

var models_path = __dirname + '/../server/models'

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0) {
		require(models_path + '/' + file);
	}
})

console.log("Going through MONGODB");
