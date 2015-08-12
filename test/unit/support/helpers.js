function simulate (eventType, node) {
  TestUtils.Simulate[eventType](node);
}

module.exports = {
  render: function (Component, options) {
    _.extend({}, options);

    return TestUtils.renderIntoDocument(Component(options));
  },
  click: function (node) {
    simulate('click', node);
  }
};
