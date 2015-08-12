module.exports = {
  data: [
    {name: "bob", age: 41, eyeColor: 'blue'},
    {name: "susan", age: 30, eyeColor: 'green'},
    {name: "gerald", age: 15, eyeColor: 'blue'},
    {name: "billy", age: 80, eyeColor: 'chrome'},
    {name: "cal", age: 50, eyeColor: 'yellow'}
  ],
  dataWithMeta: [
    {_private: "I should't be displayed", name: "bob", age: 41, eyeColor: 'blue'},
    {_private: "I should't be displayed", name: "susan", age: 30, eyeColor: 'green'}
  ],
  headings: [
    'heading1',
    'heading2',
    'heading3'
  ]
};
