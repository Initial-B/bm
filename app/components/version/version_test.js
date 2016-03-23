'use strict';

describe('bm.version module', function() {
  beforeEach(module('bm.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
