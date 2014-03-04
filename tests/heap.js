module('heap');

/* Going to use this throughout tests */
function heapCompare(el1, el2) {
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

test('data is empty upon initialization', function (assert) {
  var heap = new Heap({
    compare: function(el1, el2) { /* empty */ }
  });
  assert.equal(heap.data.length, 0);
});

test('default heap type is max heap', function (assert) {
  var heap = new Heap({
    compare: function(el1, el2) { /* empty */ }
  });
  assert.equal(heap.type, 'max');
});

test('max heap peek is largest element', function (assert) {
  var heap = new Heap({compare: heapCompare});
  heap.insert(100);
  heap.insert(101);
  heap.insert(102);
  heap.insert(99);

  assert.equal(heap.peek(), 102);
});

test('min heap peek is smallest element', function (assert) {
  var heap = new Heap({type: 'min', compare: heapCompare});
  heap.insert(1);
  heap.insert(2);
  heap.insert(0);
  heap.insert(4);

  assert.equal(heap.peek(), 0);
});

test('max heap pop is largest element', function (assert) {
  var heap = new Heap({compare: heapCompare});
  heap.insert(1);
  heap.insert(3);
  heap.insert(2);
  heap.insert(4);
  var popped = heap.pop();
  assert.equal(4, popped);
  assert.equal(heap.data.length, 3);

  popped = heap.pop();
  assert.equal(3, popped);
  assert.equal(heap.data.length, 2);
});

test('min heap pop is smallest element', function (assert) {
  var heap = new Heap({type: 'min', compare: heapCompare});
  heap.insert(1);
  heap.insert(3);
  heap.insert(2);
  heap.insert(4);

  var popped = heap.pop();
  assert.equal(1, popped);
  assert.equal(heap.data.length, 3);

  popped = heap.pop();
  assert.equal(2, popped);
  assert.equal(heap.data.length, 2);
});

test('popping empty heap returns null', function (assert) {
  var heap = new Heap({compare: heapCompare});
  assert.equal(heap.pop(), null);
});

test('peeking empty heap returns null', function (assert) {
  var heap = new Heap({compare: heapCompare});
  assert.equal(heap.peek(), null);
});
