import SimpleCheckbox from './lib/simpleCheckbox';
import {simpleCheckbox} from '../src';



/**
 *
 */
describe(
	'WAI-ARIA Simple CheckBox example',
	simpleCheckbox(({checked}) => {
		return SimpleCheckbox(checked);
	})
);

