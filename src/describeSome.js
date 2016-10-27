import {keys} from 'lodash';



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

		suite.call(this);

		this.tests.map((test) => {
			const fn = test.fn;

			test.fn = function() {
				try {
					fn();
					success = true;
				} catch (e) {
					this.skip();
				}
			}
		});

		it('Au moins une des conditions est remplie.', function() {
			if (!success) {
				throw new Error('Aucun test n\'a réussi.');
			}
		});
	});
