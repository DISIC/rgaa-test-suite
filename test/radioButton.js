import RadioButton from './lib/radiobutton';
import {radioButton, createWrapper} from '../src';



/**
 *
 */
describe(
	'WAI-ARIA RadioButton example',
	radioButton(({id, label, items}) => {
		return RadioButton({
			id,
			text: label
		}, items);
	})
);
