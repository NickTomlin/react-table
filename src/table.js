var React = require('react');
var TableRow = require('./table-row');
var TableHead = require('./table-head');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      data: []
    };
  },
  getInitialState: function () {
    return {
      sortDirection: 'ascending'
    };
  },
  handleHeadingClick: function (data) {
    var activeKey = this.state.activeSortKey;

    if (activeKey && activeKey === data.sortKey) {
      this.setState({
        sortDirection: this.state.sortDirection ===
          'ascending' ? 'descending' : 'ascending'
      });
    } else {
      this.setState({
        activeSortKey: data.sortKey
      }, function () {
      }.bind(this));
    }
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
    return TableHead({
      columns: columns,
      activeKey: this.state.activeSortKey,
      handleHeadingClick: this.handleHeadingClick,
      sortDirection: this.state.sortDirection
    });
  },
  sortRowData: function (rowA, rowB) {
    var key, a, b;

    if(this.state.activeSortKey) {
      key = this.state.activeSortKey;
    } else {
      key = Object.keys(rowA)[0];
    }

    a = rowA[key];
    b = rowB[key];

    return this.state.sortDirection === 'ascending' ?
      a > b
      : a <= b;
  },
  renderRows: function () {
    return this.props.data.sort(this.sortRowData.bind(this)).map(function (row) {
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
