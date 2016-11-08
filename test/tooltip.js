import {render, createElement} from 'react';
import ReactBootstrap from 'react-bootstrap';
import RgaaReactBootstrap from 'rgaa_react-bootstrap';
import {tooltip, createWrapper} from '../src';



/**
 *
 */
describe.only(
	'React Bootstrap Tooltip',
	tooltip((options) => {
		const node = document.createElement('div');

		render(
			createElement(
				RgaaReactBootstrap.TooltipOverlayTrigger,
				{
					overlay: createElement(
						ReactBootstrap.Tooltip,
						{},
						options.text
					)
				},
				createElement(
					ReactBootstrap.Button,
					{},
					'Text'
				)
			),
			node
		);

		return node;
	}
));
