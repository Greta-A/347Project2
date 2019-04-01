//make app.js known to course_list_back.js
var main = require('../../app.js');
var index = require('./index.js');
var client = main.client;
var eid = index.eid;
var role = index.role;
//client.connect()

var courseID;
var courseName;

var methods = {
  listenOnCourseList: function()
  {
      var app = main.app;
      app.post('/course_list', function(req, res) {
        courseID = req.body.classID;
        courseName = req.body.className;
        addCourse(courseID, courseName);
      });

      app.get('/availableCourses', function(req, res) {
      getAllCourses(function(err, response)
      {
        //send JSON object containing all available classes to client
        res.json(response);
        res.end();
      });
      });

      app.post('/pickedCourses', function(req, response) {
        console.log(req.body.classNum);
        var addPickedCourse = {
          name: 'add-picked-course',
          text: 'INSERT INTO users_to_courses(eid, course) values ($1, $2)',
          values: [eid, req.body.classNum]
        }
        client.query(addPickedCourse, (err,res) =>
        {
          if (err)
          {
            console.log(err)
          }
          else {
            //response.end();
            //return callback(err, res.rows);
          }
        });

      });
  },

  //loads the courses that the user is in.
  loadUsersCourses: function()
  {
    /*
     * gets all the course IDs from users_to_courses
     * that have the same eid. (ex: [[444], [240]]).
     */
    getUsersCourses(function(err,usersCoursesIDs)
    {
      /*
       * gets all the courses and expands them to the full course from the DB.
       * (ex: [[444,'Artifical Intelligence'],[240,'Algorithms and Data Structures']])
       */
      var usersCourses = [];
      getCoursesWithName(usersCourses, usersCoursesIDs, function(err, courses)
      {
        //console.log(courses);
        printCourses(courses);
        /*
         * TODO: Parse and add courses to DOM.
         */
      })
    })
  },
  //loads additional courses into users addable list.
  //all courses - user's courses = addable courses.
  // loadCourseList: function()
  // {
  //   /*
  //    * Will have to get all the courses from the db
  //    * then filter out the ones in the user's course list.
  //    * (which may re use methods and structure from loadUsersCourses())
  //    */
  //
  // }
}

function printCourses(courses){
  var app = main.app;
  var pickArray = [];
  for (var i = 0; i < courses.length; i++)
  {
    pickArray.push({"classID":courses[i][0]});
  }
  app.get('/loadPickedCourses', function(req,res) {
    res.json(pickArray);
    res.end();
    // for (var i = 0; i < courses.length; i++)
    // {
    //   pickArray.push("classNum:" + courses[i]);
    // }
    // console.log(pickArray);
    //res.json(courses);
    // communicate with automatic page load get request
  });
}


function addCourse(id, name)
{
  //adds a course to the db.
  var addCourse = {
    name: 'add-course',
    text: 'INSERT INTO courses(course_id, course_name) values ($1, $2)',
    values: [id, name]
  }
  client.query(addCourse, (err, res) => {
    if (err)
    {
        console.log(err);
    }
    else {
      //added course to database successfully
    }
  });
}

function getUsersCourses(callback)
{
  var query = {
    name: 'getUsersCourses',
    text: 'SELECT course FROM users_to_courses WHERE eid = $1::text',
    values: [index.eid],
    rowMode: 'array'
  }
  client.query(query, (err,res) =>
  {
    if (err)
    {
      console.log(err)
    }
    else {
      // console.log(res.rows);
      return callback(err, res.rows);
    }
  });
}

function getCoursesWithName(usersCourses, usersCoursesIDs, callback)
{
    if(usersCoursesIDs.length === 0)
    {
      return callback("", usersCourses)
    }
    var getCourses = {
      name: 'getCourses',
      text: 'SELECT * FROM courses WHERE course_id = $1',
      values: [usersCoursesIDs[0][0]],
      rowMode: 'array'
    }
    //
    client.query(getCourses, (err,res) =>
    {
      if (err)
      {
        console.log(err)
      }
      else {
        usersCourses.push(res.rows[0])
        usersCoursesIDs.splice(0, 1);
        getCoursesWithName(usersCourses, usersCoursesIDs, function(err, courses){
          return callback(err, courses)
        })
      }
    })

}

function getAllCourses(callback)
{
  // simple query to list all keys/values of courses table
  var query = {
    name: 'getAllCourses',
    text: 'SELECT * FROM courses'
  }

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
