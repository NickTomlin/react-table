var React = require('react');
var constants = require('./constants');

module.exports = React.createClass({
  className: constants.moduleClass + '__' + constants.thClass,
  getDefaultProps: function () {
    return {
      isActive: false,
      sortDirection: 'ascending'
    };
  },
  handleClick: function () {
    if (this.props.clickHandler) {
      this.props.clickHandler({
        sortKey: this.props.sortKey
      });
    }
  },
  getClassName: function () {
    var activeClass = this.props.isActive ?
      this.className + '--' + this.props.sortDirection : '';
    return [this.className, activeClass].join(' ');
  },
  render: function () {
    return React.createElement('th', {
      onClick: this.handleClick,
      className: this.getClassName()
    }, this.props.children);
  }
});
