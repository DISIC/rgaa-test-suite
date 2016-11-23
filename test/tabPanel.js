import {render, createElement} from 'react';
import ReactBootstrap from 'react-bootstrap';
import RgaaReactBootstrap from 'rgaa_react-bootstrap';
import {tabPanel} from '../src';



/**
 *
 */
describe(
	'React Bootstrap TabbedArea',
	tabPanel((options) => {
		const props = {};
		const panels = options.panels.map((panel, i) => {
			const panelProps = {
				key: i,
				eventKey: i,
				tab: panel.title
			};

			if (panel.selected) {
				props.defaultActiveKey = i;
			}

			return createElement(
				ReactBootstrap.Panel,
				panelProps,
				createElement('div', {
					dangerouslySetInnerHTML: {
						__html: panel.content
					}
				})
			);
		});

		const node = document.createElement('div');

		render(
			createElement(
				RgaaReactBootstrap.TabbedArea,
				props,
				panels
			),
			node
		);

		return node;
	}
));
