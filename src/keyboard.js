/**
 *
 */
const CHARCODES = {
	'up': 38,
	'down': 40,
	'left': 37,
	'right': 39,
	'esc': 27,
	'tab': 9,
	'enter': 13
};

/**
 *
 */
const getKeycode = (keycodeOrName) =>
	typeof keycodeOrName === 'string' ? CHARCODES[keycodeOrName] : keycodeOrName;

/**
 *
 */
const keyEvent = (event, keycodeOrName, element = document.activeElement) => {
	$(element).trigger($.Event(`key${event}`, {which: getKeycode(keycodeOrName)}));
};

/**
 *
 */
export const press = (keycodeOrName, element = document.activeElement) => {
	keyEvent('down', keycodeOrName, element);
	keyEvent('press', keycodeOrName, element);
	keyEvent('up', keycodeOrName, element);
};

const focusableElements = () =>
	document.querySelectorAll(
		'input:not(:disabled), textarea:not(:disabled), '
		+ 'a[href]:not(:disabled):not(:empty), button:not(:disabled), '
		+ 'select:not(:disabled), '
		+ '[tabindex="0"]:not(:disabled)'
	);

/**
 *
 */
export const tab = (reverse = false) => {
	const elements = focusableElements();
	if (!elements.length) {
		return;
	}
	let i = elements.length -1;
	for (i; i >= 0; i--) {
		if (elements[i] === document.activeElement) {
			break;
		}
	}

	keyEvent('down', CHARCODES.tab);
	keyEvent('press', CHARCODES.tab);

	let toFocus;
	if (reverse) {
		toFocus = i-1 < 0 ? elements[elements.length - 1] : elements[i - 1];
	} else {
		toFocus = i + 1 >= elements.length ? elements[0] : elements[i + 1];
	}
	$(toFocus).focus();

	keyEvent('up', CHARCODES.tab);
};

/**
 *
 */
export const shiftTab = () => tab(true);

/**
 *
 */
export const focus = (element) => {
	if (element === document.activeElement) {
		return true;
	}
	blur();
	while (element !== document.activeElement && tab()) {
		continue;
	}
	return element === document.activeElement;
};

export const blur = (element = document.activeElement) => {
	$(element).blur();
};
