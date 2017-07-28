//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//

'use strict';

var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');


var microservice = require('./app/controllers/microservice');



var app = express();
var router = express.Router();

app.use(express.static(path.join(__dirname, 'client')));

require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE,  function (err, db) {

	if (err) {
		throw new Error('Database failed to connect!');
	} else {
		console.log('MongoDB successfully connected on port 27017 to ' + process.env.DATABASE);
	}
});

app.use(bodyParser.json())
app.use(cors());

app.use('/time/:time', microservice.timeStamp);
app.use('/time', microservice.timeserver);


app.get(/\/short\/.+/, microservice.urlShortener);

app.get('/whoami', microservice.headerParser);

app.get('/u/:short', microservice.urlRedirect);

app.get('/search/:terms', microservice.search);

app.get('/recent', microservice.recent);

app.post('/file', microservice.upload, microservice.filedata);




//routes(app);
//app.use('/', routes);

app.listen(process.env.PORT, function(){
  console.log(" server listening at port "+ process.env.PORT +" with IP of " +process.env.IP);
});
