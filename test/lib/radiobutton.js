/**
 * create a radiobutton
 *
 * code taken from https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio.html
 *
 * @param {Object} label object: {id, text}
 * @param {Array} items list of items transformed in radio buttons: [{text, checked}]
 */
export default function radioButton(label, items) {
	const container = document.createElement('div');
	container.setAttribute('role', 'radiogroup');
	container.setAttribute('aria-labelledby', label.id);
	const title = document.createElement('h1');
	title.id = label.id;
	title.innerHTML = label.text;
	container.appendChild(title);
	const nothingIsChecked = !(items.some(item => item.checked));
	items.forEach((item, index) => {
		const button = document.createElement('div');
		button.setAttribute('role', 'radio');
		button.setAttribute('aria-checked', item.checked ? 'true' : 'false');
		button.tabIndex = -1;
		if (item.checked) {
			button.tabIndex = 0;
		}
		if (nothingIsChecked && index === 0) {
			button.tabIndex = 0;
		}
		button.innerHTML = item.text;
		button.addEventListener('click', clickRadioGroup);
		button.addEventListener('keydown', keyDownRadioGroup);
		button.addEventListener('focus', focusRadioButton);
		button.addEventListener('blur', blurRadioButton);
		container.appendChild(button);
	});
	return container;
}

var KEYCODE = {
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	SPACE: 32,
	UP: 38
}

/*
* @function firstRadioButton
*
* @desc Returns the first radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function firstRadioButton(node) {

	var first = node.parentNode.firstChild;

	while(first) {
		if (first.nodeType === Node.ELEMENT_NODE) {
			if (first.getAttribute("role") === 'radio') return first;
		}
		first = first.nextSibling;
	}

	return null;
}

/*
* @function lastRadioButton
*
* @desc Returns the last radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function lastRadioButton(node) {

	var last = node.parentNode.lastChild;

	while(last) {
		if (last.nodeType === Node.ELEMENT_NODE) {
			if (last.getAttribute("role") === 'radio') return last;
		}
		last = last.previousSibling;
	}

	return last;
}

/*
* @function nextRadioButton
*
* @desc Returns the next radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function nextRadioButton(node) {

	var next = node.nextSibling;

	while(next) {
		if (next.nodeType === Node.ELEMENT_NODE) {
			if (next.getAttribute("role") === 'radio') return next;
		}
		next = next.nextSibling;
	}

	return null;
}

/*
* @function previousRadioButton
*
* @desc Returns the previous radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function previousRadioButton(node) {

	var prev = node.previousSibling;

	while(prev) {
		if (prev.nodeType === Node.ELEMENT_NODE) {
			if (prev.getAttribute("role") === 'radio') return prev;
		}
		prev = prev.previousSibling;
	}

	return null;
}

/*
* @function getImage
*
* @desc Gets the image for radio box
*
* @param   {Object}  event  =  Standard W3C event object
*/

function getImage(node) {

	var child = node.firstChild;

	while(child) {
		if (child.nodeType === Node.ELEMENT_NODE) {
			if (child.tagName === 'IMG') return child;
		}
		child = child.nextSibling;
	}

	return null;
}

/*
* @function setRadioButton
*
* @desc Toogles the state of a radio button
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function setRadioButton(node, state) {
	var image = getImage(node);

	if (state == 'true') {
		node.setAttribute('aria-checked', 'true')
		node.tabIndex = 0;
		node.focus()
	}
	else {
		node.setAttribute('aria-checked', 'false') 
		node.tabIndex = -1;
	}
}

/*
* @function clickRadioGroup
*
* @desc
*
* @param   {Object}  node  -  DOM node of updated group radio buttons
*/

function clickRadioGroup(event) {
	var type = event.type;

	if (type === 'click') {
		// If either enter or space is pressed, execute the funtion

		var node = event.currentTarget;

		var radioButton = firstRadioButton(node);

		while (radioButton) {
			setRadioButton(radioButton, "false");
			radioButton = nextRadioButton(radioButton);
		}

		setRadioButton(node, "true");

		event.preventDefault();
		event.stopPropagation();
	}
}

/*
* @function keyDownRadioGroup
*
* @desc
*
* @param   {Object}   node  -  DOM node of updated group radio buttons
*/

function keyDownRadioGroup(event) {
	var type = event.type;
	var next = false;

	if(type === "keydown"){
		var node = event.currentTarget;

		switch (event.keyCode) {
			case KEYCODE.DOWN:
			case KEYCODE.RIGHT:
				var next = nextRadioButton(node);
				if (!next) next = firstRadioButton(node); //if node is the last node, node cycles to first.
				break;

			case KEYCODE.UP:
			case KEYCODE.LEFT:
				next = previousRadioButton(node);
				if (!next) next = lastRadioButton(node); //if node is the last node, node cycles to first.
				break;

			case KEYCODE.SPACE:
				next = node;
				break;
		}

		if (next) {
			var radioButton = firstRadioButton(node);

			while (radioButton) {
				setRadioButton(radioButton, "false");
				radioButton = nextRadioButton(radioButton);
			}

			setRadioButton(next, "true");

			event.preventDefault();
			event.stopPropagation();
		}
	}
}

/*
* @function focusRadioButton
*
* @desc Adds focus styling to label element encapsulating standard radio button
*
* @param   {Object}  event  -  Standard W3C event object
*/

function focusRadioButton(event) {
	event.currentTarget.className += ' focus';
}

/*
* @function blurRadioButton
*
* @desc Adds focus styling to the label element encapsulating standard radio button
*
* @param   {Object}  event  -  Standard W3C event object
*/

function blurRadioButton(event) {
	 event.currentTarget.className = event.currentTarget.className.replace(' focus','');
}
