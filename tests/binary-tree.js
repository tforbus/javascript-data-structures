module('binary search tree');

/* Going to use this throughout tests */
function treeCompare(el1, el2) {
  var obj = {
    GREATER_THAN: false,
    EQUAL: false,
    LESS_THAN: false
  };

  if (el1 < el2) obj.LESS_THAN = true;
  else if (el1 == el2) obj.EQUAL = true;
  else obj.GREATER_THAN = true;
  return obj;
}

test('throw error if no compare function', function (assert) {
  assert.throws(function() { new BinarySearchTree(); }, 'threw an error');
});

test('size is empty on initialize', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  assert.equal(tree.data.length, 0);
});

test('insert grows size', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(1);
  assert.equal(tree.data.length, 1);
});

test('insert lesser goes left', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(2);
  var left = tree.__childIndex(0).left;
  assert.equal(tree.data[left], 2);
});

test('insert greater goes right', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(6);
  var right = tree.__childIndex(0).right;
  assert.equal(tree.data[right], 6);
});

test('test tree build', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(6);
  tree.insert(2);
  tree.insert(5);

  assert.equal(tree.data[0], 4);
  var six = tree.__childIndex(0).right,
      two = tree.__childIndex(0).left,
      five = tree.__childIndex(six).left;
  assert.equal(tree.data[six], 6);
  assert.equal(tree.data[two], 2);
  assert.equal(tree.data[five], 5);
});

test('find empty returns null', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  assert.equal(tree.find(100), null);
});

test('find element that exists returns element', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(6);
  tree.insert(2);
  tree.insert(5);
  assert.equal(tree.find(4), 4);
  assert.equal(tree.find(6), 6);
  assert.equal(tree.find(2), 2);
  assert.equal(tree.find(5), 5);
});

test('find element that DNE returns null', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(6);
  tree.insert(2);
  assert.equal(tree.find(5), null);
});

test('remove leaf returns single element', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(2);
  var result = tree.__removeLeaf(1);
  assert.equal(result, 2);
});

test('minimum in tree returns minimum', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(2);
  tree.insert(1);
  tree.insert(1.5);
  tree.insert(6);
  tree.insert(5);
  var min = tree.__minimumInTree(0);
  assert.equal(min.value, 1);
  assert.equal(tree.data[min.index], 1);
});

test('remove with one subtree preserves order', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(2);
  tree.insert(1);
  tree.insert(6);
  tree.insert(5);
  assert.equal(tree.data[1], 2);
  var removed = tree.__removeWithOneSubtree(1);
  assert.equal(removed, 2);
  assert.equal(tree.data[1], 1);
});

test('remove with 2 subtrees preserves order', function (assert) {
  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(2);
  tree.insert(1);
  tree.insert(6);
  tree.insert(5);
  assert.equal(tree.data[0], 4);
  var removed = tree.__removeWithTwoSubtrees(0);
  assert.equal(removed, 4);
  assert.equal(tree.data[0], 5);
});

test('remove behaves as expected', function (assert) {
  var leafTree = new BinarySearchTree({compare: treeCompare});
  leafTree.insert(4);
  leafTree.insert(2);
  assert.equal(leafTree.remove(2), 2);

  var oneSub = new BinarySearchTree({compare: treeCompare});
  oneSub.insert(4);
  oneSub.insert(2);
  oneSub.insert(1);
  oneSub.insert(6);
  oneSub.insert(5);
  assert.equal(oneSub.remove(6), 6);

  var tree = new BinarySearchTree({compare: treeCompare});
  tree.insert(4);
  tree.insert(2);
  tree.insert(1);
  tree.insert(6);
  tree.insert(5);
  tree.insert(7);
  assert.equal(tree.remove(7), 7);
});
