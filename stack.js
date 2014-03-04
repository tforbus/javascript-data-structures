function Stack(options) {
  this.data = [];
}

Stack.prototype.pop = function() {
  return this.data.pop();
};

Stack.prototype.peek = function() {
  if (this.data.length === 0) return null;
  return this.data[this.data.length - 1];
};

Stack.prototype.push = function(element) {
  return this.data.push(element);
};

Stack.prototype.size = function() {
  return this.data.length;
};
