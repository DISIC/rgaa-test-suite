import {findChildByRole} from './dom';


/**
 *
 */
const defaultMakeLabel = ({value}) => `${value}%`;



/**
 *	Returns a function that tests a simple checkbox component.
 *
 *	@param function factory A factory function that takes
 *		a map of options and returns a DOM node containing a
 *		checkbox.
 */
export default function createSimpleCheckboxTest(factory, makeLabel = defaultMakeLabel) {
	return function testSimpleCheckbox() {
		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			it(
				'Test 1.1 : Le composant respecte-t-il ces conditions ?'
				+ '\n\t- Le composant possède un role="checkbox"'
				+ '\n\t- Le composant possède la propriété aria-checked="true" lorsqu\'il est sélectionné'
				+ '\n\t- Le composant possède la propriété aria-checked="false" lorsqu\'il n\'est pas sélectionné'
				+ '\n\t- Le composant possède l\'attribut tabindex="0", si nécessaire',
				function() {
					const props = {
						checked: true,
						id: 'checkbox-selected'
					};

					let node = factory(props);
					let checkbox = findChildByRole(node, 'checkbox');

					expect(checkbox.getAttribute('role')).to.equal('checkbox');
					expect(checkbox.getAttribute('aria-checked')).to.equal('true');

					props.checked = false;
					props.id = 'checkbox-not-selected'
					node = factory(props);
					checkbox = findChildByRole(node, 'checkbox');
					expect(checkbox.getAttribute('aria-checked')).to.equal('false');

					expect(checkbox.getAttribute('tabindex')).to.equal('0');
				}
			);

			it(
				'Test 1.2 : Chaque état de composant symbolisé par une image respecte-t-il une de ces conditions ?'
				+ '\n\t- L\'image possède le role="presentation"'
				+ '\n\t- L\'image est une image insérée via CSS',
				function() {
					const props = {
						checked: true,
						id: 'image'
					};

					let node = factory(props);
					let checkbox = findChildByRole(node, 'checkbox');

					assert(checkbox.getElementsByTagName('img').length, 'L\'élément n\'a pas d \'image');

					expect(checkbox
						.getElementsByTagName('img')[0]
						.getAttribute('role'))
					.to.equal('presentation');

					console.log('Tester manuellement si l\'image est une image insérée via CSS');
				}
			);
		})
		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : Pour chaque composant, l\'utilisation de la touche [Espace] respecte-t-elle ces conditions ?', function() {
				it('- [Espace] permet de cocher le composant s\'il n\'est pas coché',
					function(done) {
						const cleanProps = {
							checked: false,
							id: 'checkbox-not-selected-keyboard'
						};

						const cleanNode = factory(cleanProps);
						const cleanCheckbox = findChildByRole(cleanNode, 'checkbox');

						// Simulates keyboard space event
						const e = new Event('keydown');
						e.keyCode = 32;

						cleanCheckbox.dispatchEvent(e);
						setTimeout(() => {
							expect(cleanCheckbox.getAttribute('aria-checked')).to.equal('true');
							done();
						}, 200);
					}
				);

				it('- [Espace] permet de décocher le composant s\'il est coché',
					function(done) {
						const props = {
							checked: true,
							id: 'checkbox-selected-keyboard'
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
		});
	};
}
