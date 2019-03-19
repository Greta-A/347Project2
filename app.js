//var express = require("express");
//var app     = express();
//var path    = require("path");

/////////////////////////////////////
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, '/public')))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('/public/index.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
/////////////////////////////////////

//app.use(express.static(__dirname + '/public'));

/**
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(3000);

console.log("Running at Port 3000");
*/

/////////////////////////////////////
//postgres
// const Client = require('pg').Client
const {Client} = require('pg') //Same thing^
const client = new Client({
  user: "mvmhdzizvrkbcs",
  password: "2a2888413688b8b8e1f623fee3b9ed4e770ef17e953057b4b0cf43de00cfa292",
  host: "ec2-50-17-231-192.compute-1.amazonaws.com",
  port: "5432",
  database: "d1rs8bbufqm7hh",
  ssl: true
})

//2 methods for connecting
client.connect()
.then(() => console.log("Connected successfuly"))
.catch(e => console.log(e))
.finally(() => client.end())
/////////////////////////////////////