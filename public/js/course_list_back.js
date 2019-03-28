//make app.js known to course_list_back.js
var main = require('../../app.js');
var index = require('./index.js');
var client = main.client;
var eid = index.eid;
//client.connect()

var methods = {

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
        console.log(courses);
        /*
         * TODO: Parse and add courses to DOM.
         */
      })
    })
  },

  //loads additional courses into users addable list.
  //all courses - user's courses = addable courses.
  loadCourseList: function()
  {
    /*
     * Will have to get all the courses from the db
     * then filter out the ones in the user's course list. 
     * (which may re use methods and structure from loadUsersCourses())
     */
  
  },

  addCourse:function()
  {
    //adds a course to the db.
  }
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
  })
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

exports.data = methods;
