var React = require('react');
var ReactTable = require('../index');
var fixtureData = require('../test/unit/data');

React.renderComponent(ReactTable({data: fixtureData.data,
  columnDisplay: {
    'name': 'Full Name'
  }
}), document.body);
