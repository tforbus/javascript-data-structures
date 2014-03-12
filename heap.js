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

  var cur, par;
  for (cur = len - 1, par = this.__parentIndex(cur);
    cur >= 0 && this.__compare(this.data[cur], this.data[par]) < 0;) {
    this.__swapIndeces(cur, par);
    cur = par;
    par = this.__parentIndex(cur);
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


  for (var parentIndex = 0, childIndex = smallerChildIndex(parentIndex);
      this.__compare(this.data[parentIndex], this.data[childIndex]) > 0;) {
    this.__swapIndeces(parentIndex, childIndex);
    parentIndex = childIndex;
    childIndex = smallerChildIndex(parentIndex);
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
