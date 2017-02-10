// Selector-level extensible

// Choose which method to use
dom.api.selectors = (sel = []) => typeof sel === 'string'
  ? /^\s*</.test(sel)
    ? dom.api.selectors.generate(sel)
    : [...(document.querySelectorAll(sel))]
  : sel instanceof Element
    ? [sel]
    // Allows for array of non-elements to be turned into a simple array
    : [...sel].map(el => dom(el)).reduce((all, one) => all.concat(one), []);

// The one to generate a chunk of html
dom.api.selectors.generate = html => {
  let type = /^\s*<t(h|r|d)/.test(html) ? 'table' : 'div';
  let cont = document.createElement(type);
  cont.innerHTML = html.replace(/^\s*/, '').replace(/\s*$/, '');
  return [...cont.childNodes];
};

// Some custom selectors:
dom.api.selectors.id = name => dom[`#${name}`];
dom.api.selectors.class = name => dom[`.${name}`];
dom.api.selectors.attr = name => dom[`[${name}]`];
