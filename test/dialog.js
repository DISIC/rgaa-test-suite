import {render, createElement} from 'react';
import RgaaReactBootstrap from 'rgaa_react-bootstrap';
import {dialog as dialogTest, createWrapper} from '../src';



/**
 *
 */
describe(
	'jQuery Dialog test',
	dialogTest(({title, content}) => {
		const $dialog = $(`
			<div id="dialog" title="${title}">
				${content}
			</div>
		`);

		$dialog.dialog({
			dialogClass: "id-dialog",
			autoOpen: false
		});

		return {
			open() {
				$dialog.dialog('open');
			},
			close() {
				$dialog.dialog('close');
			}
		};
	}
));
