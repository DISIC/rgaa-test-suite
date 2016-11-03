export default (test, reason) => {
	if (reason) {
		test._runnable.title += `\n\t    ${reason}`;
	}
	return test.skip();
};
