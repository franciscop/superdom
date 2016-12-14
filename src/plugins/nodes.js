// dom.a.each = a => {}
dom.api.nodes = {};
dom.api.nodes.each = (cb, node, i, all) => cb(node, i, all);

dom.api.nodes.html = {
  get: node => node.innerHTML,
  set: (cb, node, i, all) => node.innerHTML = cb(node.innerHTML, i, all) || '',
  del: node => node.innerHTML = ''
};

dom.api.nodes.text = {
  get: node => node.textContent,
  set: (cb, node, i, all) => node.textContent = cb(node.textContent, i, all) || '',
  del: node => node.textContent = ''
};

// dom.a.class; dom.a.class = classes => newClasses; delete dom.a.class
dom.api.nodes.class = {
  get: node => Array.from(node.classList),
  set: (cb, node, i, all) => {
    let val = cb(Array.from(node.classList), i, all);
    val = typeof val === 'string' ? dom.api.helpers.args(val) : val;
    val.forEach(one => node.classList.add(one));
  }
};
