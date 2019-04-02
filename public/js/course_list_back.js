//make app.js known to course_list_back.js
var main = require('../../app.js');
var index = require('./index.js');
var client = main.client;
var eid = index.eid;
var role = index.role;
var pickedCourse;
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
        res.render('course_list.ejs', {eid:eid, role:role});
        res.end();
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
        var addPickedCourse = {
          name: 'add-picked-course',
          text: 'INSERT INTO users_to_courses(eid, course) values ($1, $2)',
          values: [eid, req.body.classNum]
        }
        pickedCourse = req.body.classNum;
        client.query(addPickedCourse, (err,res) =>
        {
          if (err)
          {
            console.log(err)
          }
          else {
            response.render('course_list.ejs', {eid:eid, role:role});
            response.end();
          }
        });
      });

      app.get('/loadPickedCourses', function(req, res)
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
            res.json(courses);
            res.end();
          })
        })
      });

      app.post('/calendar', function(req, res) {
        console.log(pickedCourse);
        exports.pickedCourse = pickedCourse;
        res.render('calendar.ejs', {eid:eid, role:role, pickedCourse: pickedCourse});
        res.end();
      });

  },

  //loads the courses that the user is in.
  loadUsersCourses: function()
  {
    var app = main.app;
    app.get('/loadPickedCourses', function(req, res)
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
          res.json(courses);
          res.end();
        })
      })
    });

  }
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
    }

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
