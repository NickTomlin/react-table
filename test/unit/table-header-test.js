jest.dontMock('../../src/table-header');
require('./spec-helper');

describe('Table Header', function () {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var helper = require('./spec-helper');
  var TableHeader = require('../../src/table-header');
  var render = TestUtils.renderIntoDocument;

  it('renders a table header', function () {
    var tableHeader = render(<TableHeader />);
    expect(tableHeader.getDOMNode().tagName).toEqual('TH');
  });

  it('calls clickHandler prop an event when it is clicked', function () {
    var mock = jest.genMockFunction();
    var tableHeader = render(<TableHeader clickHandler={mock}/>);

    helper.click(tableHeader.getDOMNode());

    expect(mock).toBeCalled();
  });

  it('calls clickHandler with the value of its props', function () {
    var mock = jest.genMockFunction();
    var tableHeader = render(
      <TableHeader
        sortKey="name"
        clickHandler={mock}
      />
    );

    helper.click(tableHeader.getDOMNode());

    expect(mock).toBeCalledWith({
      sortKey: 'name'
    });
  });

  it('adds a className based on its sort order', function () {
    var tableHeader = render(<TableHeader />);
    var expectedClassName = tableHeader.getClassName();

    TestUtils.findRenderedDOMComponentWithClass(tableHeader, expectedClassName);
  });

  it('defaults to inactive', function () {
    var tableHeader = render(<TableHeader />);

    expect(tableHeader.props.isActive).toBeFalsy();
  });

  it('adds an active class if props.isActive is true', function () {
    var tableHeader = render(
      <TableHeader
        isActive
        sortDirection="descending"
      />
    );
    var expectedClassName = tableHeader.getClassName();

    TestUtils.findRenderedDOMComponentWithClass(tableHeader, expectedClassName);
  });

  it('adds does not add an active class if props.isActive is false', function () {
    var sortDirection = 'descending';
    var tableHeader = render(
      <TableHeader
        isActive={false}
        sortDirection={sortDirection}
      />
    );
    var expectedClassName = tableHeader.getClassName();

    expect(expectedClassName).not.toContain(sortDirection);
    TestUtils.findRenderedDOMComponentWithClass(tableHeader, expectedClassName);
  });
});
