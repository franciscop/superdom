const dom = require('../superdom');

document.body.innerHTML = `
  <div id="demo" class="demo">
    <ul><li>Item</li></ul>
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

it("can select with css", function() {
  expect(dom['[id="demo"]'].length).toBe(1);
  expect(dom['.demo ul'].length).toBe(1);
});
