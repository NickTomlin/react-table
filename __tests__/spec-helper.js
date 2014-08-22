_ = require('lodash');
var data = require('./data');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

fixtures = {};

// mix data into fixtures
for (var prop in data) {
  fixtures[prop] = data[prop];
}

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
