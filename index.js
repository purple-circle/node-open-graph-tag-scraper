(function() {
  'use strict';
  var Q, cheerio, openTags, request;

  request = require('request');

  cheerio = require('cheerio');

  Q = require('q');

  openTags = {};

  openTags.parseHtml = function(html) {
    var $, metaTags, result;
    result = {};
    $ = cheerio.load(html);
    metaTags = $('meta').filter(function() {
      if (!this.attribs.property) {
        return false;
      }
      return this.attribs.property.match('og:');
    });
    metaTags.each(function(i, arg) {
      var attribs;
      attribs = arg.attribs;
      return result[attribs.property.replace('og:', '').toLowerCase()] = attribs.content;
    });
    return result;
  };

  openTags.fetch = function(url) {
    var deferred;
    deferred = Q.defer();
    request(url, function(error, response, data) {
      if (!error && (response != null ? response.statusCode : void 0) === 200) {
        return deferred.resolve(openTags.parseHtml(data));
      } else {
        return deferred.reject({
          error: error
        });
      }
    });
    return deferred.promise;
  };

  module.exports = openTags;

}).call(this);
