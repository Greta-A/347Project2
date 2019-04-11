var main = require('../../app.js');
var index = require('./index.js');
var courses = require('./course_list_back.js');
var client = main.client;
var pickedCourse = courses.pickedCourse;

var methods = {
  listenOnQuestions: function()
  {
    var app = main.app;
    //Essentially the on load get request. from fetch.
    app.get('/loadQuestions', function(req, res)
    {
      //gets the questions based on the session_code. (e.g. all questions with session_code 1111)
      getQuestions(req, function(err, questions)
      {
        res.json(questions);
        res.end();
      });
      //Should get all the questions that have the said code in the db.
    });
  }
}

function getQuestions(req, callback)
{
  var query = {
    name: 'getQuestions',
    text: 'SELECT * FROM questions WHERE session_code = $1',
    values: [req.session.sessionCode],
    rowMode: 'array'
  }
  //calls the query to load the questions already in the db.
  client.query(query, (err,res) =>
  {
    if (err)
    {
      console.log(err)
    }
    else {
      return callback(err, res.rows);
    }
  });
}
exports.data = methods;
