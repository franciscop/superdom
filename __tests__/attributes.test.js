// Test the attributes:
// let links = dom.a.href; dom.a.href = '...'; delete dom.a.href;
let dom = require('../superdom');
let initial = '<a>Link</a>';
let link = 'https://example.com/'

beforeEach(() => {
  document.body.innerHTML = '<a target="_blank">Link</a><p>Lorem <strong>ipsum</strong></p>';
});

afterEach(() => {
  document.body.innerHTML = '';
});


it('Can set an attribute of one element', () => {
  dom.a.href = link;
  expect(dom.a[0].getAttribute('href')).toBe(link);
});

it('handles non-existing elements just fine', () => {
  expect(dom.a.bla[0]).toBe('');
});

it('Can set an attribute of all matched', () => {
  document.body.innerHTML = '<a>Link1</a><a>Link2</a>';
  dom.a.href = link;
  expect(dom.a[0].getAttribute('href')).toBe(link);
  expect(dom.a[1].getAttribute('href')).toBe(link);
});


it('Can set the attribute dynamically', () => {
  document.body.innerHTML = '<a>Link1</a><a>Link2</a>';
  dom.a.href = link;
  dom.a.href = (prev, i) => prev + i;
  expect(dom.a[0].getAttribute('href')).toBe(link + '0');
  expect(dom.a[1].getAttribute('href')).toBe(link + '1');
});

it('receives the correct parameters', () => {
  dom.a.target = (prev, i, all) => {
    expect(prev).toBe('_blank');
    expect(i).toBe(0);
    expect(all).toHaveLength(1);
    return 'invalid';
  }
  dom.a.target = prev => expect(prev).toBe('invalid');
});


it('Only sets the attribute where it should', () => {
  document.body.innerHTML = '<a class="cta">Link1</a><a>Link2</a>';
  dom.class.cta.target = '_blank';
  expect(dom.class.cta[0].getAttribute('target')).toBe('_blank');
  expect(dom['a:not(.cta)'][0].getAttribute('target')).not.toBe('_blank');
});


// Delete
it('Does not actually remove the attribute, just make it empty', () => {
  dom.a.target = '';
  expect(dom.a[0].getAttribute('target')).toBe('');
});

it('Delete an attribute', () => {
  delete dom.a.target;
  expect(dom.a.target[0]).toBe('');
  expect(dom.a[0].getAttribute('target')).toBe(null);
});
