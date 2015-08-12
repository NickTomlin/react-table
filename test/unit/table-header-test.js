describe('Table Header', function () {
  var helpers = require('./support/helpers');
  var TableHeader = require('../../src/table-header');

  function renderHeader (header) {
    var table = render(
      <table>
        {header}
      </table>
    );

    return TestUtils.findRenderedComponentWithType(table, TableHeader);
  }

  it('renders a table header', function () {
    var header = renderHeader(<TableHeader />);
    expect(header.getDOMNode().tagName).to.eql('TH');
  });

  it('calls clickHandler prop an event when it is clicked', function () {
    var mock = sandbox.spy();
    var header = renderHeader(<TableHeader clickHandler={mock}/>);

    helpers.click(header.getDOMNode());

    expect(mock).to.have.been.called;
  });

  it('calls clickHandler with the value of its props', function () {
    var mock = sandbox.spy();
    var header = renderHeader(
        <TableHeader
          sortKey="name"
          clickHandler={mock}
        />
    );

    helpers.click(header.getDOMNode());

    expect(mock).to.have.been.calledWith({
      sortKey: 'name'
    });
  });

  it('adds a className based on its sort order', function () {
    var header = renderHeader(<TableHeader />);
    var expectedClassName = header.getClassName();

    TestUtils.findRenderedDOMComponentWithClass(header, expectedClassName);
  });

  it('defaults to inactive', function () {
    var header = renderHeader(<TableHeader />);

    expect(header.props.isActive).to.eql(false);
  });

  it('adds an active class if props.isActive is true', function () {
    var header = renderHeader(
      <TableHeader
        isActive
        sortDirection="descending"
      />
    );
    var expectedClassName = header.getClassName();

    TestUtils.findRenderedDOMComponentWithClass(header, expectedClassName);
  });

  it('adds does not add an active class if props.isActive is false', function () {
    var sortDirection = 'descending';
    var header = renderHeader(
      <TableHeader
        isActive={false}
        sortDirection={sortDirection}
      />
    );
    var expectedClassName = header.getClassName();

    expect(expectedClassName).to.not.contain(sortDirection);
    TestUtils.findRenderedDOMComponentWithClass(header, expectedClassName);
  });
});
