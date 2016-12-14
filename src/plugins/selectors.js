// Selector-level extensible

// Choose which method to use
dom.api.selectors = (name = '') => /^\s*\</.test(name)
  ? dom.api.selectors.generate(name)
  : [...document.querySelectorAll(name)];

// The one to generate a chunk of html
dom.api.selectors.generate = html => {
  let type = /^\s*<t(h|r|d)/.test(html) ? 'table' : 'div';
  let cont = document.createElement(type);
  cont.innerHTML = html.replace(/^\s*/, '').replace(/\s*$/, '');
  return [...cont.childNodes];
};

// Some custom selectors:
dom.api.selectors.id = name => `#${name}`;
dom.api.selectors.class = name => `.${name}`;
dom.api.selectors.attr = name => `[${name}]`;
