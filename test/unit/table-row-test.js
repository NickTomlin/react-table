describe('Table Row', function () {
  var helpers = require('./support/helpers');
  var TableRow = require('../../src/table-row');

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
    expect(tds.length).to.eql(expectedTds);
  });
});
