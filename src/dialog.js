import describeSome from './describeSome';
import {focusableElements, press, focus, tab, shiftTab} from './keyboard';


const isDialogOpened = (dialog) =>
	dialog && $(dialog).is(':visible');

/**
 *
 */
export default function createDialogTest(factory) {
	return function testDialog() {
		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			const props = {
				id: 'dialog-role',
				title: 'Header',
				content: 'This the content of my dialog'
			};
			const {open, close} = factory(props);
			const dialog = document.body.querySelector('[role="dialog"]');
			const alertDialog = document.body.querySelector('[role="alertdialog"]');
			const container = dialog || alertDialog;

			let focusables = focusableElements();
			if (!focusables.length) {
				// Add an input in dialog if there is no focusable element already there
				const input = document.createElement('input');
				input.setAttribute('type', 'text');
				container.appendChild(input);
				focusables = focusableElements();
			}
			const beforeOpenFocusedElement = document.activeElement;

			describeSome('Test 1.1: Le composant respecte-t-il une de ces conditions ?', function() {
				it('Le composant possède un role="dialog"', function() {
					expect(dialog).to.exist;
				});

				it('Le composant possède un role="alertdialog"', function() {
					expect(alertDialog).to.exist;
				});
			});

			describeSome('Test 1.2 : Le composant respecte-t-il une de ces conditions ?', function() {
				it('Le composant possède une propriété aria-label="[Titre de la fenêtre]"', function() {
					expect(container.getAttribute('aria-label')).to.exist;
				});

				it('Le composant possède une propriété aria-labelledby="[ID_titre]" référençant un passage de texte faisant office de titre',
					function() {
						expect(container.getAttribute('aria-labelledby')).to.exist;
					}
				);
			});

			describe('Test 1.3 : À l\'ouverture de la fenêtre, le focus est donné sur le premier élément focusable ?',
				function() {
					it('Cette règle est-elle respectée ?', function() {
						open();
						expect(focusables[0]).to.equal(document.activeElement);
					});
				}
			);

			describe('Test 1.4 : À la fermeture de la fenêtre, le focus est donné sur l\'élément ayant permis d\'ouvrir la fenêtre, cette règle est-elle respectée ?',
				function() {
					it('Cette règle est-elle respectée ?', function() {
						close();
						expect(beforeOpenFocusedElement).to.equal(document.activeElement);
					});
				}
			);
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			before(function() {
				const cleanProps = {
					id: 'dialog-tab',
					title: 'Header',
					content: 'This the content of my dialog'
				};
				const result = factory(cleanProps);
				this.open = result.open;

				const cleanDialog = document.body.querySelector('[role="dialog"]');
				const cleanAlertDialog = document.body.querySelector('[role="alertdialog"]');
				this.cleanContainer = cleanDialog || cleanAlertDialog;

				// Add at least two inputs in dialog to navigate between them
				const cleanInput = document.createElement('input');
				cleanInput.setAttribute('type', 'text');
				this.cleanContainer.appendChild(cleanInput.cloneNode(true));
				this.cleanContainer.appendChild(cleanInput.cloneNode(true));

				this.cleanFocusables = focusableElements();
			});

			describe('Test 2.1 : L\'utilisation de la touche [TAB] respecte-elle ces conditions ?', function() {

				it('La tabulation permet d\'atteindre l\'élément suivant et précédent du composant', function() {
					this.open();
					tab();
					expect(this.cleanFocusables[1]).to.equal(document.activeElement);
					shiftTab();
					expect(this.cleanFocusables[0]).to.equal(document.activeElement);
				});

				it('La tabulation est restreinte aux éléments focusables du composant', function() {
					const lastIndex = this.cleanFocusables.length - 1;

					focus(this.cleanFocusables[0]);
					shiftTab();
					expect(this.cleanFocusables[lastIndex]).to.equal(document.activeElement);

					focus(this.cleanFocusables[lastIndex]);
					tab();
					expect(this.cleanFocusables[0]).to.equal(document.activeElement);
				});
			});

			describe('Test 2.2 :  L\'utilisation de la touche [ESC] permet-t-elle de fermer la fenêtre ?', function() {
				it('Cette règle est-elle respectée ?', function() {
					// Not working
					// press('esc');
					effroi.keyboard.hit('Esc');

					expect(this.cleanContainer).to.not.satisfy(isDialogOpened);
				});
			});
		});
	};
}
