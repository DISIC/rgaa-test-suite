import {expect} from 'chai';
import effroi from 'effroi';
import pending from './pending';
import setupSandbox from './setupSandbox';



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
				it('Le composant possède un role="checkbox".', function() {
					const props = {
						checked: true
					};

					const sandbox = setupSandbox(factory(props));
					const checkbox = sandbox.querySelector('[role="checkbox"]');

					expect(checkbox).to.be.ok;
				});

				it('Le composant possède la propriété aria-checked="true" lorsqu\'il est sélectionné.', function() {
					const props = {
						checked: true
					};

					const sandbox = setupSandbox(factory(props));
					const checkbox = sandbox.querySelector('[role="checkbox"]');

					expect(checkbox.getAttribute('aria-checked')).to.equal('true');
				});

				it('Le composant possède la propriété aria-checked="false" lorsqu\'il n\'est pas sélectionné.', function() {
					const props = {
						checked: false
					};

					const sandbox = setupSandbox(factory(props));
					const checkbox = sandbox.querySelector('[role="checkbox"]');

					expect(checkbox.getAttribute('aria-checked')).to.equal('false');
				});

				it('Le composant possède l\'attribut tabindex="0", si nécessaire.', function() {
					const props = {
						checked: true
					};

					const sandbox = setupSandbox(factory(props));
					const checkbox = sandbox.querySelector('[role="checkbox"]');

					expect(checkbox.getAttribute('tabindex')).to.equal('0');
				});
			})

			describe('Test 1.2 : Chaque état de composant symbolisé par une image respecte-t-il une de ces conditions ?', function() {
				before(function() {
					const props = {
						checked: true
					};

					const sandbox = setupSandbox(factory(props));
					this.images = sandbox.querySelectorAll('img');
					this.presentationImages = sandbox.querySelectorAll('img[role="presentation"]');
				});

				it('L\'image possède le role="presentation".', function() {
					if (!this.images.length) {
						return pending(this, 'Aucune image trouvée.');
					}
					expect(this.presentationImages.length).to.equal(1);
				});

				it('L\'image est une image insérée via CSS.', function() {
					return pending(this, 'Non testable automatiquement.');
				});
			})

		})
		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : Pour chaque composant, l\'utilisation de la touche [Espace] respecte-t-elle ces conditions ?', function() {
				it('[Espace] permet de cocher le composant s\'il n\'est pas coché.', function() {
					const props = {
						checked: false
					};

					const sandbox = setupSandbox(factory(props));
					const checkbox = sandbox.querySelector('[role="checkbox"]');

					// Simulates keyboard space event
					effroi.keyboard.focus(checkbox);
					effroi.keyboard.hit('Spacebar');

					expect(checkbox.getAttribute('aria-checked')).to.equal('true');
				});

				it('[Espace] permet de décocher le composant s\'il est coché.', function() {
					const props = {
						checked: true
					};

					const sandbox = setupSandbox(factory(props));
					const checkbox = sandbox.querySelector('[role="checkbox"]');

					// Simulates keyboard space event
					effroi.keyboard.focus(checkbox);
					effroi.keyboard.hit('Spacebar');

					expect(checkbox.getAttribute('aria-checked')).to.equal('false');
				});
			});
		});
	};
}
