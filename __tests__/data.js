module.exports = {
  data: [
    {name: "bob", age: 41, eyeColor: 'blue'},
    {name: "susan", age: 30, eyeColor: 'green'}
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
