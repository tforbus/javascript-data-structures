## JavaScript Data Structures
---

A collection of data structures written in JavaScript.

### Usage
Some data structures require a way to compare elements. Right now, these data 
structures are:
- Heap
- BinarySearchTree

In order to use them, you will need to create an instance of the data structure 
like this:

```javascript
var heap = new Heap({
    compare: function(el1, el2) {
        var comparison = {
            GREATER_THAN: false,
            EQUAL: false,
            LESS_THAN: false
        };
        if (el1 < el2) comparison.LESS_THAN = true;
        else if (el1 > el2) comparison.GREATER_THAN = true;
        else comparison.EQUAL = true;
        return comparison;
    }
});
```
The compare() function is necessary so the data structure knows how to compare 
the data types stored within it. compare() must return an object with the 
properties GREATER_THAN, EQUAL and LESS_THAN.
