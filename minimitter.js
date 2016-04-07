var Minimitter = function Minimitter() {
  listeners = {};
};

Minimitter.prototype.on = function(name, callback) {
  this.listeners[name] = this.listeners[name] || [];
  this.listeners[name].push(callback);
};

Minimitter.prototype.off = function(name, callback) {
  this.listeners[name] = this.listeners[name] || [];
  var indexOfCallback = this.listeners[name].indexOf(callback);
  if(~indexOfCallback) {
    this.listeners[name].slice(indexOfCallback, 1);
  }
};

Minimitter.prototype.emit = function(name, data) {
  this.listeners[name].forEach(function(callback) {
    callback(data);
  });
};
