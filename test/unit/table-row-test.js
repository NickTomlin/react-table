jest.dontMock('../../src/table-row');
require('./spec-helper');

describe('Table Row', function () {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var helper = require('./spec-helper');
  var TableRow = require('../../src/table-row');
  var render = TestUtils.renderIntoDocument;

  function objectLength (obj) {
    return Object.keys(obj).length;
  }

  var data = {
    name: 'bob',
    occupation: 'steward',
    favoriteColor: 'blue'
  };

  it('creates a <td> for each element of supplied data object', function () {
    var tr = render(<TableRow data={data} />);
    var expectedTds = objectLength(data);

    var tds = TestUtils.scryRenderedDOMComponentsWithTag(tr, 'td');
    expect(tds.length).toEqual(expectedTds);
  });
});
