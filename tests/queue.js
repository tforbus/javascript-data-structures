module('queue');

test('popping empty queue returns null', function (assert) {
  var q = new Queue();
  assert.equal(q.pop(), null);
});

test('pushing grows queue', function (assert) {
  var q = new Queue();
  q.push(1);
  q.push(2);
  q.push(3);
  assert.equal(q.size(), 3);
});

test('popping shrinks queue', function (assert) {
  var q = new Queue();
  q.push(1);
  q.push(2);
  q.push(3);
  q.pop();
  assert.equal(q.size(), 2);
});

test('popping pops earliest element', function (assert) {
  var q = new Queue();
  q.push(1);
  q.push(2);
  assert.equal(q.pop(), 1);
});
