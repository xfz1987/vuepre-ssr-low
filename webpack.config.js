var path = require("path");
var webpack = require("webpack");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: "src/assets"
    //   }
    // ]),
    new PrerenderSPAPlugin(
      //将渲染的文件放到dist目录下
      path.join(__dirname, "/dist"),
      //需要预渲染的路由信息
      ["/", "/counter"],
      {
        //在一定时间后再捕获页面信息，使得页面数据信息加载完成
        renderAfterTime: 100000,
        //忽略打包错误
        ignoreJSErrors: true,
        phantomOptions: "--web-security=false",
        maxAttempts: 10
      }
    )
  ],
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
