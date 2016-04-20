import {findChildByRole, findChildrenByRole} from './dom';



/**
 *
 */
export default function createTabPanelTest(factory) {
	return function testTabPanel() {
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

			it(
				'Test 1.1: Le composant englobant les titres des onglets possède-t-il un role="tablist" ?',
				function() {
					const node = factory(props);
					const tabList = findChildByRole(node, 'tablist');
					const tabs = findChildrenByRole(tabList, 'tab');

					expect(tabs.length).to.equal(props.panels.length);
				}
			);

			it(
				'Test 1.2 : Chaque titre d\'onglet respecte-t-il ces conditions ?'
				+ '\n\t- Le titre possède un role="tab"'
				+ '\n\t- Le titre possède une propriété aria-selected="true" lorsque le panneau est affiché'
				+ '\n\t- Le titre possède une propriété aria-selected="false" lorsque le panneau est masqué',
				function() {
					const node = factory(props);
					const tabList = findChildByRole(node, 'tablist');
					const tabs = findChildrenByRole(tabList, 'tab');
					const tabPanels = findChildrenByRole(node, 'tabpanel');

					props.panels.forEach((panel, i) => {
						const tab = tabs[i];

						expect(tab.getAttribute('aria-selected'))
							.to.equal(panel.selected ? 'true' : 'false');
					});
				}
			);

			it(
				'Test 1.3 : Chaque couple titre/panneau, respecte-t-il une de ces conditions ?'
				+ '\n\t- Le titre possède une propriété aria-controls="[id]" référençant le panneau correspondant'
				+ '\n\t- Le panneau possède une propriété aria-labelledby="[id]" référençant le titre correspondant',
				function() {
					const node = factory(props);
					const tabList = findChildByRole(node, 'tablist');
					const tabs = findChildrenByRole(tabList, 'tab');
					const tabPanels = findChildrenByRole(node, 'tabpanel');

					props.panels.forEach((panel, i) => {
						const tab = tabs[i];
						const tabPanel = tabPanels[i];

						expect(tab.getAttribute('aria-controls'))
							.to.equal(tabPanel.id);

						expect(tabPanel.getAttribute('aria-labelledby'))
							.to.equal(tab.id);
					});
				}
			);

			it(
				'Test 1.4 : Chaque panneau possède-t-il un role="tabpanel" ?',
				function() {
					const node = factory(props);
					const tabPanels = findChildrenByRole(node, 'tabpanel');

					expect(tabPanels.length).to.equal(props.panels.length);
				}
			);
		});
	};
}
