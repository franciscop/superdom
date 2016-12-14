const dom = require('../../superdom');

const initial = '<p>Hello <strong>world</strong></p>';

beforeEach(() => {
  document.body.innerHTML = initial;
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('can read html', () => {
  expect(dom.body.html[0]).toBe(initial);
});

it('can write html', () => {
  dom.body.html = 'Hello world';
  expect(document.body.innerHTML).toBe('Hello world');
});

it('can append to html by setting a cb', () => {
  dom.body.html = html => html + 'abc';
  expect(document.body.innerHTML).toBe(initial + 'abc');
});

it('passes correct arguments to the setter', () => {
  dom.body.html = (html, i, all) => {
    expect(html).toBe(initial);
    expect(i).toBe(0);
    expect(all).toHaveLength(1);
    expect(all[0]).toBe(document.body);
  }
});

it('can delete it', () => {
  delete dom.body.html;
  expect(document.body.innerHTML).toBe('');
});
