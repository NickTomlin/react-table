var React = require('react');
var ReactTable = React.createFactory(require('../index'));
var request = require('superagent');

var Button = React.createFactory(React.createClass({
  getDefaultProps: function () {
    return {
      clickHandler: function () {}
    };
  },
  handleClick: function () {
    this.props.clickHandler();
  },
  render: function () {
    return React.createElement('div', {onClick: this.handleClick}, 'load data');
  }
}));

var App = React.createFactory(React.createClass({
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function () {
    this.clickHandler();
  },
  clickHandler: function () {
    requestData(function (err, data) {
      if (err) { console.log(err); return; }
      this.setState({
        data: data
      });
    }.bind(this));
  },
  render: function () {
    return React.DOM.div({
      children: [
        React.createElement('h2', {
          className: 'hero-button'
        }, 'React Table'),
        Button({clickHandler: this.clickHandler}),
        ReactTable({
          data: this.state.data,
          columnDisplay: {
            'neighborhood': 'borough'
          }
        })
      ]
    });
  }
}));

function requestData (callback) {
  request.get('/data')
    .end(function (err, res) {
      callback(err, pipeline(res.body));
    });
}

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

React.render(App(), document.body);
