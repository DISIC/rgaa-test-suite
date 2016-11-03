/**
 *
 */
export default function createRadioButtonTest(factory) {
	return function testRadioButton() {
		const props = {
			id: 'le-meilleur',
			label: 'C\'est quoi le meilleur ?',
			items: [
				{text: 'De la mousse au chocolat'},
				{text: 'La pizza', checked: true},
				{text: 'L\'huile d\'olive'},
				{text: 'Une salade de fruits'}
			]
		};
		const node = factory(props);
		const container = node.querySelector('[role="radiogroup"]');
		const buttons = node.querySelectorAll('[role="radio"]');
		const images = node.querySelectorAll('img');
		const presentationImages = node.querySelectorAll('img[role="presentation"]');
		const checkedButtons = node.querySelectorAll('[aria-checked="true"]');

		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			describe('Test 1.1: Chaque composant principal respecte-t-il ces conditions ?', function() {
				it('Le composant possède un role="radiogroup"', function() {
					expect(container).to.exist;
				});

				it('Au maximum, un bouton radio du composant est sélectionné', function() {
					expect(checkedButtons.length).to.be.at.most(1);
				});
			});

			describe('Test 1.2 : Chaque bouton radio respecte-t-il ces conditions ?', function() {
				it('L\'élément possède un role="radio"', function() {
					expect(buttons.length).to.equal(props.items.length);
				});
				it('Lorsque l\'élément n\'est pas sélectionné, il possède une propriété aria-checked="false"'
					+ '\n\t  Lorsque l\'élément est sélectionné, il possède une propriété aria-checked="true', function() {
					props.items.forEach((item, i) => {
						const button = buttons.item(i);

						expect(button.getAttribute('aria-checked'))
							.to.equal(item.checked ? 'true' : 'false');
					});
				});
			});

			describe('Test 1.3 : Chaque état d\'un bouton radio, symbolisé par une image, respecte-t-il une de ces conditions ?', function() {
				it('L\'image possède un role="presentation"', function() {
					if (!images.length) {
						this._runnable.title += " (aucune image trouvée)";
						return this.skip();
					}
					expect(presentationImages.length).to.equal(props.items.length);
				});

				it('L\'image est une image insérée via CSS (non testable automatiquement)');
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			const cleanProps = {
				id: 'le-pire',
				label: 'C\'est quoi le pire ?',
				items: [
					{text: 'Le coeur de palmier'},
					{text: 'Une endive'},
					{text: 'La banane'},
					{text: 'La choucroute'}
				]
			};
			const cleanNode = factory(cleanProps);
			const cleanButtons = cleanNode.querySelectorAll('[role="radio"]');

			describe('Test 2.1 : L\'utilisation de la touche [TAB] respecte-t-elle ces conditions ?', function() {
				it('De l\'extérieur du composant, le focus est donné sur l\'élément actif', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(checkedButtons.item(0));
				});

				it('De l\'extérieur du composant, si aucun élément n\'est sélectionné, le focus est donné sur le premier élément du composant', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(cleanButtons.item(0));
				});

				it('Depuis un élément, le focus est donné sur l\'élément focusable suivant à l\'extérieur du composant', function() {
					expect(document.activeElement).to.equal(cleanButtons.item(0));
				});
			});

			describe('Test 2.2 : L\'utilisation des [TOUCHES DE DIRECTION] respecte-t-elle ces conditions ?', function() {
				// because of the previous test, the current focus is the first button of the second radiogroup

				it('À partir d\'un élément, [Bas et Droit] déplace le focus sur l\'élément suivant', function() {
					effroi.keyboard.hit('Down');
					expect(document.activeElement).to.equal(cleanButtons.item(1));
					effroi.keyboard.hit('Right');
					expect(document.activeElement).to.equal(cleanButtons.item(2));
				});

				it('À partir d\'un élément, [Haut et Gauche] déplace le focus sur l\'élément précédent', function() {
					effroi.keyboard.hit('Up');
					expect(document.activeElement).to.equal(cleanButtons.item(1));
					effroi.keyboard.hit('Left');
					expect(document.activeElement).to.equal(cleanButtons.item(0));
				});

				it('À partir du premier élément, [Haut et Gauche] déplace le focus sur le dernier élément', function() {
					const lastIndex = cleanButtons.length - 1;
					effroi.keyboard.hit('Up');
					expect(document.activeElement).to.equal(cleanButtons.item(lastIndex));

					effroi.keyboard.hit('Up');
					effroi.keyboard.hit('Up');
					effroi.keyboard.hit('Up');

					effroi.keyboard.hit('Left');
					expect(document.activeElement).to.equal(cleanButtons.item(lastIndex));
				});

				it('À partir du dernier élément, [Bas et Droit] déplace le focus sur le premier élément', function() {
					effroi.keyboard.hit('Down');
					expect(document.activeElement).to.equal(cleanButtons.item(0));

					effroi.keyboard.hit('Down');
					effroi.keyboard.hit('Down');
					effroi.keyboard.hit('Down');

					effroi.keyboard.hit('Right');
					expect(document.activeElement).to.equal(cleanButtons.item(0));
				});
			});
		});
	};
}
