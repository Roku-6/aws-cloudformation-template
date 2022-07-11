const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: "commonjs"
    },
    target: "node",
    optimization: {
      minimize: false
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },
  };
