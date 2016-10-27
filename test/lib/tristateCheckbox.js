/**
 * create a tristate checkbox
 *
 * code taken from https://www.w3.org/TR/wai-aria-practices-1.1/examples/checkbox/checkbox-1.html
 *
 * @param {string} state state of checkbox
 */
export default function tristateCheckbox(title, state, items) {
	const container = document.createElement('fieldset');
	const legend = document.createElement('legend');
	legend.innerHTML = title;

	const mainCheckbox = document.createElement('div');
	mainCheckbox.setAttribute('role', 'checkbox');
	mainCheckbox.setAttribute('tabindex', 0);
	mainCheckbox.setAttribute('aria-checked', state);
	mainCheckbox.setAttribute('class', 'group_checkbox');
	const img = document.createElement('img');
	img.setAttribute('src', '');
	img.setAttribute('role', 'presentation');
	const label = document.createElement('span');
	label.innerHTML = 'Label';
	mainCheckbox.appendChild(img);
	mainCheckbox.appendChild(label);
	mainCheckbox.addEventListener('keydown', toggleGroupCheckbox);
	mainCheckbox.addEventListener('click', toggleGroupCheckbox);
	mainCheckbox.addEventListener('focus', focusCheckbox);
	mainCheckbox.addEventListener('blur', blurCheckbox);

	container.appendChild(legend);
	container.appendChild(mainCheckbox);

	items.forEach((item) => {
		const checkboxLabel = document.createElement('label');
		const checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.addEventListener('change', updateGroupCheckbox);
		checkbox.addEventListener('focus', focusStandardCheckbox);
		checkbox.addEventListener('blur', blurStandardCheckbox);
		const labelTitle = document.createElement('span');
		labelTitle.innerHTML = item.label;

		checkboxLabel.appendChild(checkbox);
		checkboxLabel.appendChild(labelTitle);
		container.appendChild(checkboxLabel);
	});

	return container;
}




/*
* @function toggleGroupCheckBox
*
* @desc Toogles the state of a grouping checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function toggleGroupCheckbox(event) {
  var node = event.currentTarget

  var image = node.getElementsByTagName('img')[0]

  var state = node.getAttribute('aria-checked').toLowerCase()

  if (event.type === 'click' ||
      (event.type === 'keydown' && event.keyCode === 32)) {

          if (state === 'false' || state === 'mixed') {
            node.setAttribute('aria-checked', 'true')
            setCheckboxes(node, true)
          }
          else {
            node.setAttribute('aria-checked', 'false')
            setCheckboxes(node, false)
          }

    event.preventDefault()
    event.stopPropagation()

   }

}

/*
* @function setCheckboxes
*
* @desc
*
* @param   {Object}      node  -  DOM node of updated checkbox
* @param   {Booleam}  state  -  Set value of checkboxes
*
*/

function setCheckboxes(node, state) {

  var checkboxes = node.parentNode.querySelectorAll('input[type=checkbox]')

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = state;
  }
}

/*
* @function updateGroupCheckbox
*
* @desc
*
* @param   {Object}   node  -  DOM node of updated group checkbox
*/
function updateGroupCheckbox(event) {

  var node = event.currentTarget;

  var checkboxes = node.parentNode.parentNode.querySelectorAll('input[type=checkbox]');

  var state = 'false';
  var count = 0;

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) count += 1;
  }

  if (count > 0) state = 'mixed';
  if (count === checkboxes.length) state = 'true';

  var group_checkbox = node.parentNode.parentNode.getElementsByClassName('group_checkbox')[0];

  group_checkbox.setAttribute('aria-checked', state);
}
/*
* @function focusCheckBox
*
* @desc Adds focus to the class name of the checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*/

function focusCheckbox(event) {
  event.currentTarget.className += ' focus';
}

/*
* @function blurCheckBox
*
* @desc Adds focus to the class name of the checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*/

function blurCheckbox(event) {
  event.currentTarget.className = event.currentTarget.className.replace(' focus','');
}

/*
* @function focusStandardCheckBox
*
* @desc Adds focus styling to label element encapsulating standard checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*/

function focusStandardCheckbox(event) {
  event.currentTarget.parentNode.className += ' focus';
}

/*
* @function blurStandardCheckBox
*
* @desc Adds focus styling to the label element encapsulating standard checkbox
*
* @param   {Object}  event  -  Standard W3C event object
*/

function blurStandardCheckbox(event) {
  event.currentTarget.parentNode.className = event.currentTarget.parentNode.className .replace(' focus','');
}
