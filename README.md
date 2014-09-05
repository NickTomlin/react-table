React Table
---

A simple sortable table component for react.

# Usage

`npm install nicktomlin/react-table` (non cjs users can point a `<script`> tag to the built files in `dist`)

```javasript
var React = require('react');
var ReactTable = require('react-table');

React.renderComponent(ReactTable({
  data: [
    {favoriteColor:'blue',  age: 30, name: "Athos",      job: "Musketeer"},
    {favoriteColor: 'red' ,  age: 33, name: "Porthos",    job: "Musketeer"},
    {favoriteColor: 'blue' ,  age: 27, name: "Aramis",     job: "Musketeer"},
    {favoriteColor: 'orange' ,  age: 25, name: "d'Artagnan", job: "Guard"}
  ]
}), document.body);
```

See examples for a more full featured use case.

# Development

```bash
# watch js files and start example server
npm start

# run jest tests
npm test

# build for production
npm run build
```
