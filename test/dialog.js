import {dialog as dialogTest, createWrapper} from '../src';



/**
 *
 */
describe(
	'JQuery Dialog test',
	dialogTest(({id, title, content}) => {
		const node = createWrapper(`jquery-dialog-${id}`);

		const $dialog = $(`
			<div id="dialog" title="${title}">
				<p>${content}</p>
			</div>
		`);
		$dialog.appendTo(node);


		$('#dialog').dialog({
			dialogClass: "id-dialog",
			autoOpen: false
		});

		function open() {
			$('#dialog').dialog('open');
		}
		function close() {
			$('#dialog').dialog('close');
		}

		return {
			node,
			open,
			close
		};
	}
));
