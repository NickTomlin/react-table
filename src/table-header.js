var React = require('react');

module.exports = React.createClass({
  className: 'table-header',
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
      this.className + '__' + this.props.sortDirection : '';
    return [this.className, activeClass].join(' ');
  },
  render: function () {
    return React.DOM.th({
      onClick: this.handleClick,
      className: this.getClassName()
    }, this.props.children);
  }
});
