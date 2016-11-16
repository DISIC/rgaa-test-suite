import {findChildByRole, findChildrenByRole} from './dom';
import describeSome from './describeSome';
import cleanDom from './cleanDom';



/**
 *
 */
const defaultMakeLabel = ({value}) => `${value}%`;



/**
 *	Returns a function that tests an accordion component.
 *
 *	@param function factory A factory function that takes
 *		a map of options and returns a DOM node containing an
 *		accordion.
 */
export default function createAccordionTest(factory, makeLabel = defaultMakeLabel) {
	return function testAccordion() {
		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			describeSome('Test 1.1 : Le composant respecte-t-il ces conditions ?', function() {
				before(function() {
					this.props = {
						panels: [
							{
								title: 'Header 1',
								content: 'Content 1',
								selected: false
							},
							{
								title: 'Header 2',
								content: 'Content 2',
								selected: false
							},
							{
								title: 'Header 3',
								content: 'Content 3',
								selected: false
							}
						]
					};
					this.node = factory(this.props);
					this.accordion = findChildByRole(this.node, 'tablist');
				});

				it('Le composant possède un role="tablist"', function() {
					expect(this.accordion).to.be.ok;
				});

				it('Le composant possède la propriété aria-multiselectable="true"', function() {
					expect(this.accordion.getAttribute('aria-multiselectable')).to.equal('true');
				});
			});

			describe('Test 1.2 : Chaque titre respecte-t-il ces conditions ?', function() {
				before(function() {
					this.props = {
						panels: [
							{
								title: 'Header 1',
								content: 'Content 1',
								selected: false
							},
							{
								title: 'Header 2',
								content: 'Content 2',
								selected: false
							},
							{
								title: 'Header 3',
								content: 'Content 3',
								selected: false
							}
						]
					};
					this.node = factory(this.props);
					this.accordion = findChildByRole(this.node, 'tablist');
					this.titles = findChildrenByRole(this.node, 'tab');
				});


				it('Le titre possède un role="tab"', function() {
					expect(this.titles.length).to.equal(this.props.panels.length);
				});

				it('Le titre possède la propriété aria-selected="true" lorsque le panneau est affiché'
					+ '\n\t  Le titre possède la propriété aria-selected="false" lorsque le panneau est masqué',
					function() {
						this.props.panels.forEach((panel, i) => {
							const title = this.titles[i];
							expect(title.getAttribute('aria-selected'))
								.to.equal(panel.selected ? 'true' : 'false');
						});
					}
				);
			});

			describe('Test 1.3 : Chaque panneau respecte-t-il ces conditions ?', function() {
				before(function() {
					this.props = {
						panels: [
							{
								title: 'Header 1',
								content: 'Content 1',
								selected: false
							},
							{
								title: 'Header 2',
								content: 'Content 2',
								selected: false
							},
							{
								title: 'Header 3',
								content: 'Content 3',
								selected: false
							}
						]
					};
					this.node = factory(this.props);
					this.accordion = findChildByRole(this.node, 'tablist');
					this.titles = findChildrenByRole(this.node, 'tab');
					this.tabPanels = findChildrenByRole(this.accordion, 'tabpanel');
				});

				after(function() {
					cleanDom();
				});

				it('Le panneau possède un role="tabpanel"', function() {
					expect(this.tabPanels.length).to.equal(this.props.panels.length);
				});

				it('Le panneau possède la propriété aria-labelledby="[ID_header]"', function() {
					this.props.panels.forEach((panel, i) => {
						const tabPanel = this.tabPanels[i];
						const title = this.titles[i];
						expect(tabPanel.getAttribute('aria-labelledby')).to.equal(title.id);
					});
				});

				it('Le panneau possède la propriété aria-expanded="true" lorsque le panneau est affiché'
					+ '\n\t  Le panneau possède la propriété aria-expanded="false" lorsque le panneau est masqué',
					function() {
						this.props.panels.forEach((panel, i) => {
							const tabPanel = this.tabPanels[i];
							expect(tabPanel.getAttribute('aria-expanded'))
								.to.equal(panel.selected ? 'true' : 'false');
						});
					}
				);

				it('Le panneau possède la propriété aria-hidden="false" lorsque le panneau est affiché'
					+ '\n\t  Le panneau possède la propriété aria-expanded="true" lorsque le panneau est masqué',
					function() {
						this.props.panels.forEach((panel, i) => {
							const tabPanel = this.tabPanels[i];
							expect(tabPanel.getAttribute('aria-hidden'))
								.to.equal(panel.selected ? 'false' : 'true');
						});
					}
				);
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : L\'utilisation de la touche [TAB] respecte-t-elle ces conditions ?', function() {
				afterEach(function() {
					cleanDom();
				});

				it('De l\'extérieur du composant, lorsque aucun panneau n\'est actif, le focus est donné sur le titre'
					+ ' du premier panneau [TAB]', function() {
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
									selected: false
								},
								{
									title: 'Header 3',
									content: 'Content 3',
									selected: false
								}
							]
						};
						const node = factory(props);
						const titles = findChildrenByRole(node, 'tab');
						effroi.keyboard.tab();
						expect(document.activeElement).to.equal(titles[0]);
				});

				it('De l\'extérieur du composant, lorsque aucun panneau n\'est actif, le focus est donné sur le titre'
					+ ' du dernier panneau [SHIFT TAB].', function() {
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
									selected: false
								},
								{
									title: 'Header 3',
									content: 'Content 3',
									selected: false
								}
							]
						};
						const node = factory(props);
						const input = document.createElement('input');
						input.setAttribute('type', 'text');
						node.appendChild(input);
						const titles = findChildrenByRole(node, 'tab');

						effroi.keyboard.focus(input);
						effroi.keyboard.shiftTab();
						expect(document.activeElement).to.equal(titles[2]);
				});

				it('De l\'extérieur du composant, lorsqu\'un panneau est actif, le focus est donné sur le titre du premier panneau actif.',
					function() {
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
						const titles = findChildrenByRole(node, 'tab');

						effroi.keyboard.tab();
						expect(document.activeElement).to.equal(titles[1]);
					}
				);

				it('La tabulation permet d\'atteindre l\'élément suivant ou précédent du panneau actif ou des panneaux actifs lorsque plusieurs panneaux sont activés',
					function() {
						const props = {
							panels: [
								{
									title: 'Header 1',
									content: 'Content 1',
									selected: true
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
						const accordion = findChildByRole(node, 'tablist');
						const tabPanels = findChildrenByRole(accordion, 'tabpanel');

						const input = document.createElement('input');
						input.setAttribute('type', 'text');

						tabPanels[0].appendChild(input.cloneNode(true));
						tabPanels[0].appendChild(input.cloneNode(true));
						tabPanels[1].appendChild(input.cloneNode(true));

						const firstTabPanelChildren = tabPanels[0].querySelectorAll('input[type="text"]');
						const secondTabPanelChildren = tabPanels[1].querySelectorAll('input[type=text]');

						effroi.keyboard.focus(firstTabPanelChildren[0]);
						effroi.keyboard.tab();
						expect(document.activeElement).to.equal(firstTabPanelChildren[1]);

						effroi.keyboard.tab();
						expect(document.activeElement).to.equal(secondTabPanelChildren[0]);
					}
				);

				it('Lorsque le dernier élément focusable du composant est atteint, le focus est donné sur l\'élément focusable suivant à l\'extérieur du composant',
					function() {
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
									selected: false
								},
								{
									title: 'Header 3',
									content: 'Content 3',
									selected: true
								}
							]
						};
						const node = factory(props);
						const input = document.createElement('input');
						input.setAttribute('type', 'text');
						node.appendChild(input);
						const accordion = findChildByRole(node, 'tablist');

						const tabPanels = findChildrenByRole(accordion, 'tabpanel');
						tabPanels[2].appendChild(input.cloneNode(true));
						const tabPanelChildren = tabPanels[2].querySelectorAll('input[type="text"]');

						effroi.keyboard.focus(tabPanelChildren[0]);
						effroi.keyboard.tab();

						expect(document.activeElement).to.equal(input);

					}
				);

				it('Lorsque le premier élément focusable du composant est atteint, le focus est donné sur l\'élément focusable précédent à l\'extérieur du composant [SHIFT TAB]',
					function() {
						const props = {
							panels: [
								{
									title: 'Header 1',
									content: 'Content 1',
									selected: true
								},
								{
									title: 'Header 2',
									content: 'Content 2',
									selected: false
								},
								{
									title: 'Header 3',
									content: 'Content 3',
									selected: false
								}
							]
						};
						const node = factory(props);
						const input = document.createElement('input');
						input.setAttribute('type', 'text');
						node.insertBefore(input, node.firstChild);
						const titles = findChildrenByRole(node, 'tab');
						effroi.keyboard.focus(titles[0]);
						effroi.keyboard.shiftTab();

						expect(document.activeElement).to.equal(input);
					}
				);
			});

			describe('Test 2.2 :  L\'utilisation des [TOUCHES DE DIRECTION] respecte-t-elle ces conditions ?', function() {
				before(function() {
					this.props = {
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
					this.node = factory(this.props);
					this.accordion = findChildByRole(this.node, 'tablist');
					this.titles = findChildrenByRole(this.node, 'tab');
				});

				after(function() {
					cleanDom();
				});

				it('À partir du titre d\'un accordéon, [Haut et Gauche] permet d\'atteindre le titre précédent.', function() {

					// Focus on second panel
					this.titles[1].focus();
					effroi.keyboard.hit('Up');

					expect(document.activeElement).to.equal(this.titles[0]);

					// Focus on second panel
					this.titles[1].focus();
					effroi.keyboard.hit('Left');

					expect(document.activeElement).to.equal(this.titles[0]);
				});

				it('À partir du titre d\'un accordéon, [Bas et Droite] permet d\'atteindre le titre suivant', function() {

					// Focus on second panel
					this.titles[1].focus();
					effroi.keyboard.hit('Down');

					expect(document.activeElement).to.equal(this.titles[2]);

					// Focus on second panel
					this.titles[1].focus();
					effroi.keyboard.hit('Right');

					expect(document.activeElement).to.equal(this.titles[2]);
				});
			});

			describe('Test 2.3 :  L\'utilisation des touches [Entrée et Espace] respecte-t-elle ces conditions ?', function() {
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
								content: 'Content 2',
								selected: false
							},
							{
								title: 'Header 3',
								content: 'Content 3',
								selected: false
							}
						]
					};
					this.node = factory(this.props);
					this.accordion = findChildByRole(this.node, 'tablist');
					this.titles = findChildrenByRole(this.node, 'tab');
					this.tabPanels = findChildrenByRole(this.accordion, 'tabpanel');
				});

				afterEach(function() {
					cleanDom();
				});

				it('Lorsque le focus est sur le titre d\'un panneau fermé, [Espace] permet d\'ouvrir le panneau', function() {
					// Focus on first panel
					this.titles[0].focus();
					effroi.keyboard.hit('Spacebar');

					expect(this.tabPanels[0].getAttribute('aria-expanded'))
						.to.equal('true');
					expect(this.tabPanels[0].getAttribute('aria-hidden'))
						.to.equal('false');
				});

				it('Lorsque le focus est sur le titre d\'un panneau fermé, [Entrée] permet d\'ouvrir le panneau', function() {
					// Focus on first panel
					this.titles[0].focus();
					effroi.keyboard.hit('Enter');

					expect(this.tabPanels[0].getAttribute('aria-expanded'))
						.to.equal('true');
					expect(this.tabPanels[0].getAttribute('aria-hidden'))
						.to.equal('false');
				});

			});
		});
	};
}
