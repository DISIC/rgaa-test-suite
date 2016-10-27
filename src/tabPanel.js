import {findChildByRole, findChildrenByRole} from './dom';
import describeSome from './describeSome';



/**
 *
 */
export default (factory) => () => {
	describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
		const props = {
			panels: [
				{
					title: 'Header 1',
					content: 'Content 1',
					selected: false
				},
				{
					title: 'Header 2',
					content: 'Content 2',
					selected: true
				},
				{
					title: 'Header 3',
					content: 'Content 3',
					selected: false
				}
			]
		};

		const node = factory(props);
		const tabList = findChildByRole(node, 'tablist');
		const tabs = findChildrenByRole(tabList, 'tab');
		const tabPanels = findChildrenByRole(node, 'tabpanel');

		describe('Test 1.1: Le composant englobant les titres des onglets possède-t-il un role="tablist" ?', function() {
			it('Test 1.1', function() {
				expect(tabs.length)
					.to.equal(props.panels.length);
			});
		});

		describe('Test 1.2 : Chaque titre d\'onglet respecte-t-il ces conditions ?', function() {
			it('Le titre possède un role="tab"', function() {
				props.panels.forEach((panel, i) => {
					expect(tabs[i].getAttribute('role'))
						.to.equal('tab');
				});
			});

			it('Le titre possède une propriété aria-selected="true" lorsque le panneau est affiché', function() {
				props.panels.forEach((panel, i) => {
					if (panel.selected) {
						expect(tabs[i].getAttribute('aria-selected'))
							.to.equal('true');
					}
				});
			});

			it('Le titre possède une propriété aria-selected="false" lorsque le panneau est masqué', function() {
				props.panels.forEach((panel, i) => {
					if (!panel.selected) {
						expect(tabs[i].getAttribute('aria-selected'))
							.to.equal('false');
					}
				});
			});
		});

		describeSome('Test 1.3 : Chaque couple titre/panneau, respecte-t-il une de ces conditions ?', function() {
			it('Le titre possède une propriété aria-controls="[id]" référençant le panneau correspondant', function() {
				props.panels.forEach((panel, i) => {
					expect(tabs[i].getAttribute('aria-controls'))
						.to.equal(tabPanels[i].id);
				});
			});

			it('Le panneau possède une propriété aria-labelledby="[id]" référençant le titre correspondant', function() {
				props.panels.forEach((panel, i) => {
					expect(tabPanels[i].getAttribute('aria-labelledby'))
						.to.equal(tabs[i].id);
				});
			});
		});

		describe('Test 1.4 : Chaque panneau possède-t-il un role="tabpanel" ?', function() {
			it('Test 1.4', function() {
				const node = factory(props);
				const tabPanels = findChildrenByRole(node, 'tabpanel');

				expect(tabPanels.length).to.equal(props.panels.length);
			});
		});
	});

	describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
		describe('Test 2.1 : L\'utilisation de la touche [TAB] respecte-t-elle ces conditions ?', function() {
			it('De l\'extérieur du composant, le focus est donné sur le titre du panneau actif', function() {

			});

			it('La tabulation permet d\'atteindre l\'élément suivant ou précédent du panneau actif', function() {

			});

			it('Lorsque le dernier élément focusable du composant est atteint, le focus est donné sur l\'élément focusable suivant à l\'extérieur du composant', function() {

			});

			it('Lorsque le premier élément focusable du composant est atteint, le focus est donné sur l\'élément focusable précédent à l\'extérieur du composant', function() {

			});
		});

		describe('Test 2.2 :  L\'utilisation des [TOUCHES DE DIRECTION] respecte-t-elle ces conditions ?', function() {
			it('À partir du titre d\'un onglet, [Haut et Gauche] permet d\'atteindre le titre précédent', function() {

			});

			it('À partir du titre d\'un onglet, [Bas et Droite] permet d\'atteindre le titre suivant', function() {

			});
		});

		describe('Test 2.3 :  À partir du titre d’un onglet, si le panneau n’est pas activé par défaut, la touche [ESPACE] permet-elle d’activer le panneau ?', function() {
			it('Test 2.3', function() {

			});
		});

		describe('Test 2.4 :  À partir du titre d’un onglet, si le panneau n’est pas activé par défaut, la touche [ENTER] permet-elle d’activer le panneau ?', function() {
			it('Test 2.4', function() {

			});
		});
	});
};
