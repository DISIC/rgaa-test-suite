import pending from './pending';
import {press, focus, tab} from './keyboard';



/**
 *
 */
export default function createSliderText(factory) {
	return function testSlider() {
		beforeEach(function() {
			this.props = {
				id: 'clean',
				min: -10,
				max: 10,
				current: 5,
				isVertical: false,
				withLabel: false
			};
			this.node = factory(this.props);
			this.slider = this.node.querySelector('[role="slider"]');
		});


		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			describe('Test 1.1: Le composant respecte-t-il ces conditions ?', function() {
				it('Le composant possède un role="slider".', function() {
					expect(this.slider).to.exist;
				});

				it('Le composant possède une propriété aria-valuenow="[valeur courante]".', function() {
					expect(this.slider.getAttribute('aria-valuenow')).to.equal(`${this.props.current}`);
				});

				it('Le composant possède une propriété aria-valuemax="[valeur maximale]".', function() {
					expect(this.slider.getAttribute('aria-valuemax')).to.equal(`${this.props.max}`);
				});

				it('Le composant possède une propriété aria-valuemin="[valeur minimum]".', function() {
					expect(this.slider.getAttribute('aria-valuemin')).to.equal(`${this.props.min}`);
				});

				it('Le composant possède, si nécessaire, une propriété aria-valuetext="[valeur courante + text]".', function() {
					before(function() {
						this.labelledNode = factory({
							...this.props,
							id: 'withLabel',
							withLabel: true
						});
					});
					const slider = this.labelledNode.querySelector('[role="slider"]');
					expect(slider.getAttribute('aria-valuetext')).to.be.ok;
					after(function() {
						this.labelledNode.remove();
					});
				});

				it('Lorsque le composant est déplacé, la propriété aria-valuenow est mise à jour.', function() {
					return pending(this, 'À tester manuellement avec la souris.');
				});

				it('Lorsque le composant est déplacé, la propriété aria-valuetext est mise à jour.', function() {
					return pending(this, 'À tester manuellement avec la souris.');
				});

				it('Lorsque le composant est présenté verticalement, il doit posséder une propriété'
					+ ' aria-orientation="vertical", cette règle est-elle respectée ?', function() {
					before(function() {
						this.verticalNode = factory({
							...this.props,
							id: 'vertical',
							isVertical: true
						});
					});
					const slider = this.verticalNode.querySelector('[role="slider"]');
					expect(slider.getAttribute('aria-orientation')).to.equal('vertical');
					after(function() {
						this.verticalNode.remove();
					});
				});
			});

			describe('Test 1.2: Le composant respecte-t-il une de ces conditions ?', function() {
				it('Le composant possède une propriété aria-labelledby="[ID_titre]"'
					+ ' référençant un passage de texte faisant office de titre.', function() {
					expect(this.slider.getAttribute('aria-labelledby')).to.be.ok;
				});

				it('Le composant possède un attribut title faisant office de titre.', function() {
					expect(this.slider.getAttribute('title')).to.be.ok;
				});
			});
		});

		describe('Critère 2 : Les interactions au clavier sont-elles conformes ?', function() {
			describe('Test 2.1 : L\'utilisation de la touche [TAB] respecte-t-elle ces conditions ?', function() {
				beforeEach(function() {
					this.dummyInput = $('<input type="text" class="slider-dummy" name="dummy" />').appendTo('body').get(0);
				});

				it('De l\'extérieur du composant, le focus est donné sur le composant.', function() {
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.slider);
				});

				it('Depuis le composant, le focus est donné sur l\'élément focusable suivant à l\'extérieur du composant.', function() {
					effroi.keyboard.focus(this.slider);
					effroi.keyboard.tab();
					expect(document.activeElement).to.equal(this.dummyInput);
				});

				afterEach(function() {
					$('.slider-dummy').remove();
				});
			});

			describe('Test 2.2 :  L\'utilisation des [TOUCHES DE DIRECTION] respecte-t-elle ces conditions ?', function() {
				beforeEach(function() {
					effroi.keyboard.focus(this.slider);
					this.initialValue = this.slider.getAttribute('aria-valuenow');
				});

				it('[Haut] permet d\'augmenter la valeur du slider.', function() {
					effroi.keyboard.hit('Up');
					expect(this.slider.getAttribute('aria-valuenow')).to.not.be.equal(this.initialValue);
				});

				it('[Droit] permet d\'augmenter la valeur du slider.', function() {
					effroi.keyboard.hit('Right');
					expect(this.slider.getAttribute('aria-valuenow')).to.not.be.equal(this.initialValue);
				});

				it('[Bas] permet de diminuer la valeur du slider.', function() {
					effroi.keyboard.hit('Down');
					expect(this.slider.getAttribute('aria-valuenow')).to.not.be.equal(this.initialValue);
				});

				it('[Gauche] permet de diminuer la valeur du slider.', function() {
					effroi.keyboard.hit('Left');
					expect(this.slider.getAttribute('aria-valuenow')).to.not.be.equal(this.initialValue);
				});
			});
		});

		afterEach(function() {
			this.node.remove();
		})
	};
}
