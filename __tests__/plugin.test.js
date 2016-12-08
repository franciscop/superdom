// Create a new plugin
let dom = require('../superdom');

dom.api.nodes.beetlejuice = {
  get: node => 'beetlejuice',
  set: (cb, node) => node.innerHTML = 'beetlejuice'
};

describe('plugin creation', () => {
  it('can use the getter', () => {
    expect(dom.body.beetlejuice[0]).toBe('beetlejuice');
  });

  it('can use the setter', () => {
    dom.body.beetlejuice = 'beetlejuice';
    expect(document.body.innerHTML).toBe('beetlejuice');
    document.body.innerHTML = '';
  });
});
