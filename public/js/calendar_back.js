var main = require('../../app.js');
var index = require('./index.js');
var courses = require('./course_list_back.js');
var client = main.client;
var pickedCourse = courses.pickedCourse;
var slotNum;

var methods = {
  listenOnCalendar: function()
  {
    var app = main.app;
    //var eid = index.eid;
    //var role = index.role;

    app.get('/calendar', function(req, res)
    {
      res.render('calendar.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: pickedCourse});
      res.end();
    });

    app.get('/CourseList', function(req, res)
    {
      res.render('course_list.ejs', {eid:req.session.eid, role:req.session.role});
      res.end();
    });

    // get method soley for retrieving slotNumber without nested post requests
    app.get('/generateCode/:slotNum', function(req, res)
    {
      // method is called everytime a calendar button is pressed
      slotNum = req.params.slotNum;
    });

      app.post('/insertTASlot', function(req, response)
      {
          var query = {
           name: 'insertTASlot',
           text: 'INSERT INTO calendar_items(slot, ta, course_id, start_time, room, end_time) values ($1, $2, $3, $4, $5, $6)',
           values: [slotNum, req.session.eid, courses.pickedCourse, req.body.start_time, req.body.room_number, req.body.end_time]
          }
          client.query(query, (err,res) =>
         {
           if (err)
           {
             console.log(err)
           }
           else {
             //success
             response.render('calendar.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: pickedCourse});
             response.end();
           }
         });
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

    // app.post('/sendTAInfo', function(req, res)
    // {
    //   var pickedSlot = req.body.buttonSlot;
    //   var done = false;
      app.post('/generateCode', function(req, response)
      {
        let pickedSlot =  slotNum;
        console.log(pickedSlot);
        insertSesssionCode(req.body.sessionCode, pickedSlot, function(err, res){
        response.render('questions.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: pickedCourse});
        response.end();
        })
      });

      app.post('/requestCover', function(req, response)
      {
        if (req.body.request == "on")
        {
          updateRequestCover(pickedSlot, function(err, res)
          {
            response.render('calendar.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: pickedCourse});
            response.end();
          });
        }
      });

      app.post('/acceptCover', function(req, response)
      {
        updateAcceptCover(req.body.new_ta_name, pickedSlot, function(err, res)
        {
          response.render('calendar.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: pickedCourse});
          response.end();
        });
      });

    app.post('/studentSessionCode', function(req, res)
    {
      //NEED ERROR CHECKING
      res.render('questions.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: pickedCourse});
      res.end();
    });

    app.post('/sendAdInfo', function(req, res)
    {
      var pickedSlot = req.body.buttonSlot;
      app.post('/approveCover', function(req, response)
      {
        updateApproveCover(pickedSlot, function(err, res)
        {
          response.render('calendar.ejs', {eid:req.session.eid, role:req.session.role, pickedCourse: pickedCourse});
          response.end();
        });
      });
      setTimeout(function() {
        res.redirect('back');
      }, 8000);
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

function updateRequestCover(pickedSlot, callback)
{
  var query = {
    name: 'updateRequestCover',
    text: 'UPDATE calendar_items SET cover_requested = true WHERE slot = $1::smallint AND course_id = $2::smallint',
    values: [pickedSlot, pickedCourse]
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

function updateAcceptCover(newTAName, pickedSlot, callback)
{
  var query = {
    name: 'updateRequestCover',
    text: 'UPDATE calendar_items SET cover_accepted = true, ta = $1 WHERE slot = $2::smallint AND course_id = $3::smallint',
    values: [newTAName, pickedSlot, pickedCourse]
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

function updateApproveCover(pickedSlot, callback)
{
  var query = {
    name: 'updateRequestCover',
    text: 'UPDATE calendar_items SET cover_approved = true WHERE slot = $1::smallint AND course_id = $2::smallint',
    values: [pickedSlot, pickedCourse]
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
