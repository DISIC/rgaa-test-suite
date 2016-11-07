import {findChildByRole, resetDocument} from './dom';
import pending from './pending';


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
			describe('Test 1.1 : Le composant respecte-t-il ces conditions ?', function() {
				it('Le composant possède un role="checkbox"', function() {
					const props = {
						checked: true,
						id: 'checkbox-role'
					};

					let node = factory(props);
					let checkbox = findChildByRole(node, 'checkbox');

					expect(checkbox).to.be.ok;
				});

				it('Le composant possède la propriété aria-checked="true" lorsqu\'il est sélectionné', function() {
					const props = {
						checked: true,
						id: 'checkbox-selected'
					};

					let node = factory(props);
					let checkbox = findChildByRole(node, 'checkbox');

					expect(checkbox.getAttribute('aria-checked')).to.equal('true');
				});

				it('Le composant possède la propriété aria-checked="false" lorsqu\'il n\'est pas sélectionné', function() {
					const props = {
						checked: false,
						id: 'checkbox-not-selected'
					};

					let node = factory(props);
					let checkbox = findChildByRole(node, 'checkbox');

					expect(checkbox.getAttribute('aria-checked')).to.equal('false');
				});

				it('Le composant possède l\'attribut tabindex="0", si nécessaire', function() {
					const props = {
						checked: true,
						id: 'checkbox-tabindex'
					};

					let node = factory(props);
					let checkbox = findChildByRole(node, 'checkbox');

					expect(checkbox.getAttribute('tabindex')).to.equal('0');
				});
			})

			describe('Test 1.2 : Chaque état de composant symbolisé par une image respecte-t-il une de ces conditions ?', function() {
				before(function() {
					this.props = {
						checked: true,
						id: 'image'
					};
					this.node = factory(this.props);
					this.images = this.node.querySelectorAll('img');
					this.presentationImages = this.node.querySelectorAll('img[role="presentation"]');
				});

				it('L\'image possède le role="presentation"',	function() {
					if (!this.images.length) {
						return pending(this, 'Aucune image trouvée');
					}
					expect(this.presentationImages.length).to.equal(1);
				});

				it('L\'image est une image insérée via CSS', function() {
					return pending(this, 'Non testable automatiquement');
				});
			})

		})
		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : Pour chaque composant, l\'utilisation de la touche [Espace] respecte-t-elle ces conditions ?', function() {
				after(function() {
					resetDocument();
				});

				it('[Espace] permet de cocher le composant s\'il n\'est pas coché', function() {
					const props = {
						checked: false,
						id: 'checkbox-not-selected-keyboard'
					};

					const node = factory(props);
					const checkbox = findChildByRole(node, 'checkbox');

					// Simulates keyboard space event
					effroi.keyboard.focus(checkbox);
					effroi.keyboard.hit('Spacebar');

					expect(checkbox.getAttribute('aria-checked')).to.equal('true');
				});

				it('[Espace] permet de décocher le composant s\'il est coché', function() {
					const props = {
						checked: true,
						id: 'checkbox-selected-keyboard'
					};

					const node = factory(props);
					const checkbox = findChildByRole(node, 'checkbox');

					// Simulates keyboard space event
					effroi.keyboard.focus(checkbox);
					effroi.keyboard.hit('Spacebar');

					expect(checkbox.getAttribute('aria-checked')).to.equal('false');
				});
			});
		});
	};
}
