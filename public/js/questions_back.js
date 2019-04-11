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

    app.post('/submitQuestion', function(req, res)
    {
      questionString = req.body.question_string;
      submitQuestion(req, questionString, function(err, result)
      {
        res.render('questions.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: courses.pickedCourse});
        res.end();
      });
      //console.log("in submit");
    });
  }
}

function getQuestions(req, callback)
{
  var query = {
    name: 'getQuestions',
    text: 'SELECT * FROM questions WHERE session_code = $1',
    values: [req.session.sessionCode],
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

function submitQuestion(req, questionString,callback)
{
  var order;
  getQuestions(req, function(err, questions)
  {
    order = questions.length;

    var query = {
      name: 'submitQuestion',
      text: 'INSERT INTO questions(position, question, upvotes, owner, session_code) values ($1, $2, $3, $4, $5)',
      values: [order, questionString, 0, req.session.eid, req.session.sessionCode]
    }
    //calls the query to submit user question into database
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
  });

}
exports.data = methods;
