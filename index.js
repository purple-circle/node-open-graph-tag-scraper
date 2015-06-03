"use strict";

var request = require('request');
var cheerio = require('cheerio');
var Q = require("q");

var openTags = {};

openTags.parseHtml = function(html) {
  var result = {};
  var $ = cheerio.load(html);
  var metaTags = $("meta").filter(function() {
    if(!this.attribs.property) {
      return false;
    }
    return this.attribs.property.match("og:");
  });

  metaTags.each(function(i, element) {
    var attrs = element.attribs;
    result[attrs.property.replace("og:", "")] = attrs.content;
  });

  return result;
};

openTags.fetch = function(url) {
  var deferred = Q.defer();

  request(url, function (error, response, data) {
    if (!error && response.statusCode === 200) {
      var result = openTags.parseHtml(data);

      deferred.resolve(result);
    } else {
      deferred.reject({error: error});
    }
  });

  return deferred.promise;
};

module.exports = openTags;