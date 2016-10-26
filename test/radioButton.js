import RadioButton from './lib/radiobutton';
import {radioButton, createWrapper} from '../src';



/**
 *
 */
describe(
	'WAI-ARIA RadioButton example',
	radioButton(({id, label, items}) => {
		const node = createWrapper(`wai-aria-radiobutton-${id}`);
		node.appendChild(RadioButton({id, text: label}, items));
		return node;
	})
);
