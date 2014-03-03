## JavaScript Data Structures
---

A collection of data structures written in JavaScript.

### Usage
Some data structures require a way to compare elements. Right now, these data 
structures are:
- Heap

In order to use it, you'll need to create an instance of the data structure 
like this:

```javascript
var heap = new Heap({
    compare: function(el1, el2) {
        var compare = {
            GREATER_THAN: false,
            EQUAL: false,
            LESS_THAN: false
        };
        if (el1 < el2) compare.LESS_THAN = true;
        else if (el1 > el2) compare.GREATER_THAN = true;
        else compare.EQUAL = true;
        return compare;
    }
});
```
Why? Because these data structures should store homogenous data, and who knows 
what sort of stuff you'll be throwing in there.

compare() must return an object with the properties GREATER_THAN, EQUAL, 
and LESS_THAN.
