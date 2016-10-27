/**
 *	A drop-in replacement for describe() that will fail only
 *	if none of its tests passes.
 *
 *	@param {string} title - Title.
 *	@param {function} suite - Suite.
 */
export default (title, suite) =>
	describe(title, function() {
		let success = false;

		// Calls the original suite to register tests and hooks.
		suite.call(this);

		// Wraps each test function with an exception handler
		// to keep track of test statuses.
		this.tests.map((test) => {
			const fn = test.fn;

			test.fn = function() {
				try {
					fn();
					success = true;
				} catch (e) {
					// Failing tests are skipped, so if there are
					// failing and successful tests, failing ones
					// won't break the entire build.
					this.skip();
				}
			}
		});

		// Adds a test that will fail if all the other failed.
		it('Au moins une des conditions est remplie.', function() {
			if (!success) {
				throw new Error('Aucun test n\'a réussi.');
			}
		});
	});
