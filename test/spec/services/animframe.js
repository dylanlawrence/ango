'use strict';

describe('Service: animFrame', function () {

  // load the service's module
  beforeEach(module('angoApp'));

  // instantiate service
  var animFrame;
  beforeEach(inject(function(_animFrame_) {
    animFrame = _animFrame_;
  }));

  it('should do something', function () {
    expect(!!animFrame).toBe(true);
  });

});
