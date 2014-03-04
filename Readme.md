## JavaScript Data Structures
---

A collection of data structures written in JavaScript.

### Usage
Some data structures require a way to compare elements. Right now, these data 
structures are:
- Heap
- BinarySearchTree

If you plan on storing just numbers or strings in these, you won't need to 
specify your own comparison function. Otherwise, you'll need to initialize the 
data structure like this (though this example is intended to compare numbers)

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
If you're storing non-primitives, the compare() function is necessary so the 
data structure knows how to compare the data types stored within it.
compare() must return an object with the properties GREATER_THAN, EQUAL 
and LESS_THAN.
