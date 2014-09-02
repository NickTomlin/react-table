var React = require('react');
var ReactTable = require('../index');
var request = require('superagent');
// yes, this is a little messy
var data;
var respondToData;

var App = React.createClass({
  render: function () {
    return React.DOM.div({
      componentWillMount: function () {
        var self = this;
        respondToData = function (data) {
          self.props.data = data;
        };
      },
      children: [
        React.DOM.h1(null, 'Hi From React'),
        ReactTable({
          data: this.props.data,
          columnDisplay: {
            'neighborhood': 'borough'
          }
        })
      ]
    });
  }
});

request.get('/data')
  .end(function (err, res) {
    data = pipeline(res.body);
    respondToData(data);
  });

function transformToObject(data) {
  data = data.slice(8);
  return {
    'year': parseInt(data[0]),
    'neighborhood': data[1],
    'county': data[2],
    'gender': data[3],
    'frequency': parseInt(data[4])
  };
}

function pipeline (data) {
  return JSON.parse(data)
    .map(transformToObject);
}


React.renderComponent(App(), document.body);
