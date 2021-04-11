const path = require('path');

module.exports = {
	mode: 'production',
	devtool: 'eval-source-map',
	entry: {
		index: path.resolve(__dirname, 'src', 'js', 'index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js',
	},
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
};
