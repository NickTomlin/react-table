describe('TableHead', function () {
  var TableHead = require('../../src/table-head');
  var TableHeader = require('../../src/table-header');
  var helpers = require('./support/helpers');

  function queryHeadings (Component) {
    return TestUtils.scryRenderedComponentsWithType(Component, TableHeader);
  }

  it('renders a TableHeader element for each item in the columns prop', function () {
    var head = render(<TableHead columns={fixtures.headings} />);
    var headings = queryHeadings(head);

    expect(headings.length).to.eql(fixtures.headings.length);
  });

  it('calls clickHandler handler when TableHeader is clicked', function () {
    var mockHandler = sandbox.spy();
    var head = render(
      <table>
        <TableHead
          handleHeadingClick={mockHandler}
          sortKey={'foo'}
          columns={fixtures.headings}
        />
      </table>
    );

    var secondHeading = queryHeadings(head)[1].getDOMNode();
    helpers.click(secondHeading);

    expect(mockHandler).to.have.been.called;
  });

  it('remaps table header display if object is passed in', function () {
    var display = {
      'heading1': 'first heading',
      'heading2': 'second heading',
      'heading3': 'third heading'
    };
    var head = render(
      <table>
        <TableHead
          sortKey="foo"
          columns={fixtures.headings}
          columnDisplay={display}
        />
      </table>
    );

    var secondHeadingNode = queryHeadings(head)[1].getDOMNode();
    expect(secondHeadingNode.textContent).to.eql('second heading');
  });

  it('uses the column name as the header display if no mapping is given', function () {
    var display = {
      'heading1': 'first heading',
    };
    var head = render(
      <table>
        <TableHead
          sortKey="foo"
          columns={fixtures.headings}
          columnDisplay={display}
        />
      </table>
    );

    var headings = queryHeadings(head);
    var firstHeadingNode = headings[0].getDOMNode();
    var secondHeadingNode = headings[1].getDOMNode();

    expect(firstHeadingNode.textContent).to.eql('first heading');
    expect(secondHeadingNode.textContent).to.eql(fixtures.headings[1]);
  });
});
