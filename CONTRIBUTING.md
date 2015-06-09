Please include tests with your changes to help make reviewing and merging easy.

#### How to test out local changes in another repo with `react-table` as a dependency

Here's one approach to test out local changes, e.g. for a new branch called `#4-configurable-sort-column`

1. fork this repo on GitHub
2. clone your fork to your local machine
3. from your fork: `git checkout origin/#4-configurable-sort-column`
4. from this detached HEAD, checkout into a new local branch: `git checkout -b \#4-configurable-sort-column`
5. run [`npm link`](https://docs.npmjs.com/cli/link)
6. inside your project that uses `react-table` run `npm link react-table` to use your local copy

Or you can also point your package.json to a git url e.g.

```json
dependencies: {
  "react-table": "nicktomlin/react-table#4-configurable-sort-column"
}
```

Although this won't allow you to run against local changes.
