function Queue() {
  this.data = [];
}

Queue.prototype.pop = function() {
  return this.data.shift();
};

Queue.prototype.peek = function() {
  return this.data[this.size() - 1];
};

Queue.prototype.push = function(element) {
  return this.data.push(element);
};

Queue.prototype.size = function(element) {
  return this.data.length;
};
