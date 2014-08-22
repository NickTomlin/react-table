assert = require('assert');
React = require('react/addons');
ReactTestUtils = React.addons.TestUtils;
ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

// STOLEN from React Router
// TODO: Use this as a guard for tests that require DOM.
__DOM__ = ExecutionEnvironment.canUseDOM;

if (__DOM__) {
  var ROOT_NODE = document.createElement('div');
  document.body.appendChild(ROOT_NODE);

  renderComponent = function (component) {
    return React.renderComponent(component, ROOT_NODE);
  };

  removeComponent = function (component) {
    React.unmountComponentAtNode(ROOT_NODE);
  };
}
