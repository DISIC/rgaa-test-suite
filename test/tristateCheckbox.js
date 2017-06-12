import TristateCheckbox from './lib/tristateCheckbox';
import {tristateCheckbox} from '../src';


/**
 *
 */
describe(
	'WAI-ARIA Tristate CheckBox example',
	tristateCheckbox(({title, state, items}) => {
		return TristateCheckbox(title, state, items);
	})
);
