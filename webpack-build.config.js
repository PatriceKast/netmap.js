const path = require("path");

const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const context = __dirname;

const PUBLIC_PATH = process.env.PUBLIC_PATH;

module.exports = {
  mode: "production",

  context,

  entry: {
    index: ["@babel/polyfill", path.join(context, "src/NetworkScanner.ts")]
  },

  devtool: "source-map",

  output: {
    path: path.join(context, "dist/"),
    filename: "[name].[chunkhash].js",
    publicPath: PUBLIC_PATH,
    library: "NetworkScanner", //variable name
    libraryExport: "default", //what module of the entry above (NetworkScanner.ts) should be used
    libraryTarget: "var"
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          parallel: true,
          sourceMap: true,
          output: {
            comments: false
          },
          compress: {
            unsafe: false,
            properties: true,
            keep_fargs: false,
            pure_getters: true,
            collapse_vars: true,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            drop_console: false
          }
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      })
    ]
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "PortScanner Demo",
      template: "index.ejs"
    })
  ],

  resolve: {
    modules: [path.resolve(context, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
    alias: {
      //img: path.resolve(context, "img")
    }
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["> 0.25%", "last 2 major versions", "IE 11"]
                    },
                    // for uglifyjs...
                    forceAllTransforms: true
                    /*useBuiltIns: "entry"*/
                  }
                ],
                "@babel/typescript"
              ],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { loose: false }],
                "@babel/plugin-proposal-object-rest-spread"
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
