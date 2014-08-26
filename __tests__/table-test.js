jest.dontMock('../src/table');

describe('Table', function () {
  var Table = require('../src/table');
  var TableHeader = require('../src/table-header');
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

  describe('sorting', function () {
    var sortData = [
      {id: 10, name: "z"},
      {id: 80, name: "d"},
      {id: 50, name: "a"},
      {id: 20, name: "b"}
    ];

    describe('#sortRowData', function () {
      it('sorts rows in ascending order by default, using the 1st key of a row as comparator', function () {
        var table = render({data: sortData});

        expect(table.sortRowData(sortData[0], sortData[1])).toBeFalsy();
      });

      it('sorts rows in descending order, if state.sortKey is descending, using the 1st key of a row as comparator', function () {
        var table = render({data: sortData});
        table.setState({sortDirection: 'descending'});

        expect(table.sortRowData(sortData[0], sortData[1])).toBeTruthy();
      });

      it('sorts with a key provided by state.sortKey', function () {
        var data =  [
          {
            'id': 200,
            'age': 1
          },
          {
            'id': 2,
            'age': 100
          }
        ];
        var table = render({data: data});
        table.setState({activeSortKey: 'age'});

        expect(table.sortRowData(data[0], data[1])).toBeFalsy();
      });
    });

    describe('#handleHeadingClick', function () {
      var table;

      beforeEach(function () {
        table  = render({data: sortData});
      });

      afterEach(function () {
        table = null;
      });

      it('changes sort order if called by active key', function () {
        var sortKey = 'name';
        table.setState({activeSortKey: sortKey});

        expect(table.state.sortDirection).toEqual('ascending');

        table.handleHeadingClick({
          sortKey: sortKey
        });

        expect(table.state.sortDirection).toEqual('descending');
      });

      it('does not change sort order if called with non active header', function () {
        var key = 'foo';

        expect(table.state.sortDirection).toEqual('ascending');

        table.handleHeadingClick({
          sortKey: key
        });

        expect(table.state.sortDirection).toEqual('ascending');
      });

      it('changes active sort key if called with non active key', function () {
        var key = 'newKey';

        expect(table.state.sortDirection).toEqual('ascending');

        table.handleHeadingClick({
          sortKey: key
        });

        expect(table.state.activeSortKey).toEqual(key);
      });

      it('toggles in between ascending and descending for same key', function () {
        var key = 'foo';

        table.setState({
          activeSortKey: key
        });

        expect(table.state.sortDirection).toEqual('ascending');

        table.handleHeadingClick({
          sortKey: key
        });

        expect(table.state.sortDirection).toEqual('descending');

        table.handleHeadingClick({
          sortKey: key
        });

        expect(table.state.sortDirection).toEqual('ascending');
      });
    });
  });

  describe('#renderRows', function () {
    it('returns an array containg tr components', function () {
      var table = render({data: fixtures.data});
      expect(table.renderRows().length).toEqual(fixtures.data.length);
    });
  });
});
