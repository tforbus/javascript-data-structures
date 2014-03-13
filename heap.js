function Heap(options) {
  this.data = [];

  if (options && options.compare)
    this.__compare = options.compare;
}
  
/**
 * Default implementation is a min heap.
 * negative - a < b
 * zero - a == b
 * positive - a > b
 */
Heap.prototype.__compare = function(a, b) {
  return a - b;
};


Heap.prototype.peek = function() {
  return this.data[0];
};


Heap.prototype.push = function(data) {
  this.data.push(data);
  var len = this.data.length;

  if (len === 1)
    return;

  var current = len - 1,
      parent = this.__parentIndex(current);

  while (current >= 0 && this.__compare(this.data[current], this.data[parent]) < 0) {
    this.__swapIndeces(current, parent);
    current = parent;
    parent = this.__parentIndex(current);
  }


};


/**
 * Remove the root element of the heap.
 */
Heap.prototype.pop = function() {

  // to pop faster, put the first element at the end of the array.
  var length = this.data.length;
  this.__swapIndeces(0, length - 1);
  var popped = this.data.pop(),
      self = this;

  function smallerChildIndex(pIndex) {
    var kids = self.__childIndex(pIndex),
        left = self.data[kids.left],
        right = self.data[kids.right];
    if (left && right) {
      if (self.__compare(left, right) < 0) return kids.left;
      else return kids.right;
    } else if (left && !right) {
      return kids.left;
    } else return kids.right;
  }

  var parent = 0,
      child = smallerChildIndex(parent);

  while (this.__compare(this.data[parent], this.data[child]) > 0) {
    this.__swapIndeces(parent, child);
    parent = child;
    child = smallerChildIndex(parent);
  }

  return popped;
};


Heap.prototype.__parentIndex = function(ofIndex) {
  if (ofIndex === 0) { return 0; }
  return Math.floor((ofIndex - 1) / 2);
};


Heap.prototype.__childIndex = function(ofIndex) {
  return {
    left: 2 * ofIndex + 1,
    right: 2 * ofIndex + 2
  };
};

Heap.prototype.__swapIndeces = function(index1, index2) {
  var temp = this.data[index1];
  this.data[index1] = this.data[index2];
  this.data[index2] = temp;
};
