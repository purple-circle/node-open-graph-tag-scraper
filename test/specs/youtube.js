"use strict";

var openTags = require("../../index.js");
var chai = require("chai");
var chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

describe('Youtube example', function() {

  it('Should return tags', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.not.be.empty.notify(done);
  });

  it('Should not have keywords property', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.not.have.property("keywords").notify(done);
  });

  it('Should have url property', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.have.property("url").notify(done);
  });

  it('Should have site_name property', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.have.property("site_name").notify(done);
  });
  it('Should have title property', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.have.property("title").notify(done);
  });

});