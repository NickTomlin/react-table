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
      this.props.clickHandler.apply(null, arguments);
    }
  },
  renderHeaders: function () {
    return this.props.columns.map(function (column) {
      return TableHeader({
        clickHandler: this.props.handleHeadingClick,
        children: column,
        isActive: this.props.activeKey === column,
        sortKey: column,
        sortDirection: this.props.sortDirection
      });
    }.bind(this));
  },
  render: function () {
    return React.DOM.thead({
      children: this.renderHeaders()
    });
  }
});
