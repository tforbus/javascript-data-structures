function Queue() {
  this.data = [];
}

Queue.prototype.pop = function() {
  return this.data.shift();
};

Queue.prototype.peek = function() {
  return this.data[0];
};

Queue.prototype.push = function(element) {
  return this.data.push(element);
};

Queue.prototype.size = function() {
  return this.data.length;
};
