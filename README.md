# superdom.js

> A big rewrite is being finished, so not all of the methods are available

You have `dom`. It has all the DOM virtually within it. Use that power:

```js
// Fetch all of the links from the page
var links = dom.a.href;

// Make the links open in a new tab
dom.a.target = '_blank';
```

> We are in pre-1.0.0 so things might change. Not compatible with [Internet Explorer and older Safari](http://caniuse.com/#feat=proxy)


### Installation

Simply use the CDN via unpkg.com:

```html
<script src="https://unpkg.com/superdom@0"></script>
```

Or use [npm](https://www.npmjs.com/package/superdom) or bower: `npm|bower install superdom`.



## Select

It always returns **an array with the matched elements**, just get a property of *dom* with that selector:

```js
// Simple element selector
var allLinks = dom.a;

// Combined selector
var importantLinks = dom['a.important'];
```

There are also some predetermined elements, such as `id`, `class` and `attr` that can be used for selection:

```js
// Select HTML Elements by id:
var main = dom.id.main;

// by class:
var buttons = dom.class.button;

// or by attribute:
var targeted = dom.attr.target;
var targeted = dom.attr['target="_blank"'];
```


## Generate

Use it as a function or a tagged template literal to generate a DOM fragments:

```js
// Not a typo; tagged template literals
var list = dom`<a href="https://google.com/">Google</a>`;

// It is the same as
var link = dom('<a href="https://google.com/">Google</a>');
```



## Delete elements

Delete a piece of the DOM

```js
// Delete all of the elements with the class .google
delete dom.class.google;   // Is this an ad-block rule?
```



## Attributes

You can easily manipulate attributes right from the `dom` node. There are some aliases that share the syntax of the attributes such as `html` and `text` (aliases for `innerHTML` and `textContent`). There are others that travel through the dom such as `parent` (alias for parentNode) and `children`. Finally, `class` behaves differently as explained below.



### Get attributes

The fetching will always **return an array** with the element for each of the matched nodes (or undefined if not there):

```js
// Retrieve all the urls from the page
var urls = dom.a.href;     // #attr-list
  // ['https://google.com', 'https://facebook.com/', ...]

// Get an array of the h2 contents (alias of innerHTML)
var h2s = dom.h2.html;     // #attr-alias
  // ['Level 2 header', 'Another level 2 header', ...]

// Get whether any of the attributes has the value "_blank"
var hasBlank = dom.class.cta.target._blank;    // #attr-value
  // true/false
```

You also use these:

- html (alias of `innerHTML`): retrieve a list of the htmls
- text (alias of `textContent`): retrieve a list of the htmls
- parent (alias of `parentNode`): travel up one level
- children: travel down one level



### Set attributes

```js
// Set target="_blank" to all links
dom.a.target = '_blank';     // #attr-set
```

```js
dom.class.tableofcontents.html = `
  <ul class="tableofcontents">
    ${dom.h2.map(h2 => `
      <li>
        <a href="#${h2.id}">
          ${h2.innerHTML}
        </a>
      </li>
    `).join('')}
  </ul>
`;
```

### Remove an attribute

To delete an attribute use the `delete` keyword:

```js
// Remove all urls from the page
delete dom.a.href;

// Remove all ids
delete dom.a.id;
```


## Classes

It provides an easy way to manipulate the classes.

### Get classes

To retrieve whether a particular class is present or not:

```js
// Get an array with true/false for a single class
var isTest = dom.a.class.test;     // #class-one
```

For a general method to retrieve all classes you can do:

```js
// Get a list of the classes of each matched element
var arrays = dom.a.class;     // #class-arrays
  // [['important'], ['button', 'cta'], ...]

// If you want a plain list with all of the classes:
var flatten = dom.a.class._flat;     // #class-flat
  // ['important', 'button', 'cta', ...]

// And if you just want an string with space-separated classes:
var text = dom.a.class._text;     // #class-text
  // 'important button cta ...'
```


### Add a class

```js
// Add the class 'test' (different ways)
dom.a.class.test = true;    // #class-make-true
dom.a.class = 'test';       // #class-push
```

### Remove a class

```js
// Remove the class 'test'
dom.a.class.test = false;    // #class-make-false
```






## Manipulate

Did we say it returns a simple array?

```js
dom.a.forEach(link => link.innerHTML = 'I am a link');
```

But what an interesting array it is; indeed we are also proxy'ing it so you can manipulate its sub-elements straight from the selector:

```js
// Replace all of the link's html with 'I am a link'
dom.a.html = 'I am a link';
```

Of course we might want to manipulate them dynamically depending on the current value. Just pass it a function:

```js
// Append ' ^_^' to all of the links in the page
dom.a.html = html => html + ' ^_^';

// Same as this:
dom.a.forEach(link => link.innerHTML = link.innerHTML + ' ^_^');
```

> Note: this won't work `dom.a.html += ' ^_^';` for more than 1 match (for reasons)

Or get into genetics to manipulate the attributes:

```js
dom.a.attr.target = '_blank';

// Only to external sites:
var isOwnPage = el => /^https?\:\/\/mypage\.com/.test(el.getAttribute('href'));
dom.a.attr.target = (prev, i, element) => isOwnPage(element) ? '' : '_blank';
```



## Testing

We are using Jest as a Grunt task for testing. Install Jest and run in the terminal:

```bash
grunt watch
```
