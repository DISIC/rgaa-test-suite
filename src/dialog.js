import tabbable from 'tabbable';
import cleanDom from './cleanDom';
import describeSome from './describeSome';
import {focus, tab, shiftTab} from './keyboard';


const isDialogOpened = (dialog) =>
	dialog && $(dialog).is(':visible');

/**
 *
 */
export default function createDialogTest(factory) {
	return function testDialog() {
		beforeEach(function() {
			const props = {
				title: 'Header',
				content: `
					<p>This the content of my dialog.</p>
					<button id="button1">Button 1</button>
					<button id="button2">Button 2</button>
				`
			};

			const result = factory(props);

			this.open = result.open;
			this.close = result.close;

			this.beforeOpenFocusedElement = document.activeElement;
			this.open();

			this.dialog = document.body.querySelector('[role="dialog"]');
			this.alertDialog = document.body.querySelector('[role="alertdialog"]');
			this.container = this.dialog || this.alertDialog;
			this.focusables = tabbable(this.container);
		});

		afterEach(function() {
			cleanDom();
		});

		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			describeSome('Test 1.1: Le composant respecte-t-il une de ces conditions ?', function() {
				it('Le composant possède un role="dialog"', function() {
					expect(this.dialog).to.exist;
				});

				it('Le composant possède un role="alertdialog"', function() {
					expect(this.alertDialog).to.exist;
				});
			});

			describeSome('Test 1.2 : Le composant respecte-t-il une de ces conditions ?', function() {
				it('Le composant possède une propriété aria-label="[Titre de la fenêtre]"', function() {
					expect(this.container.getAttribute('aria-label')).to.exist;
				});

				it('Le composant possède une propriété aria-labelledby="[ID_titre]" référençant un passage de texte faisant office de titre', function() {
					expect(this.container.getAttribute('aria-labelledby')).to.exist;
				});
			});

			describe('Test 1.3 : À l\'ouverture de la fenêtre, le focus est donné sur le premier élément focusable ?', function() {
				it('Cette règle est-elle respectée ?', function() {
					expect(document.activeElement)
						.to.equal(this.focusables[0]);
				});
			});

			describe('Test 1.4 : À la fermeture de la fenêtre, le focus est donné sur l\'élément ayant permis d\'ouvrir la fenêtre, cette règle est-elle respectée ?', function() {
				it('Cette règle est-elle respectée ?', function() {
					this.close();
					expect(document.activeElement)
						.to.equal(this.beforeOpenFocusedElement);
				});
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : L\'utilisation de la touche [TAB] respecte-elle ces conditions ?', function() {
				it('La tabulation permet d\'atteindre l\'élément suivant et précédent du composant', function() {
					effroi.keyboard.focus(this.focusables[0]);

					effroi.keyboard.tab();
					expect(document.activeElement)
						.to.equal(this.focusables[1]);

					effroi.keyboard.shiftTab();
					expect(document.activeElement)
						.to.equal(this.focusables[0]);
				});

				it('La tabulation est restreinte aux éléments focusables du composant', function() {
					effroi.keyboard.focus(this.focusables[0]);

					effroi.keyboard.shiftTab();
					expect(document.activeElement)
						.to.equal(this.focusables[this.focusables.length - 1]);

					effroi.keyboard.tab();
					expect(document.activeElement)
						.to.equal(this.focusables[0]);
				});
			});

			describe('Test 2.2 :  L\'utilisation de la touche [ESC] permet-t-elle de fermer la fenêtre ?', function() {
				it('Cette règle est-elle respectée ?', function() {
					effroi.keyboard.hit('Esc');

					expect(this.cleanContainer)
						.to.not.satisfy(isDialogOpened);
				});
			});
		});
	};
}
