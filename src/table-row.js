var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      data: []
    };
  },
  renderRowData: function () {
    var tds = [];

    for (var td in this.props.data) {
      tds.push(React.DOM.td(null, this.props.data[td]));
    }

    return tds;
  },
  render: function () {
    var rowData = this.renderRowData();
    return React.DOM.tr({children: rowData});
  }
});
