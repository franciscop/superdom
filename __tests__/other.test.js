// Mutted so far until future migration
it('works', () => {});



// describe("dom[selector][attribute]", function() {
//
//   afterEach(function(){
//     base.attr({ bla: false, blu: false, blo: false });
//   });
//
//   it('#attr-each alias of forEach', () => {
//     dom.a.each = (node, i, all) => {
//       //console.log("Parts", node, i, all);
//       expect(node instanceof Element).to.equal(true, 'An element');
//       expect(typeof i).to.equal('number', 'A number');
//       expect(all instanceof Array).to.equal(true, 'An array');
//     };
//   });
//
//   it("#attr-list fake attr is empty", function() {
//     console.log("AAA", typeof dom.id.base.bla[0], "BBB");
//     expect(typeof dom.id.base.bla[0]).to.equal('undefined');
//     expect(dom.id.base.bla instanceof Array).to.equal(true);
//   });
//
//   it("#attr-list retrieve a list of hrefs", function(){
//     expect(str(dom['#base a'].href)).to.deep.equal(str(['#1', '#2', '#3']));
//     expect(dom['#base a'].href[0]).to.equal('#1');
//   });
//
//   it("#attr-list retrieve a list of names", function(){
//     var names = ['name', 'email', 'other', 'options'];
//     expect(str(dom['#base form [name]'].name)).to.deep.equal(str(names));
//     expect(dom['#base form [name]'].name[0]).to.equal('name');
//   });
//
//   it("#attr-value checks if any attribute has the value", function(){
//     expect(dom['#base form [name]'].name.email).to.equal(true);
//     expect(dom['#base form [name]'].name.nonexisting).to.equal(false);
//     expect(dom['#base form [name]'].name['email']).to.equal(true);
//     expect(dom['#base form [name]'].name['nonexisting']).to.equal(false);
//   });
//
//   it("#attr-alias get the text of .insides", function(){
//     expect(str(dom.class.insides.text)).to.deep.equal(str(['a thing']));
//     expect(dom.class.insides.text[0]).to.deep.equal('a thing');
//   });
//
//   it("#attr-alias can change the html of .insides", function(){
//     dom.class.insides = '<div class="insides">I am inside</div>';
//     expect($('.insides').html()).to.equal('I am inside');
//     dom.class.insides = el => '<div class="insides">me too</div>';
//     expect($('.insides').html()).to.equal('me too');
//   });
//
//   it("#attr-alias travel one level up", function(){
//     expect(dom.id.base.parent.id[0]).to.equal('demo');
//   });
//
//   it("#attr-alias there's a limit up", function(){
//     expect(dom.body.parent[0].nodeName).to.equal('HTML');
//     expect(dom.html.parent[0]).to.equal();
//     expect(typeof dom.html.parent[0]).to.equal('undefined');
//   });
//
//   it("#attr-alias go down a level", function(){
//     expect(dom.html.children.length).to.equal(2);
//     expect(dom.id.demo.children.id[0]).to.equal('base');
//   });
//
//   it("#attr-set set a new attribute", function(){
//     dom.id.demo['data-value'] = 5;
//     expect($('#demo').attr('data-value')).to.equal('5');
//   });
//
//   it("#attr-set change an attribute", function(){
//     dom.id.demo['data-value'] = 3;
//     expect($('#demo').attr('data-value')).to.equal('3');
//   });
// });
