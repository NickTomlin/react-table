var React = require('react');
var TableRow = require('./table-row');
var TableHead = require('./table-head');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      data: []
    };
  },
  filterObject: function (obj) {
    var filteredData;
    var includedColumns = this.props.includedColumns;

    if (includedColumns) {
      filteredData = {};

      includedColumns.forEach(function (k) {
        filteredData[k] = obj[k];
      });
    } else {
      filteredData = obj;
    }

    return filteredData;
  },
  generateHeadersFromRow: function (row) {
    var data;
    var keys = [];

    if (row) {
      data = this.filterObject(row);
      keys = Object.keys(data);
    }

    return keys;
  },
  renderHead: function () {
    var columns = this.generateHeadersFromRow(this.props.data[0]);
    return TableHead({columns: columns});
  },
  renderRows: function () {
    return this.props.data.map(function (row) {
      return TableRow({data: this.filterObject(row)});
    }.bind(this));
  },
  render: function () {
    return React.DOM.table({children: [
      this.renderHead(),
      this.renderRows()
    ]});
  }
});
