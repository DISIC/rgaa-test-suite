import {toLower} from 'lodash';



/**
 *	Removes every child of body that is not a <script />.
 */
export default () => {
	if (!document.body.hasChildNodes()) {
		return;
	}

	const nodes = document.body.childNodes;
	const notScripts = [];

	for (let i = 0; i < nodes.length; i++) {
		if (toLower(nodes[i].tagName) !== 'script') {
			notScripts.push(nodes[i]);
		}
	}

	notScripts.forEach((node) =>
		document.body.removeChild(node)
	);
};
