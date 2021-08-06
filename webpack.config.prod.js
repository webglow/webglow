const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		index: path.resolve(__dirname, 'src', 'js', 'ui', 'index.ts'),
		codemirror: path.resolve(
			__dirname,
			'src',
			'js',
			'ui',
			'code-editor',
			'codemirror.ts'
		),
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
			engine: path.resolve(__dirname, 'src', 'js', 'engine'),
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			API_URL: JSON.stringify('http://api.webglow.xyz'),
			IS_DEV: false,
		}),
	],
};
