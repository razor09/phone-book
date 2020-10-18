const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/root/root.main.tsx`,
  output: {
    path: `${__dirname}/dist`,
    publicPath: '',
    filename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|svg|jpe?g|png|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[hash].[ext]',
            limit: 10000,
          },
        },
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 4400,
    contentBase: 'dist',
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
};
