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
      sortDirection: 'ascending',
      activeSortKey: this.props.initialSortKey
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
    return (
      <TableHead
        columns={columns}
        columnDisplay={this.props.columnDisplay}
        activeKey= {this.state.activeSortKey}
        handleHeadingClick={this.handleHeadingClick}
        sortDirection={this.state.sortDirection}
        />
    );
  },
  sortRow: function (options, rowA, rowB) {
    var a = rowA[options.key];
    var b = rowB[options.key];

    if (options.direction === 'ascending') {
      if (options.type === 'number') {
        return a - b;
      } else {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }
    } else {
      if (options.type === 'number') {
        return b - a;
      } else {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      }
    }
  },
  sortRows: function (data) {
    if (!data.length) { return data; }
    var sortConfig = {};

    sortConfig.direction = this.state.sortDirection;

    if (this.state.activeSortKey) {
      sortConfig.key = this.state.activeSortKey;
    } else {
      sortConfig.key = data[0] ?
        Object.keys(data[0])[0]
        : undefined;
    }

    sortConfig.type = sortConfig.key ? typeof data[0][sortConfig.key] : undefined;

    return data
          .sort(this.sortRow.bind(this, sortConfig));

  },
  renderRow: function (row) {
    return (
      <TableRow data={this.filterObject(row)} />
    );
  },
  renderRows: function () {
    // keep things immutable-ish
    var data = this.props.data.slice();

    return this.sortRows(data)
      .map(this.renderRow);
  },
  render: function () {
    return (
      <table>
        {this.renderHead()},
        {this.renderRows()}
      </table>
    );
  }
});
