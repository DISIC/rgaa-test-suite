import {findChildByRole, findChildrenByRole} from './dom';
import describeSome from './describeSome';



/**
 *
 */
const isPanelActive = (panel) =>
	panel && $(panel).is(':visible');

/**
 *
 */
export default (factory) => () =>
	describe('Motif de conception ARIA Tabpanel', function() {
		beforeEach(function() {
			this.props = {
				panels: [
					{
						title: 'Header 1',
						content: 'Content 1',
						selected: false
					},
					{
						title: 'Header 2',
						content: `
							Content 2
							<button id="button1">Button 1</button>
							<button id="button2">Button 2</button>
						`,
						selected: true
					},
					{
						title: 'Header 3',
						content: 'Content 3',
						selected: false
					}
				]
			};

			this.node = factory(this.props);
			this.tabList = findChildByRole(this.node, 'tablist');
			this.tabs = findChildrenByRole(this.tabList, 'tab');
			this.panels = findChildrenByRole(this.node, 'tabpanel');
			this.selectedTab = this.tabs[1];
			this.selectedPanel = this.panels[1];
			this.button1 = document.getElementById('button1');
			this.button2 = document.getElementById('button2');

			this.focusableBefore = document.createElement('button');
			this.focusableAfter = document.createElement('button');

			this.wrapper = document.createElement('div');
			this.wrapper.appendChild(this.focusableBefore);
			this.wrapper.appendChild(this.node);
			this.wrapper.appendChild(this.focusableAfter);

			document.body.appendChild(this.wrapper);

			effroi.keyboard.focus(this.focusableBefore);
		});

		afterEach(function() {
			document.body.removeChild(this.wrapper);
		});

		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			describe('Test 1.1: Le composant englobant les titres des onglets possède-t-il un role="tablist" ?', function() {
				it('Cette condition est respectée.', function() {
					expect(this.tabs.length)
						.to.equal(this.props.panels.length);
				});
			});

			describe('Test 1.2 : Chaque titre d\'onglet respecte-t-il ces conditions ?', function() {
				it('Le titre possède un role="tab".', function() {
					this.props.panels.forEach((panel, i) => {
						expect(this.tabs[i].getAttribute('role'))
							.to.equal('tab');
					});
				});

				it('Le titre possède une propriété aria-selected="true" lorsque le panneau est affiché.', function() {
					this.props.panels.forEach((panel, i) => {
						if (panel.selected) {
							expect(this.tabs[i].getAttribute('aria-selected'))
								.to.equal('true');
						}
					});
				});

				it('Le titre possède une propriété aria-selected="false" lorsque le panneau est masqué.', function() {
					this.props.panels.forEach((panel, i) => {
						if (!panel.selected) {
							expect(this.tabs[i].getAttribute('aria-selected'))
								.to.equal('false');
						}
					});
				});
			});

			describeSome('Test 1.3 : Chaque couple titre/panneau, respecte-t-il une de ces conditions ?', function() {
				it('Le titre possède une propriété aria-controls="[id]" référençant le panneau correspondant.', function() {
					this.props.panels.forEach((panel, i) => {
						expect(this.tabs[i].getAttribute('aria-controls'))
							.to.equal(this.panels[i].id);
					});
				});

				it('Le panneau possède une propriété aria-labelledby="[id]" référençant le titre correspondant.', function() {
					this.props.panels.forEach((panel, i) => {
						expect(this.panels[i].getAttribute('aria-labelledby'))
							.to.equal(this.tabs[i].id);
					});
				});
			});

			describe('Test 1.4 : Chaque panneau possède-t-il un role="tabpanel" ?', function() {
				it('Cette condition est respectée.', function() {
					expect(this.panels.length)
						.to.equal(this.props.panels.length);
				});
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : L\'utilisation de la touche [TAB] respecte-t-elle ces conditions ?', function() {
				it('De l\'extérieur du composant, le focus est donné sur le titre du panneau actif.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement)
						.to.equal(this.selectedTab);
				});

				it('La tabulation permet d\'atteindre l\'élément suivant ou précédent du panneau actif.', function() {
					effroi.keyboard.focus(this.selectedTab);

					effroi.keyboard.tab();
					expect(document.activeElement)
						.to.equal(this.button1);

					effroi.keyboard.tab();
					expect(document.activeElement)
						.to.equal(this.button2);

					effroi.keyboard.shiftTab();
					expect(document.activeElement)
						.to.equal(this.button1);
				});

				it('Lorsque le dernier élément focusable du composant est atteint, le focus est donné sur l\'élément focusable suivant à l\'extérieur du composant.', function() {
					effroi.keyboard.focus(this.button2);

					effroi.keyboard.tab();
					expect(document.activeElement)
						.to.equal(this.focusableAfter);
				});

				it('Lorsque le premier élément focusable du composant est atteint, le focus est donné sur l\'élément focusable précédent à l\'extérieur du composant.', function() {
					effroi.keyboard.focus(this.selectedTab);

					effroi.keyboard.shiftTab();
					expect(document.activeElement)
						.to.equal(this.focusableBefore);
				});
			});

			describe('Test 2.2 : L\'utilisation des [TOUCHES DE DIRECTION] respecte-t-elle ces conditions ?', function() {
				it('À partir du titre d\'un onglet, [Haut et Gauche] permet d\'atteindre le titre précédent.', function() {
					effroi.keyboard.focus(this.selectedTab);

					effroi.keyboard.hit('Up');
					expect(document.activeElement)
						.to.equal(this.tabs[0]);

					effroi.keyboard.hit('Left');
					expect(document.activeElement)
						.to.equal(this.tabs[2]);
				});

				it('À partir du titre d\'un onglet, [Bas et Droite] permet d\'atteindre le titre suivant.', function() {
					effroi.keyboard.focus(this.selectedTab);

					effroi.keyboard.hit('Down');
					expect(document.activeElement)
						.to.equal(this.tabs[2]);

					effroi.keyboard.hit('Right');
					expect(document.activeElement)
						.to.equal(this.tabs[0]);
				});
			});

			describe('Test 2.3 : À partir du titre d’un onglet, si le panneau n’est pas activé par défaut, la touche [ESPACE] permet-elle d’activer le panneau ?', function() {
				it('Cette condition est respectée.', function() {
					effroi.keyboard.focus(this.selectedTab);
					effroi.keyboard.hit('Down');
					effroi.keyboard.hit('Spacebar');

					expect(this.tabs[2])
						.to.satisfy(isPanelActive);
				});
			});

			describe('Test 2.4 : À partir du titre d’un onglet, si le panneau n’est pas activé par défaut, la touche [ENTER] permet-elle d’activer le panneau ?', function() {
				it('Cette condition est respectée.', function() {
					effroi.keyboard.focus(this.selectedTab);
					effroi.keyboard.hit('Down');
					effroi.keyboard.hit('Enter');

					expect(this.tabs[2])
						.to.satisfy(isPanelActive);
				});
			});
		});
	});
