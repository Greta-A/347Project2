var main = require('../../app.js');
var methods = {
  print: function()
   {
    console.log("in index.js");
    var app = main.app;
    app.post('/course_list.html', function(req, res) {
      var eid = req.body.EID;
      console.log(eid);
      res.render('course_list.html');
      res.end();
    });
  }
}

exports.data = methods;
