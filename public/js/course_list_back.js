//make app.js known to course_list_back.js
var main = require('../../app.js');
var index = require('./index.js');
var client = main.client;
var eid = index.eid;
//client.connect()

var methods = {
  loadCourseList: function()
  {

  }
}

exports.data = methods;
