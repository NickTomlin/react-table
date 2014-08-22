jest.dontMock('../src/table-header');
require('./spec-helper');

describe('Table Header', function () {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var helper = require('./spec-helper');
  var TableHeader = require('../src/table-header');
  var render = helper.render.bind(null, TableHeader);

  it('renders a table header', function () {
    var tableHeader = render();
    expect(tableHeader.getDOMNode().tagName).toEqual('TH');
  });

  it('calls clickHandler prop an event when it is clicked', function () {
    var mock = jest.genMockFunction();
    var tableHeader = render({clickHandler: mock});

    helper.click(tableHeader.getDOMNode());

    expect(mock).toBeCalled();
  });

  it('it uses its name prop as a key');
  it('defaults to adding an ascending class');
  it('toggles its sortOrder class');
  it('renders supplied children');
});
