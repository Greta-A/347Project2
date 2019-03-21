//make app.js known to index.js
var main = require('../../app.js');
// list methods available to app.js
var methods = {
  loginFormPost: function()
   {
    var app = main.app;
    console.log("in index.js");
    app.post('/course_list.html', function(req, res) {
      var eid = req.body.EID;
      console.log(eid);
      res.render('course_list.html');
      res.end();
    });
  }
}

// send method list to app.js using export
exports.data = methods;
