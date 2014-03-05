function Heap(options) {
  this.data = [];
  this.type = 'max';

  if (options.compare) {
    this.__compareElements = options.compare;
  }
  
  if (options.type) {
    if (options.type === 'min') {
      this.type = 'min';
    }
  }
}


/**
 * -1: a < b
 *  0: a == b
 *  1: a > b
 */
Heap.prototype.__compareElements = function(a, b) {
  return a - b;
};


Heap.prototype.insert = function(element) {
  this.data.push(element);
  this.__heapify();
  return element;
};


Heap.prototype.peek = function() {
  if (this.data.length > 0) return this.data[0];
  return null;
};


Heap.prototype.pop = function() {
  if (this.data.length === 0) return null;

  // popping the first element. swap the last with the first.
  this.__swapIndeces(0, this.data.length - 1);
  var popped = this.data.pop();
  
  // the first element needs to find its place.
  this.__percolate();
  return popped;
};


Heap.prototype.size = function() {
  return this.data.length;
};


Heap.prototype.clear = function() {
    this.data = [];
};


/**
 * heapify() works elements from the bottom up.
 */
Heap.prototype.__heapify = function() {
  var params = {
    parentIndex: this.__parentIndex(this.data.length - 1),
    childIndex: this.data.length - 1
  };
      
  while (this.__isOutOfOrder(params)) {
    this.__swapIndeces(params.childIndex, params.parentIndex);
    params.childIndex = params.parentIndex;
    params.parentIndex = this.__parentIndex(params.childIndex);
  }
};


/**
 * percolate() works elements from the top down.
 * For a min heap: swap with smaller child
 * For a max heap: swap with larger child
 */
Heap.prototype.__percolate = function() {  
  var params = {
    parentIndex: 0,
    childIndex: this.__percolateWithChildIndex(0)
  };
      
  while (this.__isOutOfOrder(params) && params.childIndex !== -1) {
    this.__swapIndeces(params.parentIndex, params.childIndex);
    params.parentIndex = params.childIndex;
    params.childIndex = this.__percolateWithChildIndex(params.parentIndex);
  }
};


Heap.prototype.__childIndex = function(ofIndex) {
  return {
    left: 2 * ofIndex + 1,
    right: 2 * ofIndex + 2
  };
};


Heap.prototype.__percolateWithChildIndex = function(ofIndex) {
  var kids = this.__childIndex(ofIndex),
      kidLeftEl = this.data[kids.left],
      kidRightEl = this.data[kids.right],
      comparison = null,
      childSwapIndex = -1;

  if (kidLeftEl && kidRightEl) {
    comparison = this.__compareElements(kidLeftEl, kidRightEl);
  }
  
  else if (kidLeftEl && !kidRightEl) {
    return kids.left;
  }
  
  else if (kidRightEl && !kidLeftEl) {
    return kids.right;
  }
  
  // this node actually has no children, so we're done swapping down.
  else if (!kidRightEl && !kidLeftEl) {
    return -1;
  }
  
  // need the smaller child.
  if (this.type === 'min') {
    childSwapIndex = comparison > 0 ? kids.right : kids.left;
  } else {
    childSwapIndex = comparison < 0 ? kids.right : kids.left;
  }
  
  return childSwapIndex;
};


Heap.prototype.__parentIndex = function(ofIndex) {
  if (ofIndex === 0) { return 0; }
  return Math.floor((ofIndex - 1) / 2);
};


Heap.prototype.__swapIndeces = function(index1, index2) {
  var temp = this.data[index1];
  this.data[index1] = this.data[index2];
  this.data[index2] = temp;
};


/**
 * Compare a parentIndex value to a childIndex value.
 */
Heap.prototype.__isOutOfOrder = function(params) {
  var parent = this.data[params.parentIndex],
      child = this.data[params.childIndex],
      comparison = this.__compareElements(parent, child),
      firstLessThanSecond = comparison < 0;

  if (comparison === 0) { 
    return false;
  }

  if (this.type === 'min' && !firstLessThanSecond) { return true; }
  if (this.type === 'max' && firstLessThanSecond) { return true; }

  return false;
};
