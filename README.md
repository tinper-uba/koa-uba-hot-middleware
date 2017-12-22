# koa-uba-hot-middleware



## Install

```bash
$ npm install koa-uba-hot-middleware -S
```


## How to use?

### Server:

```js
const Koa = require("koa");
const app = new Koa();
const webpack = require("webpack");
const devMiddleware = require("koa-uba-dev-middleware");
const hotMiddleware = require("koa-uba-hot-middleware");
const webpackConfig = require("./webpack.dev.config");

const compiler = webpack(webpackConfig);
app.use(devMiddleware(compiler, {
  stats: {
    colors: true
  }
}));
app.use(hotMiddleware(compiler));

app.listen(5000, () => {
  console.log("webpack server done.");
});


```

### Client

```js
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  entry: {
    app: ["./entry","webpack-hot-middleware/client?noInfo=false&reload=true"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "postcss-loader"]
      })
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        "babel-loader"
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      xhtml: true,
      inject: "body",
      hash: true,
      filename: 'index.html',
      template: "./view/index.html"
    }),
    new ExtractTextPlugin("[name].[hash:8].css"),
    new webpack.HotModuleReplacementPlugin()
  ]
};


```

## API

[webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware)