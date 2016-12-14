const dom = require('../../superdom');

document.body.innerHTML = `
  <div id="demo" class="demo">
    <ul><li><a href="" target="_blank">Item</a></li></ul>
  </div>
`;

it("can select by class", function() {
  expect(dom.class.demo.length).toBe(1);
});

it("can select by tag", function() {
  expect(dom.body.length).toBe(1);
});

it("can select by id", function() {
  expect(dom.id.demo.length).toBe(1);
});

it("can select by id", function() {
  expect(dom.attr.target.length).toBe(1);
});

it("can select by id", function() {
  expect(dom.attr['target="_blank"'].length).toBe(1);
});

it("can select with css", function() {
  expect(dom['[id="demo"]'].length).toBe(1);
  expect(dom['.demo ul'].length).toBe(1);
});

it("can select as a function", function() {
  expect(dom('#demo').length).toBe(1);
  expect(dom('.demo').length).toBe(1);
  expect(dom('.demo ul').length).toBe(1);
});

it("can generate some html", function() {
  expect(dom('<div class="demo">Hello</div>')[0].nodeName).toBe('DIV');
  expect(dom`<div class="demo">Hello</div>`[0].nodeName).toBe('DIV');

  expect(dom('<div class="demo">Hello</div>').class._text).toBe('demo');
  expect(dom`<div class="demo">Hello</div>`.class._text).toBe('demo');
});
