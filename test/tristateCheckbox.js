import TristateCheckbox from './lib/tristateCheckbox';
import {tristateCheckbox, createWrapper} from '../src';


/**
 *
 */
describe(
	'WAI-ARIA Tristate CheckBox example',
	tristateCheckbox(({title, state, items, id}) => {
		const node = createWrapper(`wai-aria-tristate-checkbox-${id}`);
		node.appendChild(TristateCheckbox(title, state, items));
		return node;
	})
);
