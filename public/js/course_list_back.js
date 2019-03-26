//make app.js known to index.js
var main = require('../../app.js');
var client = main.client;
client.connect()

var methods = {
  
}

exports.data = methods;
