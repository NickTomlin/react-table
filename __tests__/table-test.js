jest.dontMock('../src/table');

describe('Table', function () {
  var Table = require('../src/table');
  var helper = require('./spec-helper');
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  // curry render for less typing.
  var render = helper.render.bind(null, Table);

  it('renders a table', function () {
    var table = render();
    expect(table.getDOMNode().tagName).toEqual('TABLE');
  });

  it('sets data prop to an an empty array if none is specified', function () {
    var table = render();
    expect(table.props.data).toEqual([]);
  });

  it('uses an optional array to filter which properties show up in rows', function () {
    var table, filteredData;
    var data = [
      {_private: 'no', include: 'yes', alsoInclude: 'yay'}
    ];
    var row = data[0];
    var columns = ['include', 'alsoInclude'];

    table = render({includedColumns: columns});
    filteredData = table.filterObject(row);

    expect(filteredData).toMatch(_.omit(data, '_private'));
  });

  describe('#renderHead', function () {
    it('defaults to creating headers based on key names of data', function () {
      var table = render({data: fixtures.data});
      var headers = table.generateHeadersFromRow(fixtures.data[0]);

      expect(headers).toMatch(Object.keys(fixtures.data[0]));
    });
  });

  describe('#renderRows', function () {
    it('returns an array containg tr components', function () {
      var table = render({data: fixtures.data});
      expect(table.renderRows().length).toEqual(fixtures.data.length);
    });
  });
});
