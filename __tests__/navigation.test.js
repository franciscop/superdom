// DOM navigation. Parents, children, etc
const dom = require('../superdom');

beforeEach(() => {
  document.body.innerHTML = '<ul class="list"><li><a></a></li></ul>';
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('DOM navigation', () => {
  it('can retrieve the parent', () => {
    expect(dom.li.parent[0].nodeName).toBe('UL');
  });

  it('can retrieve the parent parent', () => {
    expect(dom.a.parent.parent[0].nodeName).toBe('UL');
  });

  it('keeps the special attrs with get', () => {
    expect(dom.a.parent.parent.class._text).toBe('list');
  });

  it('keeps the special attrs with set', () => {
    dom.a.parent.parent.class = 'good';
    expect(dom.ul.class._text).toBe('list good');
  });

  it('keeps the special attrs with delete', () => {
    dom.a.parent.parent.class = 'good';
    delete dom.a.parent.parent.class.list;
    expect(dom.ul.class._text).toBe('good');
  });
});
