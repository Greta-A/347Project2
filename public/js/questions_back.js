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
      // add user submitted question to database
      questionString = req.body.question_string;
      submitQuestion(req, questionString, function(err, result)
      {
        res.render('questions.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: courses.pickedCourse});
        res.end();
      });
    });

    app.post('/upvoteQuestion', function(req, res)
    {
      upvoteQuestion(req, function(err, result)
      {
        res.render('questions.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: courses.pickedCourse});
        res.end();
      });
    });


    app.post('/popQueue', function(req, res)
    {
      console.log("start POP");
      //Pops the first question from the queue.
      //positionRemoved is the position where a question was removed.
      //This allows for remove to be implemented easier later.
      popQueue(function(req, positionRemoved)
      {
        //Makes the db have the correct positions (e.g. 1,2,3 = 0,1,2)
        reSortPositions(positionRemoved);
      });
    });

    app.post('/removeTop', function(req, res)
    {
      popQueue(function(err, result)
      {
        reSort(req, function(err, result)
        {
          res.render('questions.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: courses.pickedCourse});
          res.end();
        });
      });
    });
  }
}

function popQueue(callback)
{
  var query = {
    name: 'popQueue',
    text: 'DELETE FROM questions WHERE position = $1::integer',
    values: [0]
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

function reSort(req, callback)
{
  var query = {
    name: 'reorder-Position',
    text: 'UPDATE questions SET position = position - 1 WHERE session_code = $1::smallint',
    values: [req.session.sessionCode]
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

function reSortPositions(positionRemoved)
{
  console.log("re sort");
  //TODO:
}

function getQuestions(req, callback)
{
  var query = {
    name: 'getQuestions',
    text: 'SELECT * FROM questions WHERE session_code = $1',
    values: [req.session.sessionCode]
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

function upvoteQuestion(req, callback)
{
  var upvoted = parseInt(req.body.upvotes) + 1;
  var query = {
    name: 'updateUpvotes',
    text: 'UPDATE questions SET upvotes = $1::int WHERE session_code = $2::smallint AND question = $3::text',
    values: [upvoted, req.session.sessionCode, req.body.question]
  }

  client.query(query, (err,res) =>
  {
   if (err)
   {
     console.log(err)
   }
   else {
     //success
     return callback(err, res.rows);
   }
  });
}
exports.data = methods;
