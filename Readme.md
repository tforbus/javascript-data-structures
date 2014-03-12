## JavaScript Data Structures
---

A collection of data structures written in JavaScript.

### Usage
Some data structures require a way to compare elements. Right now, these data 
structures are:
- Heap
- BinarySearchTree

If you plan on storing just numbers in these, you won't need to 
specify your own comparison function. Otherwise, you'll need to initialize the 
data structure like this (though this example is intended to compare numbers)

```javascript
/**
 * compare returns a:
 * negative - meaning el1 is less than el2
 * 0 - meaning they are equal
 * positive - meaning el1 is greater than el2
 */
var heap = new Heap({
    compare: function(el1, el2) {
        return el1 - el2;
    }
});
```

If you're storing non-numbers, the compare() function is necessary so the 
data structure knows how to compare the data types stored within it.
compare() must return an numeric value.


### Element comparisons
If you want to implement a min heap instead of a max heap, or have your BST do things in 
reverse, simply write your compare function backwards.
```javascript
// max heap
function(a, b) { return b - a; }
```
