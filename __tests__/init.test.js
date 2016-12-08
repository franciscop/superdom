const dom = require('../superdom');

// Testing the main file
it("should be defined", () => {
  expect(!!dom).toBe(true);
});

it("should be a function", () => {
  expect(typeof dom).toBe("function");
});

it("can accept no argument", () => {
  expect(dom() instanceof Array).toBe(true);
  expect(dom()).toHaveLength(0);
});
