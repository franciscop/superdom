// Change the current node selection
dom.api.navigate = {};
dom.api.navigate.parent = node => node.parentNode || false;
dom.api.navigate.children = node => node.children;
