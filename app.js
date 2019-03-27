// requirements //
const express = require('express')
const path = require('path')
const {Client} = require('pg');
var ejs = require('ejs');
// allows post request to see form fields //
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000

/////////////////////////////////////
//postgres
// database connection credentials//
const client = new Client({
  user: "mvmhdzizvrkbcs",
  password: "2a2888413688b8b8e1f623fee3b9ed4e770ef17e953057b4b0cf43de00cfa292",
  host: "ec2-50-17-231-192.compute-1.amazonaws.com",
  port: "5432",
  database: "d1rs8bbufqm7hh",
  ssl: true
})

// set up for app variable //
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// set easy-access to .js, .css. and .html files //
app.use('/js', express.static(path.join(__dirname, '/public/js')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/views')));
app.set('views', __dirname + '/public/views');

// start the app from start (index.html) //
app.get('/', function(req, res) {
  res.render('views/index.html');
});

//client.connect();
exports.client = client;

//share app variable to index.js
exports.app = app;
// make index.js known to app.js
var index = require(__dirname + '/public/js/index.js');
// var courses = require(__dirname + '/public/js/course_list_back.js');
// call loginFormPost method
index.data.loginFormPost();
// courses.data.parseEid();

app.listen(PORT);
