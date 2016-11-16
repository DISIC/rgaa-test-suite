import SimpleCheckbox from './lib/simpleCheckbox';
import {simpleCheckbox, createWrapper} from '../src';



/**
 *
 */
describe(
	'WAI-ARIA Simple CheckBox example',
	simpleCheckbox(({checked}) => {
		const node = createWrapper('wai-aria-simple-checkbox');
		node.appendChild(SimpleCheckbox(checked));
		return node;
	})
);

