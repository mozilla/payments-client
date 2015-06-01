'use strict';

var ghPagesConfig = require('../tasks/gh-pages');

describe('grunt-gh-pages config', function() {
  it('Relase branch publication should have silent=true', function() {
    assert.equal(ghPagesConfig.release.options.silent, true);
  });
});
