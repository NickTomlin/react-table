var React = require('react');
var constants = require('./constants');

module.exports = React.createClass({
  className: constants.moduleClass + '__' + constants.trClass,
  getDefaultProps: function () {
    return {
      data: []
    };
  },
  renderRowData: function () {
    var tds = [];
    var trClass = constants.moduleClass + '__' + constants.tdClass;

    for (var td in this.props.data) {
      tds.push(React.DOM.td({
          className: trClass
        }, this.props.data[td]));
    }

    return tds;
  },
  render: function () {
    var rowData = this.renderRowData();
    return React.DOM.tr({
      className: this.className,
      children: rowData
    });
  }
});
