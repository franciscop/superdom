// An attribute handles derivatives from Nodes so it normally has its
// corresponding dom.api.nodes. Example:
//   dom.api.nodes.class => dom.a.class;
//   dom.api.attributes.class => dom.a.class.test = true;
// If it has no dom.api.nodes, then the default getAttribute() will be used
dom.api.attributes = {};

dom.api.attributes.class = {
  // dom.a.class.bla = false; dom.a.class.bla = ['a', 'b'] => true;
  set: (cb, key, node, i, all) => {
    let val = cb(node.classList.contains(key), i, all);
    node.classList[val ? 'add' : 'remove'](key);
  },
  del: (key, node) => {
    node.classList.remove(key);
  }
};

// dom.a.on.click = function(){}
dom.api.attributes.on = (cb, key, node) => {
  dom.api.helpers.args(key).forEach(event => node.addEventListener(event, cb));
};

// dom.a.handle.click = function(){}
dom.api.attributes.handle = (cb, key, node) => {
  dom.api.helpers.args(key).forEach(event => node.addEventListener(event, (...args) => {
    args[0].preventDefault();
    cb(...args);
  }));
};

dom.api.attributes.trigger = {
  get: (prevVal, key, node) => {
    // Accept different types of event names
    dom.api.helpers.args(key).forEach(event => {
      let ev = new CustomEvent(event, { bubbles: true, cancelable: true });
      node.dispatchEvent(ev);
    });
  }
};
