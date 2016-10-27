import {findChildByRole} from './dom';


/**
 *
 */
const defaultMakeLabel = ({value}) => `${value}%`;



/**
 *	Returns a function that tests a tristate checkbox component.
 *
 *	@param function factory A factory function that takes
 *		a map of options and returns a DOM node containing a
 *		tristate checkbox.
 */
export default function createTristateCheckboxTest(factory, makeLabel = defaultMakeLabel) {
	return function testTristateCheckbox() {
		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			it(
				'Test 1.1 : Le composant respecte-t-il ces conditions ?'
				+ '\n\t- Le composant possède un role="checkbox"'
				+ '\n\t- Le composant possède la propriété aria-checked="true" lorsqu\'il est sélectionné'
				+ '\n\t- Le composant possède la propriété aria-checked="false" lorsqu\'il n\'est pas sélectionné'
				+ '\n\t- Le composant possède la propriété aria-checked="mixed" lorsqu\'il est partiellement sélectionné'
				+ '\n\t- Le composant possède l\'attribut tabindex="0", si nécessaire',
				function(done) {
					const props = {
						state: true,
						items: [
							{label: 'Lettuce'},
							{label: 'Tomato'},
							{label: 'Mustard'},
							{label: 'Sprouts'}
						],
						title: 'Sandwich Condiments',
						id: 'tristate-checkbox-selected'
					};

					let node = factory(props);
					let checkbox = findChildByRole(node, 'checkbox');

					expect(checkbox.getAttribute('role')).to.equal('checkbox');
					expect(checkbox.getAttribute('tabindex')).to.equal('0');

					expect(checkbox.getAttribute('aria-checked')).to.equal('true');

					props.state = false;
					props.id = 'tristate-checkbox-not-selected';
					node = factory(props);
					checkbox = findChildByRole(node, 'checkbox');
					expect(checkbox.getAttribute('aria-checked')).to.equal('false');

					const inputs = node.querySelectorAll('input[type=checkbox]');
					const firstInput = inputs[0];
					firstInput.checked = true;

					// Simulates change event
					const e = new Event('change');
					firstInput.dispatchEvent(e);

					setTimeout(() => {
						expect(checkbox.getAttribute('aria-checked')).to.equal('mixed');
						done();
					}, 200);
				}
			);

			it(
				'Test 1.2 : Chaque état de composant symbolisé par une image respecte-t-il une de ces conditions ?'
				+ '\n\t- L\'image possède le role="presentation"'
				+ '\n\t- L\'image est une image insérée via CSS',
				function() {
					const props = {
						state: true,
						items: [
							{label: 'Lettuce'},
							{label: 'Tomato'},
							{label: 'Mustard'},
							{label: 'Sprouts'}
						],
						title: 'Sandwich Condiments',
						id: 'image'
					};

					let node = factory(props);
					let checkbox = findChildByRole(node, 'checkbox');


					expect(checkbox
						.getElementsByTagName('img')[0]
						.getAttribute('role'))
					.to.equal('presentation');

					console.log('Tester manuellement si l\'image est une image insérée via CSS');
				}
			);

			describe.skip('Test 1.3 : Chaque groupement de cases à cocher respecte-t-il ces conditions ?', function() {
				it('L\'élément structurant le groupe possède un role="group"',
					function() {
						const props = {
							state: true,
							items: [
								{label: 'Lettuce'},
								{label: 'Tomato'},
								{label: 'Mustard'},
								{label: 'Sprouts'}
							],
							title: 'Sandwich Condiments',
							id: 'tristate-checkbox-group'
						};

						let node = factory(props);
						let checkbox = findChildByRole(node, 'checkbox');

						const structuringNode = node.firstElementChild;
						const structuringNodeName = structuringNode.nodeName.toLowerCase();
						// Tristate checkbox group is valid with a fieldSet/legend so skip this test
						if (structuringNodeName === 'fieldset') {
							this.skip();
						}


						if (checkbox.getAttribute('role') === 'checkbox') {
							expect(checkbox.getAttribute('role')).to.equal('checkbox');
						}
					}
				);
			});

			describe('Test 1.4 : Chaque case à cocher qui supporte un triple état et qui représente l\'état d\'un groupe de cases à cocher, respecte-t-elle ces conditions ?', function() {
				it('L\'élément possède une propriété aria-checked="false" lorsqu\'aucune case à cocher du groupe n\'est cochée',
					function(done) {
						const props = {
							state: true,
							items: [
								{label: 'Lettuce'},
								{label: 'Tomato'},
								{label: 'Mustard'},
								{label: 'Sprouts'}
							],
							title: 'Sandwich Condiments',
							id: 'checkboxes-not-selected'
						};

						let node = factory(props);
						let checkbox = findChildByRole(node, 'checkbox');

						const inputs = node.querySelectorAll('input[type=checkbox]');
						for (let i = 0; i < inputs.length; i++) {
							inputs[i].checked = false;
						}

						const e = new Event('change');
						inputs[inputs.length - 1].dispatchEvent(e);


						setTimeout(() => {
							expect(checkbox.getAttribute('aria-checked')).to.equal('false');
							done();
						}, 200);
					}
				);

				it('L\'élément possède une propriété aria-checked="mixed", lorsqu\'au moins une case à cocher du groupe est cochée',
					function(done) {
						const props = {
							state: false,
							items: [
								{label: 'Lettuce'},
								{label: 'Tomato'},
								{label: 'Mustard'},
								{label: 'Sprouts'}
							],
							title: 'Sandwich Condiments',
							id: 'one-checkboxe-selected'
						};

						let node = factory(props);
						let checkbox = findChildByRole(node, 'checkbox');

						const inputs = node.querySelectorAll('input[type=checkbox]');
						inputs[0].checked = true;

						const e = new Event('change');
						inputs[0].dispatchEvent(e);


						setTimeout(() => {
							expect(checkbox.getAttribute('aria-checked')).to.equal('mixed');
							done();
						}, 200);
					}
				);

				it('L\'élément possède une propriété aria-checked="true", lorsque toutes les cases à cocher du groupe sont cochées',
					function(done) {
						const props = {
							state: false,
							items: [
								{label: 'Lettuce'},
								{label: 'Tomato'},
								{label: 'Mustard'},
								{label: 'Sprouts'}
							],
							title: 'Sandwich Condiments',
							id: 'checkboxes-selected'
						};

						let node = factory(props);
						let checkbox = findChildByRole(node, 'checkbox');

						const inputs = node.querySelectorAll('input[type=checkbox]');
						for (let i = 0; i < inputs.length; i++) {
							inputs[i].checked = true;
						}

						const e = new Event('change');
						inputs[inputs.length - 1].dispatchEvent(e);


						setTimeout(() => {
							expect(checkbox.getAttribute('aria-checked')).to.equal('true');
							done();
						}, 200);
					}
				);
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : Pour chaque composant, l\'utilisation de la touche [Espace] respecte-t-elle ces conditions ?', function() {
				it('- [Espace] permet de cocher le composant s\'il n\'est pas coché',
					function(done) {
						const props = {
							state: false,
							items: [
								{label: 'Lettuce'},
								{label: 'Tomato'},
								{label: 'Mustard'},
								{label: 'Sprouts'}
							],
							title: 'Sandwich Condiments',
							id: 'tristate-checkbox-not-selected-keyboard'
						};

						const node = factory(props);
						const checkbox = findChildByRole(node, 'checkbox');

						// Simulates keyboard space event
						const e = new Event('keydown');
						e.keyCode = 32;

						checkbox.dispatchEvent(e);
						setTimeout(() => {
							expect(checkbox.getAttribute('aria-checked')).to.equal('true');
							done();
						}, 200);
					}
				);

				it('- [Espace] permet de décocher le composant s\'il est coché',
					function(done) {
						const props = {
							state: true,
							items: [
								{label: 'Lettuce'},
								{label: 'Tomato'},
								{label: 'Mustard'},
								{label: 'Sprouts'}
							],
							title: 'Sandwich Condiments',
							id: 'tristate-checkbox-selected-keyboard'
						};

						const node = factory(props);
						const checkbox = findChildByRole(node, 'checkbox');

						// Simulates keyboard space event
						const e = new Event('keydown');
						e.keyCode = 32;

						checkbox.dispatchEvent(e);
						setTimeout(() => {
							expect(checkbox.getAttribute('aria-checked')).to.equal('false');
							done();
						}, 200);
					}
				);
			});

			describe('Test 2.2 :  Pour chaque composant qui supporte un triple état, l\'utilisation de la touche [Espace] respecte-t-elle cette condition ?', function() {
				it('- Si le composant est partiellement coché, [Espace] permet de cocher le composant',
					function(done) {
						const props = {
							state: 'mixed',
							items: [
								{label: 'Lettuce'},
								{label: 'Tomato'},
								{label: 'Mustard'},
								{label: 'Sprouts'}
							],
							title: 'Sandwich Condiments',
							id: 'tristate-checkbox-mixed-keyboard'
						};

						const node = factory(props);
						const checkbox = findChildByRole(node, 'checkbox');

						// Simulates keyboard space event
						const e = new Event('keydown');
						e.keyCode = 32;

						checkbox.dispatchEvent(e);
						setTimeout(() => {
							expect(checkbox.getAttribute('aria-checked')).to.equal('true');
							done();
						}, 200);
					}
				);
			});
		});
	};
}
