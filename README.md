# babel-webpack


babel-preset-env accepts as targets the browserlist format
https://github.com/ai/browserslist
eg.
```json
 "targets": {
    "browsers": ["last 4 versions", "ie >= 9"]
  }
```

useBuiltIns: 'usage'
Adds specific imports for polyfills when they are used in each file. We take advantage of the fact that a bundler will load the same polyfill only once.
