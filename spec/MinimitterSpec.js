require('../minimitter');

describe('minimitter', function() {
  var emitter;
  this.func = function func() { };
  this.fail = function fail() { throw false; };
  var self = this;

  beforeEach(function() {
    emitter = new Minimitter();
    spyOn(self, 'func');
    spyOn(console, 'error');
  });

  it('should set a listener with .on', function() {
    emitter.on('test', function() { });
    expect(Object.keys(emitter.listeners)).toEqual(['test'])
    expect(typeof emitter.listeners['test'][0]).toBe('function')
  });

  it('should unset a listener with .off', function() {
    emitter.on('test', self.func);
    expect(Object.keys(emitter.listeners)).toEqual(['test'])
    expect(typeof emitter.listeners['test'][0]).toBe('function')
    emitter.off('test', self.func);
    expect(emitter.listeners['test']).toEqual([]);
  });

  it('should trigger a callback after emitting an event with .emit', function() {
    emitter.on('test', self.func);
    emitter.emit('test');
    expect(self.func).toHaveBeenCalled();
  });

  it('should pass the data argument to the callback after emitting an event with .emit', function() {
    emitter.on('test', self.func);
    emitter.emit('test', 'test-data');
    expect(self.func).toHaveBeenCalledWith('test-data');
  });

  it('catch exceptions in callbacks and print an error message', function() {
    emitter.on('test', self.fail);
    emitter.emit('test');
    expect(console.error).toHaveBeenCalled();
  });
})
