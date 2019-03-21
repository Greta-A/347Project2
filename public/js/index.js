var main = require('../../app.js');
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

exports.data = methods;
