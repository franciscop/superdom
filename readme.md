# superdom.js

You have `dom`. It has all the DOM virtually within it. Use that power:

```js
// Fetch all of the links from the page
var links = dom.a;

// Make the links open in a new tab
dom.a.attr.target = '_blank';
```

> Not compatible with Internet Explorer and older Safari http://caniuse.com/#feat=proxy


## Installation

Download `superdom.min.js` somewhere nice and include it:

```html
<script src="superdom.min.js"></script>
```



## Select

To find **an array with the matched elements**, just get a property of *dom* with that selector:

```js
// Simple element selector
var allLinks = dom.a;

// Combined selector
var importantLinks = dom['a.important'];
```

There are also some predetermined elements, such as `id`, `class` and `attr` that can be used:

```js
// Get them by id:
var main = dom.id.main;

// by class:
var buttons = dom.class.button;

// or by attribute:
var targeted = dom.attr.target;
```



## Generate

Use it as a function or a tagged template literal to generate DOM fragments:

```js
// Not a typo; tagged template literals
var list = dom`<a href="https://google.com/">Google</a>`;

// It is the same as
var link = dom('<a href="https://google.com/">Google</a>');
```



## Replace

Set a property to replace those elements in the DOM

```js
dom['a.google'] = '<a href="https://google.com>">Google</a>';

dom.class.tableofcontents = `
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


## Delete

Or just delete it to delete that in the DOM:

```js
// Delete all of the .google classes
delete dom.class.google;   // Is this an ad-block rule?
```



## Manipulate

Did we say it returns an array?

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

Go ahead, go all Marxist and manipulate the classes:

```js
// Add the class 'test' (different ways)
dom.a.class = 'test';
dom.a.class.test = true;

// Remove the class 'test' (different ways)
delete dom.a.class.test;
dom.a.class.test = false;

// Check if any link has the class 'test' as a boolean
var isTest = dom.a.class.test;
```

Or get into genetics to manipulate the attributes:

```js
dom.a.attr.target = '_blank';

// Only to external sites:
var isOwnPage = el => /^https?\:\/\/mypage\.com/.test(el.getAttribute('href');
dom.a.attr.target = (prev, i, element) => isOwnPage(element) ? '' : '_blank';
```
gg
