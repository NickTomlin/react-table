jest.dontMock('../../src/table-head');
jest.dontMock('../../src/table-header');

describe('TableHead', function () {
  var TableHead = require('../../src/table-head');
  var TableHeader = require('../../src/table-header');
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

  it('remaps table header display if object is passed in', function () {
    var head = render({sortKey: 'foo', columns: fixtures.headings, columnDisplay: {
      'heading1': 'first heading',
      'heading2': 'second heading',
      'heading3': 'third heading'
    }});

    var secondHeadingNode = queryHeadings(head)[1].getDOMNode();

    expect(secondHeadingNode.textContent).toEqual('second heading');
  });

  it('uses the column name as the header display if no mapping is given', function () {
    var head = render({sortKey: 'foo', columns: fixtures.headings, columnDisplay: {
      'heading1': 'first heading',
    }});

    var headings = queryHeadings(head);
    var firstHeadingNode = headings[0].getDOMNode();
    var secondHeadingNode = headings[1].getDOMNode();

    expect(firstHeadingNode.textContent).toEqual('first heading');
    expect(secondHeadingNode.textContent).toEqual(fixtures.headings[1]);
  });
});
