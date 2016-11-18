/**
 *
 */
module.exports = function(config) {
	config.set({
		files: [
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
		]
	});
};
