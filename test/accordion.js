import {render, createElement} from 'react';
import ReactBootstrap from 'react-bootstrap';
import RgaaReactBootstrap from 'rgaa_react-bootstrap';
import {accordion} from '../src';



/**
 *
 */
describe(
	'React Bootstrap Accordion',
	accordion(({panels}) => {
		const props = {};
		const nestedPanels = panels.map((panel, i) => {
			const panelProps = {
				key: i,
				eventKey: i,
				header: panel.title
			};

			if (panel.selected) {
				props.defaultActiveKey = i;
			}

			return createElement(
				ReactBootstrap.Panel,
				panelProps,
				panel.content
			);
		});

		const node = document.createElement('div');

		render(
			createElement(
				RgaaReactBootstrap.Accordion,
				props,
				nestedPanels
			),
			node
		);

		return node;
	}
));
