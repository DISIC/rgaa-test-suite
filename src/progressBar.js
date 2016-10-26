import {findChildByRole} from './dom';



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
	describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
		it(
`Test 1.1 : Le composant respecte-t-il ces conditions ?'
	- Le composant possède un role="progressbar"
	- Le composant possède une propriété aria-valuemin="[valeur minimale]"
	- Le composant possède une propriété aria-valuemax="[valeur maximale]"`,
			function() {
				const props = {
					min: 10,
					max: 90,
					value: 50
				};

				const node = factory(props);
				const progressBar = findChildByRole(node, 'progressbar');

				expect(progressBar.getAttribute('aria-valuemin')).to.equal('10');
				expect(progressBar.getAttribute('aria-valuemax')).to.equal('90');
			}
		);

		it(
`Test 1.2 : Le composant respecte-t-il une de ces conditions ?
	- Le composant est constitué d'une image qui possède un attribut alt pertinent.
	- Le composant possède une propriété aria-labelledby="[id]" référençant un passage de texte faisant office de nom
	- Le composant possède un attribut title faisant office de nom`,
			function() {
				const props = {
					min: 10,
					max: 90,
					value: 50
				};

				const node = factory(props);
				const progressBar = findChildByRole(node, 'progressbar');

				expect(progressBar).to.satisfy((p) => {
					if (p.getAttribute('title')) {
						console.log('À VÉRIFIER : l\' attribut title est pertinent');
						return this.skip();
					}

					if (p.getAttribute('aria-labelledby')) {
						console.log('À VÉRIFIER : l\' attribut aria-labelledby référence un passage de texte valide.');
						return this.skip();
					}

					if (p.querySelector('img[alt]')) {
						console.log('À VÉRIFIER : l\' attribut alt de l\'image est pertinent.');
						return this.skip();
					}

					return false;
				});
			}
		);

		it(
`Test 1.3 : Chaque progression, dont la valeur courante est connue respecte-t-elle ces conditions ?
	- Le composant possède une propriété aria-valuenow="[valeur courante]"
	- Le composant possède, si nécessaire, une propriété aria-valuetext="[valeur courante + texte]"
	- La valeur de la propriété aria-valuenow est mise à jour selon la progression
	- La valeur de la propriété aria-valuetext est mise à jour selon la progression`,
			function() {
				const props = {
					min: 10,
					max: 90,
					value: 50
				};

				const node = factory(props);
				const progressBar = findChildByRole(node, 'progressbar');

				expect(progressBar.getAttribute('aria-valuenow')).to.equal('50');
				expect(progressBar.getAttribute('aria-valuetext')).to.equal(makeLabel(props));
			}
		);

		it(
`Test 1.4 : Chaque progression, dont la valeur courante est inconnue respecte-t-elle ces conditions ?
	- Le composant ne possède pas de propriété aria-valuenow
	- Le composant ne possède pas de propriété aria-valuetext`,
			function() {
				const props = {
					min: 10,
					max: 90,
					value: undefined
				};

				const node = factory(props);
				const progressBar = findChildByRole(node, 'progressbar');

				expect(progressBar.getAttribute('aria-valuenow')).to.be.oneOf([null, '']);
				expect(progressBar.getAttribute('aria-valuetext')).to.be.oneOf([null, '']);
			}
		);

		it(
`Test 1.5 : Chaque progression qui concerne une région spécifique d\'un document respecte-t-elle ces conditions ?
	- La région concernée possède une propriété aria-describedby="[id]"
	- La région concernée possède une propriété aria-busy="true" durant toute la durée de la progression.`
		);
	});
