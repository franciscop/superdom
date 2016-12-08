const dom = require('../superdom');

beforeEach(() => {
  document.body.className = 'bla blu';
});

afterEach(() => {
  document.body.className = '';
});

it("#class-arrays: should be an array", () => {
  expect(typeof dom.body.class).toBe('object');
  expect(dom.body.class instanceof Array).toBe(true);
});

it("#class-arrays: retrieves a deep list of classes", () => {
  expect(dom.body.class).toHaveLength(1);
  expect(dom.body.class[0]).toHaveLength(2);
  expect(dom.body.class[0][0]).toEqual('bla');
  expect(dom.body.class[0][1]).toEqual('blu');
});

it("#class-flat: retrieves a simple list of classes", () => {
  expect(dom.body.class._flat).toHaveLength(2);
  expect(dom.body.class._flat[0]).toBe('bla');
  expect(dom.body.class._flat[1]).toBe('blu');
});

it("#class-text: retrieves a text list of classes", () => {
  expect(dom.body.class._text).toBe('bla blu');
});

it("#class-one: can check for a particular class", () => {
  expect(dom.body.class.bla).toBe(true);
  expect(dom.body.class.nonexisting).toBe(false);
});

it("removes the attribute and all classes", () => {
  delete dom.body.class;
  expect(document.body.getAttribute('class')).toBe(null);
  expect(document.body.className).toBe('');
});




// Add a class
it("#class-push: can add a single class with equal", () => {
  document.body.className = '';
  dom.body.class = 'bla';
  expect(document.body.className).toBe('bla');
});

it("#class-push: it adds it to the end", () => {
  dom.body.class = 'blo';
  expect(document.body.className).toBe('bla blu blo');
});

it("#class-push: it does not overwrite others", () => {
  dom.body.class = 'bla';
  expect(document.body.className).toBe('bla blu');
});

it("#class-make-true: can add a single class with true", () => {
  document.body.className = '';
  dom.body.class.bla = true;
  expect(document.body.className).toBe('bla');
});

it("#class-make-true: it's added to the end", () => {
  dom.body.class.blo = true;
  expect(document.body.className).toBe('bla blu blo');
});

it("#class-make-true: it does not overwrite others", () => {
  dom.body.class.bla = true;
  expect(document.body.className).toBe('bla blu');
});


// Delete a class
it("#class-make-false: can remove a single class with false ", () => {
  document.body.className = 'bla';
  dom.body.class.bla = false;
  expect(document.body.className).toBe('');
});

it("can remove a single class with delete", () => {
  document.body.className = 'bla';
  delete dom.body.class.bla;
  expect(document.body.className).toBe('');
});

it("does not remove other classes", () => {
  document.body.className = 'bla blu blo';
  delete dom.body.class.blu;
  expect(document.body.className).toBe('bla blo');
});
