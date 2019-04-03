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
      var slotNum = req.body.buttonSlot;
      app.post('/insertTASlot', function(req, response)
      {
          console.log(index.eid);
          console.log(pickedCourse);
          console.log(req.body.start_time);
          console.log(req.body.end_time);
          console.log(req.body.room_number);

          var query = {
           name: 'insertTASlot',
           text: 'INSERT INTO calendar_items(slot, ta, course_id, start_time, room, end_time) values ($1, $2, $3, $4, $5, $6)',
           values: [slotNum, index.eid, pickedCourse, req.body.start_time, req.body.room_number, req.body.end_time]
          }
          client.query(query, (err,res) =>
         {
           if (err)
           {
             console.log(err)
           }
           else {
             //success
             response.render('calendar.ejs', {eid:index.eid, role:role, pickedCourse: pickedCourse});
             response.end();
           }
         });
      });
      
    });
  }
}
exports.data = methods;

function insertAddedTime()
{

}
