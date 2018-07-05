const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');


let plugins = [];

if(process.env.NODE_ENV == 'production') {
plugins.push(new babiliPlugin());
}

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, ''),
		publicPath: ""
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: plugins
}
