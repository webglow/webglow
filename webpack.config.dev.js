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
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.glsl', '.js', '.ts', '.tsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	entry: {
		index: [
			'react-hot-loader/patch',
			path.resolve(__dirname, 'src', 'js', 'index.ts'),
		],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		filename: '[name].js',
	},
	devServer: {
		hotOnly: true,
		open: true,
		port: 9000,
	},
};
