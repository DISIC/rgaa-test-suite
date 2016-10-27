/**
 * create a simple checkbox
 *
 * code taken from https://www.w3.org/TR/wai-aria-practices-1.1/examples/checkbox/checkbox-1.html
 *
 * @param {Boolean} checked state of checkbox
 */
export default function simpleCheckbox(checked) {
  //console.log('checked', checked);
	const container = document.createElement('div');
	container.setAttribute('role', 'checkbox');
	container.setAttribute('tabindex', 0);
	container.setAttribute('aria-checked', checked);
	const img = document.createElement('img');
	img.setAttribute('src', '');
	img.setAttribute('role', 'presentation');
	const label = document.createElement('span');
	label.innerHTML = 'Label';
	container.appendChild(img);
	container.appendChild(label);
	container.addEventListener('keydown', toggleCheckbox);
	container.addEventListener('click', toggleCheckbox);
	container.addEventListener('focus', focusCheckbox);
	container.addEventListener('blur', blurCheckbox);

	return container;
}

/*
* @function toggleCheckBox
*
* @desc Toogles the state of a checkbox and updates image indicating state based on aria-checked values
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function toggleCheckbox(event) {

  var node = event.currentTarget;
  var state = node.getAttribute('aria-checked').toLowerCase();
  if (event.type === 'click' ||
      (event.type === 'keydown' && event.keyCode === 32)
      ) {
          if (state === 'true') {
            node.setAttribute('aria-checked', 'false');
          }
          else {
            node.setAttribute('aria-checked', 'true');
          }

    event.preventDefault();
    event.stopPropagation();
  }

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
