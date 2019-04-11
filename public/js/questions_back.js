var main = require('../../app.js');
var index = require('./index.js');
var courses = require('./course_list_back.js');
var client = main.client;
var pickedCourse = courses.pickedCourse;

var methods = {
  listenOnQuestions: function()
  {
    app.get('/loadPickedCourses', function(req, res)
    {
      
      res.json(questions);
      res.end();
    });
  }
}

exports.data = methods;
