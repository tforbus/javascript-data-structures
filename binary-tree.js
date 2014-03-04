function BinarySearchTree(options) {
  this.data = [];
  this.size = 0;
  
  if (options.compare) {
    this.__compareElements = options.compare;
  }
}


/**
 * Override this by passing in a compare(el1, el2) into the BST 
 * constructor.
 * This works for numbers and strings.
 */
BinarySearchTree.prototype.__compareElements = function(el1, el2) {
  var comparison = {
    GREATER_THAN: false,
    EQUAL: false,
    LESS_THAN: false
  };

  if (el1 < el2) comparison.LESS_THAN = true;
  else if (el1 > el2) comparison.GREATER_THAN = true;
  else comparison.EQUAL = true;
  return comparison;
};


BinarySearchTree.prototype.insert = function(element) {
  if (this.data.length === 0) {
    this.data.push(element);
    return element;
  }

  var currentIndex = 0;

  while (true) {
    var comparison = this.__compareElements(element, this.data[currentIndex]),
        children = this.__childIndex(currentIndex);

    if (comparison.LESS_THAN) {
      if (!this.data[children.left]) {
        this.data[children.left] = element;
        return element;
      } else { currentIndex = children.left; }
    }

    else if (comparison.GREATER_THAN) {
      if (!this.data[children.right]) {
        this.data[children.right] = element;
        return element;
      } else { currentIndex = children.right; }
    }

    else return null;
  }
};


/**
 * If withIndex (true/false) is supplied (as a truthy value), the item 
 * returned is an object with the properties value and index.
 * Otherwise, just the element searched for is returned.
 */
BinarySearchTree.prototype.find = function(element, withIndex) {
  if (this.data.length === 0) { return null; }
  var currentIndex = 0;

  while (true) {
    var comparison = this.__compareElements(element, this.data[currentIndex]),
        children = this.__childIndex(currentIndex);

    if (comparison.LESS_THAN) {
      if (!this.data[children.left]) return null;
      else currentIndex = children.left;
    }

    else if (comparison.GREATER_THAN) {
      if (!this.data[children.right]) return null;
      else currentIndex = children.right;
    }
    
    else { 
      if (withIndex) return {value: element, index: currentIndex};
      else return element;
    }
  }
};


BinarySearchTree.prototype.remove = function(element) {
  var place = this.find(element, true),
      nChildren = 0,
      children;
  if (!place.index) return null;
  children = this.__childIndex(place.index);
  nChildren = this.__numberOfChildren(place.index);
  
  if (nChildren === 0) {
    return this.__removeLeaf(place.index);
  } else if (nChildren === 1) {
    return this.__removeWithOneSubtree(place.index);
  } else {
    return this.__removeWithTwoSubtrees(place.index);
  }
};


BinarySearchTree.prototype.__minimumInTree = function(startIndex) {
  var childrenIndex = this.__childIndex(startIndex),
      leftChildIndex = childrenIndex.left;

  if (!this.data[leftChildIndex]) {
    return {value: this.data[startIndex], index: startIndex};
  }

  return this.__minimumInTree(leftChildIndex);
};
BinarySearchTree.prototype.__removeLeaf = function(atIndex) {
  // returns the removed value
  return this.data.splice(atIndex, 1)[0];
};


BinarySearchTree.prototype.__removeWithOneSubtree = function(atIndex) {
  var children = this.__childIndex(atIndex),
      childIndex = this.data[children.left] ? children.left : children.right,
      deletedValue = this.data[atIndex];

  this.data[atIndex] = this.data[childIndex];
  this.data.splice(childIndex, 1);

  return deletedValue;
};


BinarySearchTree.prototype.__removeWithTwoSubtrees = function(atIndex) {
  var children = this.__childIndex(atIndex),
      min = this.__minimumInTree(children.right),
      minsChildren = this.__childIndex(min.index),
      deletedValue = this.data[atIndex];
  this.data[atIndex] = min.value;

  if (minsChildren === 0)
    this.__removeLeaf(min.index);
  else
    this.__removeWithOneSubtree(min.index);

  return deletedValue;
};


BinarySearchTree.prototype.__childIndex = function(ofIndex) {
  return {
    left: 2 * ofIndex + 1,
    right: 2 * ofIndex + 2
  };
};


BinarySearchTree.prototype.__numberOfChildren = function(ofIndex) {
  var children = this.__childIndex(ofIndex),
      nChildren = 0;
  if (children.left) { nChildren +=1; }
  if (children.right) { nChildren +=1; }
  return nChildren;
};
