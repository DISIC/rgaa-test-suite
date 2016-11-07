/**
 *
 */
export const createWrapper = (id) => {
	const existing = document.getElementById(id);

	if (existing) {
		return existing;
	}

	const node = document.createElement('div');
	node.id = id;

	document.body.appendChild(node);
	return node;
};

/**
 *
 */
export const findChildrenByRole = (element, role) => {
	const children = element.querySelectorAll(`[role="${role}"]`);

	if (!children.length) {
		throw Error(
			`Unable to find any element with a role '${role}'`
		);
	}

	return children;
};

/**
 *
 */
export const findChildByRole = (element, role) =>
	findChildrenByRole(element, role).item(0);

/**
 * Hardcore reset
 */
export const resetDocument = () =>
	document.documentElement.innerHTML = '';
