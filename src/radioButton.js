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
			it(
				'Test 1.1: Chaque composant principal respecte-t-il ces conditions ?'
				+ '\n\t- Le composant possède un role="radiogroup"'
				+ '\n\t- Au maximum, un bouton radio du composant est sélectionné',
				function() {
					expect(container).to.exist;
					expect(checkedButtons.length).to.be.at.most(1);
				}
			);

			it(
				'Test 1.2 : Chaque bouton radio respecte-t-il ces conditions ?'
				+ '\n\t- L\'élément possède un role="radio"'
				+ '\n\t- Lorsque l\'élément n\'est pas sélectionné, il possède une propriété aria-checked="false"'
				+ '\n\t- Lorsque l\'élément est sélectionné, il possède une propriété aria-checked="true',
				function() {
					expect(buttons.length).to.equal(props.items.length);
					props.items.forEach((item, i) => {
						const button = buttons.item(i);

						expect(button.getAttribute('aria-checked'))
							.to.equal(item.checked ? 'true' : 'false');
					});
				}
			);

			it(
				'Test 1.3 : Chaque état d\'un bouton radio, symbolisé par une image, respecte-t-il une de ces conditions ?'
				+ '\n\t- L\'image possède un role="presentation"'
				+ '\n\t- L\'image est une image insérée via CSS',
				function() {
					if (!images.length) {
						return this.skip();
					}
					expect(presentationImages.length).to.equal(props.items.length);
				}
			);
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			it(
				'Test 2.1 : L\'utilisation de la touche [TAB] respecte-t-elle ces conditions ?'
				+ '\n\t- De l\'extérieur du composant, si aucun élément n\'est sélectionné, le focus est donné sur le premier élément du composant'
				+ '\n\t- De l\'extérieur du composant, le focus est donné sur l\'élément actif'
				+ '\n\t- Depuis un élément, le focus est donné sur l\'élément focusable suivant à l\'extérieur du composant',
				function() {
					// first test 2nd condition
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(checkedButtons.item(0));

					// then test the 1st and 3rd ones
					const cleanProps = {
						id: 'le-pire',
						label: 'C\'est quoi le pire ?',
						items: [
							{text: 'Le coeur de palmier'},
							{text: 'Une endive'},
							{text: 'La choucroute'}
						]
					};
					const cleanNode = factory(cleanProps);
					const cleanButtons = cleanNode.querySelectorAll('[role="radio"]');
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(cleanButtons.item(0));
				}
			);

			it.skip(
				'Test 2.2 : L\'utilisation des [TOUCHES DE DIRECTION] respecte-t-elle ces conditions ?'
				+ '\n\t- À partir d\'un élément, [Haut et Gauche] déplace le focus sur l\'élément précédent.'
				+ '\n\t- À partir d\'un élément, [Bas et Droit] déplace le focus sur l\'élément suivant'
				+ '\n\t- À partir du dernier élément, [Bas et Droit] déplace le focus sur le premier élément'
				+ '\n\t- À partir du premier élément, [Haut et Gauche] déplace le focus sur le dernier élément',
				function() {
				}
			);
		});

	};
}
