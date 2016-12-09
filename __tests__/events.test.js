let dom = require('../superdom');

document.body.innerHTML = '<a href="">Hello</a>';

dom.api.attribute.trigger = {
  get: (prevVal, key, node) => {
    // Accept different types of event names
    dom.api.args(key).forEach(event => {
      let ev = new CustomEvent(event, { bubbles: true, cancelable: true });
      node.dispatchEvent(ev);
    });
  }
}

// dom.a.on.click = function(){}
dom.api.attribute.on = (cb, key, node) => {
  dom.api.args(key).forEach(event => node.addEventListener(event, cb));
};

it('can handle events', done => {
  dom.a.on.click = e => {
    expect(e.target.nodeName).toBe('A');
    done();
  }
  dom.a.trigger.click;
});

it('can handle multiple events', done => {
  document.body.innerHTML = '<a href="">Hello</a>';
  let counter = 0;
  dom.a.on['click, hover'] = e => {
    counter++;
    expect(e.target.nodeName).toBe('A');
    if (counter === 2) {
      done();
    } else {
      dom.a.trigger.hover;
    }
  }
  dom.a.trigger.click;
});
