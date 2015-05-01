var express = require('express');
var app = express();

process.chdir('./test');

app.use('/', express.static("../examples/"));

var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Test server running');
});