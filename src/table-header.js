var React = require('react');

module.exports = React.createClass({
  handleClick: function () {
    if (this.props.clickHandler) {
      this.props.clickHandler(this.props.children);
    }
  },
  render: function () {
    return React.DOM.th({onClick: this.handleClick}, this.props.children);
  }
});
