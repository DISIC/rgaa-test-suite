# Test suite for RGAA3 components

A test suite for mocha+karma to test JavaScript components for RGAA3 compliancy.

## Installation

```
npm install --save-dev rgaa-test-suite
```

## Usage

Because the components must be initialized with the correct settings for each test, you will have to provide the test a way of initializing the component as it needs.

Typically, you will create a function that takes in the settings required by the test, and return a DOM node containing the component to test.

### Example

Here is how you could test a progress bar:

```js
import {progressBar, createWrapper} from 'rgaa-test-suite';
import {createProgressBar} from 'my-library';

/**
 * A factory that takes in props (min, max, value) and
 * returns a DOM node containing the progress bar to test.
 */
function factory(props) {
	const node = createWrapper('wrapper-id');
	createProgressBar(node, props);
	return node;
}

/**
 * The actual test.
 */
describe('My awesome progress bar', progressBar(factory));
```

When you run karma, you will get the status of all the criterias and tests:

```sh
My awesome progress bar
  Critère 1 : L'implémentation ARIA est-elle conforme ?
    ✔ Test 1.1 : Le composant respecte-t-il ces conditions ?
        - Le composant possède un role="progressbar"
        - Le composant possède une propriété aria-valuemin="[valeur minimale]"
        - Le composant possède une propriété aria-valuemax="[valeur maximale]"
    ✖ Test 1.2 : Le composant respecte-t-il une de ces conditions ?
        - Le composant est constitué d'un élément graphique qui possède une
          alternative pertinente
        - Le composant possède une propriété aria-labelledby="[id]" référençant
          un passage de texte faisant office de nom
        - Le composant possède un attribut title faisant office de nom
```

### Factories options

#### Progress bars

```js
{
	min: 0,
	max: 100,
	value: 12
}
```

#### Tab panels

```js
{
	panels: [
		{
			title: 'Panel title',
			content: 'Lorem ipsum dolor sit amet.',
			selected: true
		}
	]
}
```
