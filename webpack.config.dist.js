const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  mode: 'production', // enabled useful tools for development
  entry: './src/virtualized-checkbox/index.js', // string | object | array  // defaults to ./src
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'dist'), // string
    filename: 'bundle.js', // string    // the filename template for entry chunks
    // publicPath: '/assets/', // string    // the url to the output directory resolved relative to the HTML page
    library: 'MyLibrary', // string,
    libraryTarget: 'umd' // universal module definition    // the type of the exported library
  },
  performance: {
    hints: false
  },
  devtool: '',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false,
            ascii_only: true
          },
          sourceMap: false
        }
      })
    ]
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: path.resolve('src'),
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.BannerPlugin('版权所有，翻版必究'),
    // new webpack.HotModuleReplacementPlugin() //热加载插件
  ]
}
