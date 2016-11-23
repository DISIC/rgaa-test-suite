/**
 *
 */
const sandboxId = 'rgaaTestSuite-Sandbox';

/**
 *	Creates an element that will be used to contain some other
 *	elements during a test. If a sandbox element already exists,
 * it will be replaced.
 */
export default function setupSandbox(...children) {
	let sandbox = document.getElementById(sandboxId);

	if (sandbox) {
		document.body.removeChild(sandbox);
	}

	sandbox = document.createElement('div');
	sandbox.id = sandboxId;

	children.forEach((child) =>
		sandbox.appendChild(child)
	);

	document.body.appendChild(sandbox);

	return sandbox;
};
