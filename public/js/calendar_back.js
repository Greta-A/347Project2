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
      var inserted = false;
      var slotNum = req.body.buttonSlot;
      app.post('/insertTASlot', function(req, response)
      {
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
             inserted = true;
             response.render('calendar.ejs', {eid:index.eid, role:role, pickedCourse: pickedCourse});
             response.end();
           }
         });
      });
        if (inserted)
        {
          res.end();
        }
    });

    app.get('/displayAllTASlots', function(req, res)
    {
      getCalendarInfo(function(err, response)
      {
        res.json(response);
        res.end();
      });
    });

    //Simply gets the role (e.g. 0, 1, or 2) and sends it to the front end. used for only showing things by role dynamically.
    app.get('/getRole', function(req, res)
    {
      res.json(index.role);
      res.end();
    });

    app.post('/sendTAInfo', function(req, res)
    {
      var pickedSlot = req.body.buttonSlot;
      app.post('/generateCode', function(req, res)
      {
        insertSesssionCode(req.body.sessionCode, pickedSlot, function(err, res){

        })
      });
      //res.end();
    });
  }
}

function getCalendarInfo(callback)
{
  var query = {
    name: 'selectTASlot',
    text: 'SELECT * FROM calendar_items WHERE course_id = $1',
    values: [courses.pickedCourse]
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

function insertSesssionCode(sessionCode, pickedSlot, callback)
{
  console.log(sessionCode);
  console.log(pickedSlot);
  console.log(pickedCourse);
  var query = {
    name: 'insertSesssionCode',
    text: 'UPDATE calendar_items SET session_code = $1::smallint WHERE slot = $2::smallint AND course_id = $3::smallint',
    values: [sessionCode, pickedSlot, pickedCourse]
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
