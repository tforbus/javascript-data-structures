module('heap');

/* Going to use this throughout tests */
function minCompare(el1, el2) {
  return el1 - el2;
}

function maxCompare(el1, el2) {
  return el2 - el1;
}

test('data is empty upon initialization', function (assert) {
  var heap = new Heap({
    compare: function(el1, el2) { /* empty */ }
  });
  assert.equal(heap.data.length, 0);
});


test('max heap peek is largest element', function (assert) {
  var heap = new Heap({compare: maxCompare});
  heap.push(100);
  heap.push(101);
  heap.push(102);
  heap.push(99);

  assert.equal(heap.peek(), 102);
});

test('min heap peek is smallest element', function (assert) {
  var heap = new Heap({type: 'min', compare: minCompare});
  heap.push(1);
  heap.push(2);
  heap.push(0);
  heap.push(4);

  assert.equal(heap.peek(), 0);
});

test('max heap pop is largest element', function (assert) {
  var heap = new Heap({compare: maxCompare});
  heap.push(1);
  heap.push(3);
  heap.push(2);
  heap.push(4);
  var popped = heap.pop();
  assert.equal(4, popped);
  assert.equal(heap.data.length, 3);

  popped = heap.pop();
  assert.equal(3, popped);
  assert.equal(heap.data.length, 2);
});

test('min heap pop is smallest element', function (assert) {
  var heap = new Heap({type: 'min', compare: minCompare});
  heap.push(1);
  heap.push(3);
  heap.push(2);
  heap.push(4);

  var popped = heap.pop();
  assert.equal(1, popped);
  assert.equal(heap.data.length, 3);

  popped = heap.pop();
  assert.equal(2, popped);
  assert.equal(heap.data.length, 2);
});

test('popping empty heap returns null', function (assert) {
  var heap = new Heap({compare: minCompare});
  assert.equal(heap.pop(), null);
});

test('peeking empty heap returns null', function (assert) {
  var heap = new Heap({compare: minCompare});
  assert.equal(heap.peek(), null);
});
