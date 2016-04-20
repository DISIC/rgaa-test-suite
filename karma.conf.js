var path = require('path');
var fullPath = path.resolve.bind(null, __dirname);



/**
 *
 */
module.exports = function(config) {
	config.set({
		files: [
			'test/*.js'
		],
		frameworks: [
			'mocha',
			'chai'
		],
		reporters: [
			'mocha'
		],
		browsers: [
			'Chrome',
			'Firefox'
		],
		preprocessors: {
			'src/*.js': ['webpack'],
			'test/*.js': ['webpack']
		},
		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{
						test: /\.js$/i,
						loader: 'babel-loader',
						include: [
							fullPath('src'),
							fullPath('test')
						]
					}
				]
			}
		},
		webpackMiddleware: {
			noInfo: true
		}
	});
};
