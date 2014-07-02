'use strict';

describe('Service: tree', function () {

  // load the service's module
  beforeEach(module('angoApp'));

  // instantiate service
  var tree;
  beforeEach(inject(function (_tree_) {
    tree = _tree_;
  }));

  it('should do something', function () {
    expect(!!tree).toBe(true);
  });

});
