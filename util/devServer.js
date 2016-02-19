var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require("webpack-hot-middleware");

var webpackConfigMaker = require('../webpack.config');
var webpackConfig = webpackConfigMaker();
var bundler = webpack(webpackConfig);

browserSync.init({
	server: {
		baseDir: 'app',
	},
	port: '8080',
	middleware: [
		webpackDevMiddleware(bundler, {
			publicPath: webpackConfig.output.publicPath,
			stats: { color: true },
			noInfo: true
		}),
		webpackHotMiddleware(bundler)
	],
	files: [
		'app/index.html'
	]
});