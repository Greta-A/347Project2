var main = require('../../app.js');
var index = require('./index.js');
var courses = require('./course_list_back.js');
var client = main.client;
var pickedCourse = courses.pickedCourse;

var methods = {
  listenOnQuestions: function()
  {
    //Essentially the on load get request. from fetch.
    app.get('/loadQuestions', function(req, res)
    {
      console.log("req: ", req);
      //Should get all the questions that have the said code in the db.
      var query = {
        name: 'getQuestions',
        text: 'SELECT * FROM questions WHERE session_code = $1::text',
        values: [req.session.sessionCode],
        rowMode: 'array'
      }
      console.log("qvals: ", query.values);
      //calls the query to load the questions already in the db.
      client.query(query, (err,res) =>
      {
        if (err)
        {
          console.log(err)
        }
        else {
          console.log("rows", res.rows);
          //send to le front end.
          res.json(res.rows);
          res.end();
        }
      });
    });
  }
  // ,

  // addQuestionToQueue : function()
  // {
  //   function addCourse(id, name)
  //   {
  //     //adds a course to the db.
  //     var addCourse = {
  //       name: 'add-course',
  //       text: 'INSERT INTO questions(order, question, upvotes, owner, session_code) values ($1, $2)',
  //       values: [id, name]
  //     }
  //     client.query(addCourse, (err, res) => {
  //       if (err)
  //       {
  //         console.log(err);
  //       }
  //       else {
  //         //added course to database successfully
  //       }
  //     });
  //   }
  // }
}

exports.data = methods;
