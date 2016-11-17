import {findChildByRole} from './dom';
import pending from './pending';
import cleanDom from './cleanDom';


/**
 *
 */
const defaultMakeLabel = ({value}) => `${value}%`;


/**
 *
 */
const getChildrenCheckboxes = (node) => node.querySelectorAll('input[type=checkbox], [role=checkbox]');


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
			describe('Test 1.1 : Le composant respecte-t-il ces conditions ?', function() {
				afterEach(function() {
					cleanDom();
				});

				it('Le composant possède un role="checkbox"',	function() {
					const props = {
						state: false,
						items: [
							{label: 'Lettuce', checked: false},
							{label: 'Tomato', checked: false},
							{label: 'Mustard', checked: false},
							{label: 'Sprouts', checked: false}
						],
						title: 'Sandwich Condiments'
					};

					let node = factory(props);
					let checkboxes = getChildrenCheckboxes(node);
					let mainCheckbox = checkboxes[0];

					expect(mainCheckbox).to.be.ok;
				});

				it('Le composant possède la propriété aria-checked="true" lorsqu\'il est sélectionné', function() {
					const props = {
						state: true,
						items: [
							{label: 'Lettuce', checked: true},
							{label: 'Tomato', checked: true},
							{label: 'Mustard', checked: true},
							{label: 'Sprouts', checked: true}
						],
						title: 'Sandwich Condiments'
					};

					let node = factory(props);
					let checkboxes = getChildrenCheckboxes(node);
					let mainCheckbox = checkboxes[0];

					expect(mainCheckbox.getAttribute('aria-checked')).to.equal('true');
				});

				it('Le composant possède la propriété aria-checked="false" lorsqu\'il n\'est pas sélectionné', function() {
					const props = {
						state: false,
						items: [
							{label: 'Lettuce', checked: false},
							{label: 'Tomato', checked: false},
							{label: 'Mustard', checked: false},
							{label: 'Sprouts', checked: false}
						],
						title: 'Sandwich Condiments'
					}

					let node = factory(props);
					let checkboxes = getChildrenCheckboxes(node);
					let mainCheckbox = checkboxes[0];

					expect(mainCheckbox.getAttribute('aria-checked')).to.equal('false');
				});

				it('Le composant possède la propriété aria-checked="mixed" lorsqu\'il est partiellement sélectionné',	function() {
					const props = {
						state: 'mixed',
						items: [
							{label: 'Lettuce', checked: true},
							{label: 'Tomato', checked: false},
							{label: 'Mustard', checked: false},
							{label: 'Sprouts', checked: false}
						],
						title: 'Sandwich Condiments'
					};

					let node = factory(props);
					let checkboxes = getChildrenCheckboxes(node);
					let mainCheckbox = checkboxes[0];

					expect(mainCheckbox.getAttribute('aria-checked')).to.equal('mixed');
				});

				it('Le composant possède l\'attribut tabindex="0", si nécessaire', function() {
					const props = {
						state: false,
						items: [
							{label: 'Lettuce', checked: false},
							{label: 'Tomato', checked: false},
							{label: 'Mustard', checked: false},
							{label: 'Sprouts', checked: false}
						],
						title: 'Sandwich Condiments'
					};

					let node = factory(props);
					let checkboxes = getChildrenCheckboxes(node);
					let mainCheckbox = checkboxes[0];

					expect(mainCheckbox.getAttribute('tabindex')).to.equal('0');
				});
			});

			describe('Test 1.2 : Chaque état de composant symbolisé par une image respecte-t-il une de ces conditions ?', function() {
				before(function() {
					this.props = {
						state: false,
						items: [
							{label: 'Lettuce', checked: false},
							{label: 'Tomato', checked: false},
							{label: 'Mustard', checked: false},
							{label: 'Sprouts', checked: false}
						],
						title: 'Sandwich Condiments'
					};
					this.node = factory(this.props);
					this.images = this.node.querySelectorAll('img');
					this.presentationImages = this.node.querySelectorAll('img[role="presentation"]');
				});

				after(function() {
					cleanDom();
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
			});


			describe('Test 1.3 : Chaque groupement de cases à cocher respecte-t-il ces conditions ?', function() {
				beforeEach(function() {
					this.props = {
						state: false,
						items: [
							{label: 'Lettuce', checked: false},
							{label: 'Tomato', checked: false},
							{label: 'Mustard', checked: false},
							{label: 'Sprouts', checked: false}
						],
						title: 'Sandwich Condiments'
					};

					this.node = factory(this.props);
					this.structuringNode = this.node.querySelectorAll('[role=group]')[0];
				});

				afterEach(function() {
					cleanDom();
				});

				it('L\'élément structurant le groupe possède un role="group"', function() {
					expect(this.structuringNode.getAttribute('role')).to.equal('group');
				});

				it('L\'élément structurant est précédé d\'un titre',
					function() {
						expect(this.structuringNode.previousSibling.nodeName)
							.to.be.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P']);
					}
				);

				it('L\'élément structurant possède une propriété aria-labelledby="[ID_titre]" référençant le titre',
					function() {
						expect(this.structuringNode.getAttribute('aria-labelledby')).to.exist;
					}
				);
			});

			describe('Test 1.4 : Chaque case à cocher qui supporte un triple état et qui représente l\'état d\'un groupe de cases à cocher, respecte-t-elle ces conditions ?', function() {
				afterEach(function() {
					cleanDom();
				});

				it('L\'élément possède une propriété aria-checked="false" lorsqu\'aucune case à cocher du groupe n\'est cochée',
					function() {
						const props = {
							state: 'mixed',
							items: [
								{label: 'Lettuce', checked: true},
								{label: 'Tomato', checked: false},
								{label: 'Mustard', checked: false},
								{label: 'Sprouts', checked: false}
							],
							title: 'Sandwich Condiments'
						};

						const node = factory(props);
						const checkboxes = getChildrenCheckboxes(node);
						const mainCheckbox = checkboxes[0];
						const firstNestedCheckbox = checkboxes[1];

						effroi.mouse.click(firstNestedCheckbox);
						expect(mainCheckbox.getAttribute('aria-checked')).to.equal('false');
					}
				);

				it('L\'élément possède une propriété aria-checked="mixed", lorsqu\'au moins une case à cocher du groupe est cochée',
					function() {
						const props = {
							state: false,
							items: [
								{label: 'Lettuce', checked: false},
								{label: 'Tomato', checked: false},
								{label: 'Mustard', checked: false},
								{label: 'Sprouts', checked: false}
							],
							title: 'Sandwich Condiments'
						};

						const node = factory(props);
						const checkboxes = getChildrenCheckboxes(node);
						const mainCheckbox = checkboxes[0];
						const firstNestedCheckbox = checkboxes[1];

						effroi.mouse.click(firstNestedCheckbox);
						expect(mainCheckbox.getAttribute('aria-checked')).to.equal('mixed');
					}
				);

				it('L\'élément possède une propriété aria-checked="true", lorsque toutes les cases à cocher du groupe sont cochées',
					function() {
						const props = {
							state: 'mixed',
							items: [
								{label: 'Lettuce', checked: false},
								{label: 'Tomato', checked: true},
								{label: 'Mustard', checked: true},
								{label: 'Sprouts', checked: true}
							],
							title: 'Sandwich Condiments'
						};

						const node = factory(props);
						const checkboxes = getChildrenCheckboxes(node);
						const mainCheckbox = checkboxes[0];
						const firstNestedCheckbox = checkboxes[1];

						effroi.mouse.click(firstNestedCheckbox);
						expect(mainCheckbox.getAttribute('aria-checked')).to.equal('true');
					}
				);
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : Pour chaque composant, l\'utilisation de la touche [Espace] respecte-t-elle ces conditions ?', function() {
				afterEach(function() {
					cleanDom();
				});

				it('[Espace] permet de cocher le composant s\'il n\'est pas coché',
					function() {
						const props = {
							state: false,
							items: [
								{label: 'Lettuce', checked: false},
								{label: 'Tomato', checked: false},
								{label: 'Mustard', checked: false},
								{label: 'Sprouts', checked: false}
							],
							title: 'Sandwich Condiments'
						};

						const node = factory(props);
						const checkboxes = getChildrenCheckboxes(node);
						const mainCheckbox = checkboxes[0];

						// Simulates keyboard space event
						effroi.keyboard.focus(mainCheckbox);
						effroi.keyboard.hit('Spacebar');

						expect(mainCheckbox.getAttribute('aria-checked')).to.equal('true');
					}
				);

				it('[Espace] permet de décocher le composant s\'il est coché',
					function() {
						const props = {
							state: true,
							items: [
								{label: 'Lettuce', checked: true},
								{label: 'Tomato', checked: true},
								{label: 'Mustard', checked: true},
								{label: 'Sprouts', checked: true}
							],
							title: 'Sandwich Condiments'
						};

						const node = factory(props);
						const checkboxes = getChildrenCheckboxes(node);
						const mainCheckbox = checkboxes[0];

						// Simulates keyboard space event
						effroi.keyboard.focus(mainCheckbox);
						effroi.keyboard.hit('Spacebar');

						expect(mainCheckbox.getAttribute('aria-checked')).to.equal('false');
					}
				);
			});

			describe('Test 2.2 :  Pour chaque composant qui supporte un triple état, l\'utilisation de la touche [Espace] respecte-t-elle cette condition ?', function() {
				afterEach(function() {
					cleanDom();
				});

				it('Si le composant est partiellement coché, [Espace] permet de cocher le composant',
					function() {
						const props = {
							state: 'mixed',
							items: [
								{label: 'Lettuce', checked: false},
								{label: 'Tomato', checked: true},
								{label: 'Mustard', checked: true},
								{label: 'Sprouts', checked: true}
							],
							title: 'Sandwich Condiments'
						};

						const node = factory(props);
						const checkboxes = getChildrenCheckboxes(node);
						const mainCheckbox = checkboxes[0];

						// Simulates keyboard space event
						effroi.keyboard.focus(mainCheckbox);
						effroi.keyboard.hit('Spacebar');

						expect(mainCheckbox.getAttribute('aria-checked')).to.equal('true');
					}
				);
			});
		});
	};
}
