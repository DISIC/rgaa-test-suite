import {tooltip} from '../src';



/**
 *
 */
describe(
	'React Bootstrap Tooltip',
	tooltip((options) => {
		$(document).tooltip();

		const node = document.createElement('button');
		node.title = options.text;

		return node;
	}
));
