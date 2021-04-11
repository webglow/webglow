const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.glsl$/,
				use: {
					loader: 'webpack-glsl-minify',
					options: {
						output: 'source',
						esModule: true,
						preserveAll: true,
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.glsl', '.js'],
	},
	entry: {
		index: path.resolve(__dirname, 'src', 'js', 'index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		filename: '[name].js',
	},
	devServer: {
		hot: true,
		open: true,
		port: 9000,
	},
};
