var React = require('react');
var ReactTable = require('../index');
var fixtureData = require('../__tests__/data');

React.renderComponent(ReactTable({data: fixtureData.data}), document.body);
