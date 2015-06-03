"use strict";

var openTags = require("../../index.js");
var chai = require("chai");
chai.should();

describe('Parse html', function() {

  it('Should return empty object', function() {
    var youtubeTags = openTags.parseHtml("");
    return youtubeTags.should.be.empty;
  });

  it('Should return property hello', function() {
    var youtubeTags = openTags.parseHtml('<meta property="og:hello" content="world">');
    youtubeTags.should.have.property("hello");
  });

});