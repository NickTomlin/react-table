React Table
---

[![Build Status](http://img.shields.io/travis/NickTomlin/react-table.svg?style=flat&branch=master)](https://travis-ci.org/NickTomlin/react-table)
![NPM package](https://img.shields.io/npm/v/@nicktomlin/react-table.svg)

A simple sortable table component for react.

# Usage

`npm i @nicktomlin/react-table` (not an npm user? see instructions below)

```javasript
var React = require('react');
var ReactTable = require('react-table');
var data = [
  {favoriteColor:'blue',  age: 30, name: "Athos",      job: "Musketeer"},
  {favoriteColor: 'red' ,  age: 33, name: "Porthos",    job: "Musketeer"},
  {favoriteColor: 'blue' ,  age: 27, name: "Aramis",     job: "Musketeer"},
  {favoriteColor: 'orange' ,  age: 25, name: "d'Artagnan", job: "Guard"}
];

React.render(<ReactTable data={data} />, document.body);
```

See examples for a more full featured use case.

## Usage without NPM

Include the built files in `dist` with a `<script>` tag or the module loader of your choice. React-table expects that `React` is on the window and will not work without it.

# Development

```bash
# watch js files and start example server
npm start

# run jest tests
npm test

# build for production
npm run build
```
