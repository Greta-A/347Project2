//make app.js known to index.js
var main = require('../../app.js');
var client = main.client;
client.connect()
// list methods available to app.js
var methods = {
  loginFormPost: function()
   {
    var app = main.app;
    app.post('/course_list.html', function(req, res) {
      var role = req.body.role;
      var pass = req.body.password;
      var eid = req.body.eid;
      // console.log("role = " + role)
      switch(role)
      {
        case '0':
        case '1':
        case '2':
          // console.log("about to call addToDB()");
          addToDB(req, client, res);
          break;
        default:
          login(eid, pass, res);
      }
    });
  }
}

// send method list to app.js using export
exports.data = methods;


function addToDB(req, client, response)
{
  var query = {
    name: 'insert-user',
    text: 'INSERT INTO users(eid, name, password, role) values ($1, $2, $3, $4)',
    values: [req.body.eid, req.body.name, req.body.password, req.body.role]
  }

  var json;

  client.query(query, (err, res) => {
    if (err)
    {
      //failed
      response.render('index.html')
      response.end()
    }
    else {
      // unique, single PKs
      response.render('course_list.html')
      response.end()
    }
  });
}

//client.end()???

function login(eid, password, response)
{
  //Unsafe. We not this is not hashed or safe. Just use the password 'password' or something
  var authenticateUser = {
  name: 'authenticate-user',
  text: 'SELECT password FROM users WHERE eid = $1::text',
  values: [eid],
  rowMode: 'array'
  }

  var retrieveRole = {
  name: 'retrieve-role',
  text: 'SELECT role FROM users WHERE eid = $1::text',
  values: [eid],
  rowMode: 'array'
  }

  client.query(authenticateUser, (err,res) => {
    if (err)
    {
      console.log(err)
    }
    else {
      if (password != res.rows[0])
      {
        // not equal passwords
         response.render('index.html')
         response.end()
      }
      else {
        //Dont need to do this
        exports.eid = eid;
        client.query(retrieveRole, (err, res) => {
          if (err)
          {
            console.log(err);
          }
          else {
            var role = res.rows[0];
            var id = eid;
            exports.role = role;
            var courses = require('./course_list_back.js');
            response.render('course_list.ejs', {eid:id, role:role});
            response.end();
            courses.data.listenOnCourseList();
          }
        })
      }
    }
  })
}
