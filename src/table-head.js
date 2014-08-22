var React = require('react');
var TableHeader = require('./table-header');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      columns: []
    };
  },
  handleHeadingClick: function () {
    if (this.props.clickHandler) {
      this.props.clickHandler();
    }
  },
  renderHeaders: function () {
    return this.props.columns.map(function (column) {
      return TableHeader({clickHandler: this.handleHeadingClick, children: column});
    }.bind(this));
  },
  render: function () {
    return React.DOM.thead({
      children: this.renderHeaders()
    });
  }
});
