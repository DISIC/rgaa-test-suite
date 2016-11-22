import {expect} from 'chai';
import tabbable from 'tabbable';
import effroi from 'effroi';



/**
 *
 */
const findTooltip = (trigger) =>
	document.getElementById(
		trigger.getAttribute('aria-describedby')
	);

/**
 *
 */
const isTooltipActive = (tooltip) =>
	tooltip && $(tooltip).is(':visible');

/**
 *
 */
export default (factory) => () =>
	describe('Motif de conception ARIA Tooltip', function() {
		beforeEach(function() {
			this.props = {
				text: 'Tooltip'
			};

			this.node = factory(this.props);
			this.otherFocusable = document.createElement('button');

			this.wrapper = document.createElement('div');
			this.wrapper.appendChild(this.node);
			this.wrapper.appendChild(this.otherFocusable);

			// The node needs to be mounted to the DOM as soon
			// as possible, to handle the case when the tooltip
			// does not renders besides it.
			document.body.appendChild(this.wrapper);

			const tabbableChildren = tabbable(this.wrapper);

			if (tabbableChildren.length === 0) {
				throw new Error(
					'There should be a focusable trigger element '
					+ 'that the test suite can focus to activate '
					+ 'its associated tooltip.'
				);
			}

			this.trigger = tabbableChildren[0];

			// Should render the tooltip.
			effroi.keyboard.focus(this.trigger);
		});

		afterEach(function() {
			document.body.removeChild(this.wrapper);
		});

		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			it('Précondition : Lorsque l\'élément déclenchant prend le focus, le tooltip est activé.', function() {
				effroi.keyboard.focus(this.trigger);

				expect(findTooltip(this.trigger))
					.to.satisfy(isTooltipActive);
			});

			it('Test 1.1 : Le composant possède-t-il un role="tooltip" ?', function() {
				effroi.keyboard.focus(this.trigger);

				expect(findTooltip(this.trigger).getAttribute('role'))
					.to.equal('tooltip');
			});

			it('Test 1.2 : L\'élément déclenchant possède-t-il la propriété aria-describedby="[ID_tooltip]" ?', function() {
				effroi.keyboard.focus(this.trigger);

				expect(this.trigger.getAttribute('aria-describedby'))
					.to.be.ok;
			});

			it('Test 1.3 : Lorsque l\'élément déclenchant perd le focus, le tooltip est désactivé, cette règle est-elle respectée ?', function() {
				effroi.keyboard.focus(this.trigger);
				effroi.keyboard.tab();

				expect(findTooltip(this.trigger))
					.to.not.satisfy(isTooltipActive);
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			it('Test 2.1 : L\'utilisation de la touche [ESC] permet de désactiver le tooltip, cette règle est-elle respectée ?', function() {
				effroi.keyboard.focus(this.trigger);
				effroi.keyboard.hit('Esc');

				expect(findTooltip(this.trigger))
					.to.not.satisfy(isTooltipActive);
			});
		});
	});
