require('phantom-ownpropertynames/implement'); // required to allow proxyquire deps to work with phantom :(
var data = require('./data');
var React = require('react/addons');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai');
var TestUtils = React.addons.TestUtils;

chai.use(sinonChai);

var fixtures = {};

// mix data into fixtures
for (var prop in data) {
  fixtures[prop] = data[prop];
}

global.React = React;
global.TestUtils = TestUtils;
global.render = TestUtils.renderIntoDocument;

global.sinon = sinon;
global.sandbox = sinon.sandbox.create();
global.fixtures = fixtures;
global.expect = chai.expect;
