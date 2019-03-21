var main = require('../../app.js');
var methods = {
  loginFormPost: function()
   {
    var app = main.app;
    var client = main.cleint;
    console.log("in index.js");
    app.post('/course_list.html', function(req, res) {
      var role = req.body.role;
      console.log(req.body.role);
      switch(role)
      {
        case 0:
        case 1:
        case 2:
          addToDB(app, client);
          break;
        default:
          login();
      }
      res.render('course_list.html');
      res.end();
    });
  }
}

exports.data = methods;


function addToDB(app, client)
{
  var query = {
    name: 'get-carl',
    text: 'INSERT INTO users(eid, name, password, role) values ($1, $2, $3, $4)',
    values: [app.body.eid, app.body.name, app.body.password, app.body.role]
  }
  
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