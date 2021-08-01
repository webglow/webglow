const path = require('path');
const webpack = require('webpack');

const API_URL = {
	development: JSON.stringify('http://localhost:3000'),
	production: JSON.stringify('http://webglow-api.herokuapp.com'),
};

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	entry: {
		index: [
			'react-hot-loader/patch',
			path.resolve(__dirname, 'src', 'js', 'ui', 'index.ts'),
		],
		codemirror: path.resolve(
			__dirname,
			'src',
			'js',
			'ui',
			'code-editor',
			'codemirror.ts'
		),
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
			engine: path.resolve(__dirname, 'src', 'js', 'engine'),
		},
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		filename: '[name].js',
	},
	devServer: {
		hotOnly: true,
		historyApiFallback: true,
		open: true,
		port: 9000,
	},
	plugins: [
		new webpack.DefinePlugin({
			API_URL: API_URL[process.env.NODE_ENV || 'development'],
		}),
	],
};
