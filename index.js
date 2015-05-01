"use strict";

var request = require('request');
var cheerio = require('cheerio');
var Q = require("q");

var openTags = {};

openTags.fetch = function(url) {
  var deferred = Q.defer();

  request(url, function (error, response, data) {
    if (!error && response.statusCode === 200) {
      var result = {};
      var $ = cheerio.load(data);
      var metaTags = $("meta").filter(function() {
        if(!this.attribs.property) {
          return false;
        }
        return this.attribs.property.match("og:");
      });

      metaTags.each(function(i, element) {
        result[element.attribs.property] = element.attribs.content;
      });

      deferred.resolve(result);
    } else {
      deferred.reject({error: error});
    }
  });

  return deferred.promise;
};

module.exports = openTags;