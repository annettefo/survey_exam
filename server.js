var express = require('express');
var path= require('path');
var app = express();
var bodyparser = require('body-parser');
require('./config/mongoose.js');
require('./config/routes.js')(app);


app.use(express.static(path.join(__dirname, './client')));

app.listen(8001, function() {
	console.log('SERVER IS RUNNING on: 8001');
});
