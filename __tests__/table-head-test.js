jest.dontMock('../src/table-head');
jest.dontMock('../src/table-header');

describe('TableHead', function () {
  var TableHead = require('../src/table-head');
  var TableHeader = require('../src/table-header');
  var React = require('react/addons');
  var helper = require('./spec-helper');
  // curry render for less typing.
  var render = helper.render.bind(null, TableHead);
  TestUtils = React.addons.TestUtils;

  function queryHeadings (Component) {
    return TestUtils.scryRenderedComponentsWithType(Component, TableHeader);
  }

  it('renders a TableHeader element for each item in the columns prop', function () {
    var head = render({columns: fixtures.headings});
    var headings = queryHeadings(head);

    expect(headings.length).toEqual(fixtures.headings.length);
  });

  it('calls clickHandler handler when TableHeader is clicked', function () {
    var mockHandler = jest.genMockFunction();
    var head = render({handleHeadingClick: mockHandler, sortKey: 'foo', columns: fixtures.headings});
    var secondHeading = queryHeadings(head)[1].getDOMNode();
    helper.click(secondHeading);

    expect(mockHandler).toBeCalled();
  });
});
