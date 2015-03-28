jest.dontMock('../../src/table');

describe('Table', function () {
  var Table = require('../../src/table');
  var TableHeader = require('../../src/table-header');
  var TableHead = require('../../src/table-head');
  var helper = require('./spec-helper');
  var React = require('react/addons');
  var _ = require('lodash');
  var TestUtils = React.addons.TestUtils;
  var render = TestUtils.renderIntoDocument;

  function selecTrs (table) {
    return TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr');
  }

  function trsContain(table, array) {
    var trs = selecTrs(table);
    _.zip(trs, array)
      .forEach(function (pair) {
        var actual = parseInt(pair[0].getDOMNode().textContent);
        var expected = pair[1];
        expect(actual).toEqual(expected);
      });
  }

  it('renders a table', function () {
    var table = render(<Table />);
    expect(table.getDOMNode().tagName).toEqual('TABLE');
  });

  it('sets data prop to an an empty array if none is specified', function () {
    var table = render(<Table />);
    expect(table.props.data).toEqual([]);
  });

  it('uses an optional array to filter which properties show up in rows', function () {
    var table, filteredData;
    var data = [
      {_private: 'no', include: 'yes', alsoInclude: 'yay'}
    ];
    var row = data[0];
    var columns = ['include', 'alsoInclude'];

    table = render(<Table includedColumns={columns}/>);
    filteredData = table.filterObject(row);

    expect(filteredData).toMatch(_.omit(data, '_private'));
  });

  describe('#renderHeader', function () {
    it('defaults to creating headers based on key names of data', function () {
      var table = render(<Table data={fixtures.data}/>);
      var headers = table.generateHeadersFromRow(fixtures.data[0]);

      expect(headers).toMatch(Object.keys(fixtures.data[0]));
    });
  });

  describe('sorting', function () {
    var sortData = [
      {id: 10, name: "z"},
      {id: 14000, name: "d"},
      {id: 104, name: "a"},
      {id: 90, name: "b"}
    ];

    it('properly sorts numerical items', function () {
      var key = 'id';
      var numericalData = [15, 47, 7, 7, 12, 15, 7, 15, 15, 27, 47].map(function (x) { return {id: x}; });
      var sorted = [7, 7, 7, 12, 15, 15, 15, 15, 27, 47, 47];

      var table = render(<Table data={numericalData} />);
      trsContain(table, sorted);
    });


    it('properly sorts alphabetical items', function () {
      var key = 'id';
      var data = ["SUFFOLK", "NASSAU", "SUFFOLK", "WESTCHESTER", "WESTCHESTER", "ONONDAGA", "WESTCHESTER", "WESTCHESTER", "SUFFOLK", "ONONDAGA", "ONONDAGA", "ONONDAGA", "WESTCHESTER", "WESTCHESTER", "SUFFOLK", "ONONDAGA", "ONONDAGA", "ONONDAGA", "ONONDAGA", "SUFFOLK", "SUFFOLK", "SUFFOLK", "SUFFOLK", "SUFFOLK", "WESTCHESTER"].map(function (x){ return {name: x}; });

      var sorted = ["NASSAU", "ONONDAGA", "ONONDAGA", "ONONDAGA", "ONONDAGA", "ONONDAGA", "ONONDAGA", "ONONDAGA", "ONONDAGA", "SUFFOLK", "SUFFOLK", "SUFFOLK", "SUFFOLK", "SUFFOLK", "SUFFOLK", "SUFFOLK", "SUFFOLK", "SUFFOLK", "WESTCHESTER", "WESTCHESTER", "WESTCHESTER", "WESTCHESTER", "WESTCHESTER", "WESTCHESTER", "WESTCHESTER"];

      var table = render(<Table />);
      var actual = table.sortRows(data).map(function (x) { return x.name; });

      expect(actual.every(function (x, index) {
        return x === sorted[index];
      })).toBeTruthy();
    });

    it('sorts rows in ascending order by default, using the 1st key of a row as comparator', function () {
      var table = render(<Table data={sortData} />);
      var trs = selecTrs(table);

      var smallestId = sortData[0].id + sortData[0].name;
      var largestId = sortData[1].id + sortData[1].name;

      expect(trs[0].getDOMNode().textContent).toContain(smallestId);
      expect(trs[trs.length - 1].getDOMNode().textContent).toEqual(largestId);
    });

    // TODO
    // the way we are checking this is ganky
    // is there a way we can isolate the sorting from the components
    // so we don't have to interact with the rendered component?

    it('sorts rows in descending order, if state.sortKey is descending, using the 1st key of a row as comparator', function () {
      var table = render(<Table data={sortData} />);

      table.setState({sortDirection: 'descending'});

      var sorted = sortData
      .sort(function (x,y) {return y.id - x.id; })
      .map(function (x) { return x.id; });

      trsContain(table, sorted);
    });

    it('sorts with a key provided by state.sortKey', function () {
      var data =  [
        {
        'id': 100,
        'age': 1
      },
      {
        'id': 3,
        'age': 300
      }
      ];
      var table = render(<Table data={data} />);
      table.setState({activeSortKey: 'age'});

      trsContain(table, [1001, 3300]);
    });

    describe('#handleHeadingClick', function () {
      var table;

      beforeEach(function () {
        table = render(<Table data={sortData} />);
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

  describe('#renderHead', function () {
    it('passes columnDisplay to head', function () {
      // can't wait for computed properties!
      var columnDisplay = {};
      columnDisplay[fixtures.headings[0]] = fixtures.headings[0].toUpperCase();
      columnDisplay[fixtures.headings[1]] = fixtures.headings[1].toUpperCase();

      var table = render(
        <Table
          data={fixtures.data}
          columnDisplay={columnDisplay}
        />
      );

      var header = TestUtils.findRenderedComponentWithType(table, TableHead);
      var mappedHeaders = Object.keys(header.props.columnDisplay);

      expect(mappedHeaders.length).toEqual(2);
    });
  });

  describe('#renderRows', function () {
    it('returns an array containg tr components', function () {
      var table = render(<Table data={fixtures.data} />);
      expect(table.renderRows().length).toEqual(fixtures.data.length);
    });
  });
});
