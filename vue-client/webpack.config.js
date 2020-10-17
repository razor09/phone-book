const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve('src/root/root.module.ts'),
  output: {
    path: path.resolve('dist/build'),
    publicPath: path.join('/', 'build', '/'),
    filename: 'bundle.min.js',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.ts', '.scss', '.html'],
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
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
            name: 'fonts/[hash].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|svg|jpe?g|png|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 10000,
          },
        },
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 4200,
    contentBase: path.resolve('dist'),
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.min.css',
    }),
  ],
};
