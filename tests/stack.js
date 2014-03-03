module('stack');

test('data is empty upon initialization', function (assert) {
  var stack = new Stack();
  assert.equal(stack.data.length, 0);
});

test('popping empty stack returns null', function (assert) {
  var stack = new Stack();
  assert.equal(stack.pop(), null);
});

test('popping decreases size of data', function (assert) {
  var stack = new Stack();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.pop();
  assert.equal(stack.size(), 2);
});

test('pushing adds to end', function (assert) {
  var stack = new Stack();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  assert.equal(stack.data[stack.data.length - 1], 3);
});

test('peeking empty returns null', function (assert) {
  var stack = new Stack();
  assert.equal(stack.peek(), null);
});

test('peek returns last element', function (assert) {
  var stack = new Stack();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  assert.equal(stack.peek(), 3);
});
