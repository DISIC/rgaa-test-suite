import {render, createElement} from 'react';
import RgaaReactBootstrap from 'rgaa_react-bootstrap';
import {progressBar, createWrapper} from '../src';



/**
 *
 */
describe(
	'React Bootstrap ProgressBar',
	progressBar(({min, max, value}) => {
		const props = {
			min,
			max,
			now: value,
			label: '%(percent)s%'
		};

		const node = createWrapper(
			'rgaa-react-bootstrap-progress-bar'
		);

		render(
			createElement(RgaaReactBootstrap.ProgressBar, props),
			node
		);

		return node;
	}
));
