var openTags = require("./index.js");

// Run test server: node test/server.js

openTags
  .fetch("http://localhost:3000/youtube.html")
  .then(function(result) {
    console.log("result", result);
  }, function(error) {
    console.log("error", error);
  });