//make app.js known to index.js
var main = require('../../app.js');
// list methods available to app.js
var methods = {
  loginFormPost: function()
   {
    var app = main.app;
    var client = main.client;
    console.log("in index.js");
    app.post('/course_list.html', function(req, res) {
      var role = req.body.role;
      console.log("role = " + role)
      switch(role)
      {
        case '0':
        case '1':
        case '2':
          console.log("about to call addToDB()");
          addToDB(req, client);
          break;
        default:
          console.log("about to login")
          login();
      }
      res.render('course_list.html');
      res.end();
    });
  }
}

// send method list to app.js using export
exports.data = methods;


function addToDB(req, client)
{
  console.log("in addToDB()")
  var query = {
    name: 'get-carl',
    text: 'INSERT INTO users(eid, name, password, role) values ($1, $2, $3, $4)',
    values: [req.body.eid, req.body.name, req.body.password, req.body.role]
  }
  console.log(query.values);
  client.connect()
  .then(() => console.log("Connected successfuly"))
  .then(() => client.query(query))
  // .then(results => console.table(results.rows))
  .catch(e => console.log(e))
  .finally(() => client.end())
}

function login()
{

}