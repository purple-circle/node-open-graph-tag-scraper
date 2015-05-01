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

  it('Should not have description property', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.not.have.property("description").notify(done);
  });

  it('Should have og:url property', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.have.property("og:url").notify(done);
  });

  it('Should have og:site_name property', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.have.property("og:site_name").notify(done);
  });
  it('Should have og:title property', function (done) {
    var youtubeTags = openTags.fetch("http://localhost:3000/youtube.html");
    youtubeTags.should.eventually.have.property("og:title").notify(done);
  });

});