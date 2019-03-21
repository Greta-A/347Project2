const express = require('express')
const path = require('path')
const {Client} = require('pg');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000

/////////////////////////////////////
//postgres
// const Client = require('pg').Client
 //Same thing^
const client = new Client({
  user: "mvmhdzizvrkbcs",
  password: "2a2888413688b8b8e1f623fee3b9ed4e770ef17e953057b4b0cf43de00cfa292",
  host: "ec2-50-17-231-192.compute-1.amazonaws.com",
  port: "5432",
  database: "d1rs8bbufqm7hh",
  ssl: true
})

// app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/js', express.static(path.join(__dirname, '/public/js')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/views')));
app.set('views', __dirname + '/public/views');

app.get('/', function(req, res) {
  res.render('views/index.html');
});

exports.app = app;
exports.client = client;
var index = require(__dirname + '/public/js/index.js');
index.data.loginFormPost();

app.listen(PORT);

//2 methods for connecting
var query = {
  name: 'get-carl',
  text: 'SELECT * FROM users WHERE eid = $1',
  values: ['clermocj']
}
//method 1 (promises)
// client.connect()
// .then(() => console.log("Connected successfuly"))
// .then(() => client.query(query))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end())
//method 2 (callbacks)
client.connect()
client.query(query, (err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.table(res.rows)
  }
  client.end();
})
