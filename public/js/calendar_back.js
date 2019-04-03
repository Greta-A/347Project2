var main = require('../../app.js');
var index = require('./index.js');
var courses = require('./course_list_back.js');
var client = main.client;
var pickedCourse = courses.pickedCourse;

var methods = {
  listenOnCalendar: function()
  {
    var app = main.app;
    var eid = index.eid;
    var role = index.role;
    app.post('/addTASlot', function(req, res)
    {
      console.log("in ta slot post");
      console.log(req.body.buttonSlot);
      // var query = {
      //   name: 'insertTATime',
      //   text: 'INSERT INTO calendar_items(ta, course_id, room) values ($1, $2, $3)',
      //   values: [index.eid, pickedCourse, req.body.room_number]
      // }
      //
      // client.query(query, (err,res) =>
      // {
      //   if (err)
      //   {
      //     console.log(err)
      //   }
      //   else {
      //     //success
      //     res.render('calendar.ejs', {eid:index.eid, role:role, pickedCourse: pickedCourse});
      //     res.end();
      //   }
      // });
    });
  }
}
exports.data = methods;

function insertAddedTime()
{

}
