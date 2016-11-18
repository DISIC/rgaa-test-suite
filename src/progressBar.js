import {random} from 'lodash';
import {findChildByRole} from './dom';
import pending from './pending';
import describeSome from './describeSome';



/**
 *
 */
const defaultMakeLabel = ({value}) => `${value}%`;



/**
 *	Returns a function that tests a progress bar component.
 *
 *	@param function factory A factory function that takes
 *		a map of options and returns a DOM node containing a
 *		progress bar.
 */
export default (factory, makeLabel = defaultMakeLabel) => () =>
	describe('Motif de conception ARIA Progressbar', function() {
		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			describe('Test 1.1 : Le composant respecte-t-il ces conditions ?', function() {
				before(function() {
					this.props = {
						min: random(0, 30),
						max: random(70, 100),
						value: random(30, 70)
					};

					this.node = factory(this.props);
					this.progressBar = findChildByRole(this.node, 'progressbar');
				});

				it('Le composant possède un role="progressbar".', function() {
					expect(this.progressBar.getAttribute('role'))
						.to.be.ok;
				});

				it('Le composant possède une propriété aria-valuemin="[valeur minimale]".', function() {
					expect(Number(this.progressBar.getAttribute('aria-valuemin')))
						.to.equal(this.props.min);
				});

				it('Le composant possède une propriété aria-valuemax="[valeur maximale]".', function() {
					expect(Number(this.progressBar.getAttribute('aria-valuemax')))
						.to.equal(this.props.max);
				});
			});

			describeSome('Test 1.2 : Le composant respecte-t-il une de ces conditions ?', function() {
				before(function() {
					this.props = {
						min: random(0, 30),
						max: random(70, 100),
						value: random(30, 70)
					};

					this.node = factory(this.props);
					this.progressBar = findChildByRole(this.node, 'progressbar');
				});

				it('Le composant est constitué d\'une image qui possède un attribut alt pertinent.', function() {
					expect(this.progressBar.getAttribute('title'))
						.to.not.be.empty;
				});

				it('Le composant possède une propriété aria-labelledby="[ID_texte]" référençant un passage de texte faisant office de nom.', function() {
					expect(this.progressBar.getAttribute('aria-labelledby'))
						.to.not.be.empty;
				});

				it('Le composant possède un attribut title faisant office de nom.', function() {
					expect(this.progressBar.querySelector('img[alt]'))
						.to.not.be.empty;
				});
			});

			describe('Test 1.3 : Chaque progression, dont la valeur courante est connue respecte-t-elle ces conditions ?', function() {
				before(function() {
					this.props = {
						min: random(0, 30),
						max: random(70, 100),
						value: random(30, 70)
					};

					this.node = factory(this.props);
					this.progressBar = findChildByRole(this.node, 'progressbar');
				});

				it('Le composant possède une propriété aria-valuenow="[valeur courante]".', function() {
					expect(Number(this.progressBar.getAttribute('aria-valuenow')))
						.to.equal(this.props.value);
				});

				it('Le composant possède, si nécessaire, une propriété aria-valuetext="[valeur courante + texte]".', function() {
					expect(this.progressBar.getAttribute('aria-valuetext'))
						.to.equal(makeLabel(this.props));
				});

				it('La valeur de la propriété aria-valuenow est mise à jour selon la progression.', function() {
					return pending(this, '  Test à implémenter.');
				});

				it('La valeur de la propriété aria-valuetext est mise à jour selon la progression.', function() {
					return pending(this, '  Test à implémenter.');
				});
			});

			describe('Test 1.4 : Chaque progression, dont la valeur courante est inconnue respecte-t-elle ces conditions ?', function() {
				before(function() {
					this.props = {
						min: random(0, 30),
						max: random(70, 100),
						value: undefined
					};

					this.node = factory(this.props);
					this.progressBar = findChildByRole(this.node, 'progressbar');
				});

				it('Le composant ne possède pas de propriété aria-valuenow.', function() {
					expect(this.progressBar.getAttribute('aria-valuenow'))
						.to.not.be.ok;
				});

				it('Le composant ne possède pas de propriété aria-valuetext.', function() {
					expect(this.progressBar.getAttribute('aria-valuetext'))
						.to.not.be.ok;
				});
			});

			describe('Test 1.5 : Chaque progression qui concerne une région spécifique d\'un document respecte-t-elle ces conditions ?', function() {
				it('La région concernée possède une propriété aria-describedby="[ID_composant]".', function() {
					return pending(this, '  Non testable automatiquement.');
				});
				it('La région concernée possède une propriété aria-busy="true" durant toute la durée de la progression.', function() {
					return pending(this, '  Non testable automatiquement.');
				});
			});
		});
	});
