const path = require("path");

const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const context = __dirname;

module.exports = {
  mode: "development",

  context,

  entry: ["@babel/polyfill", path.join(context, "src/index.js")],

  output: {
    path: path.join(context, "dist/"),
    filename: "bundle.js",
    publicPath: "/"
  },

  devtool: "none",
  devServer: {
    contentBase: ".",
    hot: true,
    historyApiFallback: true
  },

  optimization: {
    minimize: false,
    splitChunks: { chunks: "all" }
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "PortScanner Demo",
      template: "index.ejs"
    })
  ],

  resolve: {
    modules: [path.resolve(context, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".css", ".scss"],
    alias: {
      //img: path.resolve(context, "img")
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(context, "src")],

        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: {
                      browsers: ["> 1%", "last 2 major versions"]
                    }
                  }
                ]
              ],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|woff2?|eot|ttf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  }
};
