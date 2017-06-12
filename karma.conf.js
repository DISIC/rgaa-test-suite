var path = require('path');
var fullPath = path.resolve.bind(null, __dirname);



/**
 *
 */
module.exports = function(config) {
	config.set({
		files: [
			{pattern: require.resolve('jquery/dist/jquery'), watched: false},
			{pattern: require.resolve('jquery-nstslider/dist/jquery.nstSlider'), watched: false},
			{pattern: require.resolve('jquery-ui-dist/jquery-ui'), watched: false},
			{pattern: require.resolve('rgaa_jquery-ui/dist/rgaa_jquery-ui'), watched: false},
			'test/*.js'
		],
		frameworks: [
			'mocha'
		],
		reporters: [
			'mocha'
		],
		mochaReporter: {
			colors: {
				info: 'yellow'
			}
		},
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
