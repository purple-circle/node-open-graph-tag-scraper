'use strict';

var openTags = require('../../index.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

describe('Invalid URL', function() {

  it('Should return an empty object', function (done) {
    var youtubeTags = openTags.fetch('http://localhost:3000/no-og-tags.html');
    youtubeTags.should.eventually.be.empty.notify(done);
  });

});