import effroi from 'effroi';
import pending from './pending';



/**
 *
 */
export default function createRadioButtonTest(factory) {
	return function testRadioButton() {
		beforeEach(function() {
			this.props = {
				id: 'un-groupe-avec-un-bouton-activé',
				label: 'Je suis le titre du groupe',
				items: [
					{text: 'Je suis le 1er élément'},
					{text: 'Je suis le 2ème élément et je suis coché par défaut', checked: true},
					{text: 'Je suis le 3ème élément'},
					{text: 'Je suis le 4ème élément'}
				]
			};
			this.node = factory(this.props);
			this.container = this.node.querySelector('[role="radiogroup"]');
			this.buttons = this.node.querySelectorAll('[role="radio"]');
			this.images = this.node.querySelectorAll('img');
			this.presentationImages = this.node.querySelectorAll('img[role="presentation"]');
			this.checkedButtons = this.node.querySelectorAll('[aria-checked="true"]');
		});

		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			describe('Test 1.1: Chaque composant principal respecte-t-il ces conditions ?', function() {
				it('Le composant possède un role="radiogroup".', function() {
					expect(this.container).to.exist;
				});

				it('Au maximum, un bouton radio du composant est sélectionné.', function() {
					expect(this.checkedButtons.length).to.be.at.most(1);
				});
			});

			describe('Test 1.2 : Chaque bouton radio respecte-t-il ces conditions ?', function() {
				it('L\'élément possède un role="radio".', function() {
					expect(this.buttons.length).to.equal(this.props.items.length);
				});

				it('Lorsque l\'élément n\'est pas sélectionné, il possède une propriété aria-checked="false".'
					+ '\n\t  Lorsque l\'élément est sélectionné, il possède une propriété aria-checked="true".', function() {
					this.props.items.forEach((item, i) => {
						const button = this.buttons.item(i);

						expect(button.getAttribute('aria-checked'))
							.to.equal(item.checked ? 'true' : 'false');
					});
				});
			});

			describe('Test 1.3 : Chaque état d\'un bouton radio, symbolisé par une image, respecte-t-il une de ces conditions ?', function() {
				it('L\'image possède un role="presentation".', function() {
					if (!this.images.length) {
						return pending(this, 'Aucune image trouvée.');
					}
					expect(this.presentationImages.length).to.equal(props.items.length);
				});

				it('L\'image est une image insérée via CSS.', function() {
					return pending(this, 'Non testable automatiquement.');
				});
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			beforeEach(function() {
				this.dummyInput = $('<input type="text" class="slider-dummy" name="dummy" />').appendTo('body').get(0);
				const cleanProps = {
					id: 'un-groupe-sans-rien-activé',
					label: 'Je suis le titre du groupe sans bouton activé',
					items: [
						{text: '1er bouton'},
						{text: '2ème bouton'},
						{text: '3ème bouton'},
						{text: '4ème bouton'}
					]
				};
				this.cleanNode = factory(cleanProps);
				this.cleanButtons = this.cleanNode.querySelectorAll('[role="radio"]');
			});

			describe('Test 2.1 : L\'utilisation de la touche [TAB] respecte-t-elle ces conditions ?', function() {
				it('De l\'extérieur du composant, le focus est donné sur l\'élément actif.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.checkedButtons.item(0));
				});

				it('Depuis un élément, le focus est donné sur l\'élément focusable suivant à l\'extérieur du composant.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.checkedButtons.item(0));
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.dummyInput);
				});

				it('De l\'extérieur du composant, si aucun élément n\'est sélectionné, le focus est donné sur le premier élément du composant.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.checkedButtons.item(0));
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.dummyInput);
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.cleanButtons.item(0));
				});
			});

			describe('Test 2.2 : L\'utilisation des [TOUCHES DE DIRECTION] respecte-t-elle ces conditions ?', function() {
				// because of the previous test, the current focus is the first button of the second radiogroup
				it('À partir d\'un élément, [Bas] déplace le focus sur l\'élément suivant.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.checkedButtons.item(0));
					//this.checkedButtons.item(0) === this.buttons.item(1)
					effroi.keyboard.hit('Down');
					expect(document.activeElement).to.equal(this.buttons.item(2));
				});

				it('À partir d\'un élément, [Droit] déplace le focus sur l\'élément suivant.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.checkedButtons.item(0));
					//this.checkedButtons.item(0) === this.buttons.item(1)
					effroi.keyboard.hit('Right');
					expect(document.activeElement).to.equal(this.buttons.item(2));
				});

				it('À partir d\'un élément, [Haut] déplace le focus sur l\'élément précédent.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.checkedButtons.item(0));
					//this.checkedButtons.item(0) === this.buttons.item(1)
					effroi.keyboard.hit('Up');
					expect(document.activeElement).to.equal(this.buttons.item(0));
				});

				it('À partir d\'un élément, [Gauche] déplace le focus sur l\'élément précédent.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.checkedButtons.item(0));
					//this.checkedButtons.item(0) === this.buttons.item(1)
					effroi.keyboard.hit('Left');
					expect(document.activeElement).to.equal(this.buttons.item(0));
				});

				it('À partir du premier élément, [Haut et Gauche] déplace le focus sur le dernier élément.', function() {
					effroi.keyboard.tab();
					effroi.keyboard.tab();
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.cleanButtons.item(0));

					const lastIndex = this.cleanButtons.length - 1;
					effroi.keyboard.hit('Up');
					expect(document.activeElement).to.equal(this.cleanButtons.item(lastIndex));

					effroi.keyboard.hit('Up');
					effroi.keyboard.hit('Up');
					effroi.keyboard.hit('Up');

					effroi.keyboard.hit('Left');
					expect(document.activeElement).to.equal(this.cleanButtons.item(lastIndex));
				});

				it('À partir du dernier élément, [Bas et Droit] déplace le focus sur le premier élément.', function() {
					effroi.keyboard.tab();
					effroi.keyboard.tab();
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.cleanButtons.item(0));

					effroi.keyboard.hit('Down');
					effroi.keyboard.hit('Down');
					effroi.keyboard.hit('Down');

					effroi.keyboard.hit('Down');
					expect(document.activeElement).to.equal(this.cleanButtons.item(0));

					effroi.keyboard.hit('Down');
					effroi.keyboard.hit('Down');
					effroi.keyboard.hit('Down');

					effroi.keyboard.hit('Right');
					expect(document.activeElement).to.equal(this.cleanButtons.item(0));
				});
			});

			afterEach(function() {
				this.dummyInput.remove();
				this.cleanNode.remove();
			});
		});

		afterEach(function() {
			this.node.remove();
		});
	};
}
