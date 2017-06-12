# Suite de tests pour composants RGAA 3

Une suite de tests [mocha](https://github.com/mochajs/mocha) pour tester la conformité de composants JavaScript avec les *design patterns* ARIA *Accordion*, *Dialog*, *ProgressBar*, *RadioButton*, *Checkbox*, *Slider*, *TabPanel* et *Tooltip*.

Cet outil est particulièrement utile si vous voulez :
- créer ou maintenir un composant JavaScript suivant un *design pattern*, en vous assurant tout au long du développement qu'il est accessible ;
- utiliser une bibliothèque JavaScript existante et vérifier qu'elle est accessible ;
- utiliser un seul outil pour tester des composants implémentés avec différents *frameworks*.

Note : le référentiel se base sur [les *design patterns* ARIA](https://www.w3.org/TR/wai-aria-practices) et ajoute des règles sur certains composants.
Vous trouverez la grille de tests ayant servi de référence pour l'implémentation de la librairie dans le dossier `./resources` : [2016-11-23-Test_DP_ARIA_grille_de_saisie-V2.1.ods](./resources/2016-11-23-Test_DP_ARIA_grille_de_saisie-V2.1.ods).

## Avertissement

Cette suite de tests permet d'automatiser la plupart des tests nécessaires à s'assurer de l'accessibilité d'un composant. Cependant, certains tests ne peuvent pas être réalisés automatiquement, et sont donc à vérifier manuellement pour s'assurer d'une conformité totale. Ceci est indiqué dans les résultats de tests (plus de détails dans la section *Usage*).

## Installation

Ces tests sont écrits en JavaScript avec la bibliothèque de test [mocha](https://github.com/mochajs/mocha).  
Installez la suite de tests en tant que dépendance de votre projet lors de vos développements via [npm](https://www.npmjs.com/get-npm) :

```sh
npm install --save-dev rgaa-test-suite
```

Les tests nécessitent un DOM pour fonctionner. C'est pourquoi un lanceur de tests comme [karma](https://github.com/karma-runner/karma) ou un DOM virtuel comme [jsdom](https://github.com/tmpvar/jsdom) est requis.

Pour démarrer, vous pouvez vous inspirer du dossier [./template](./template), qui contient une structure de projet pour lancer des tests avec mocha et karma.
Copiez ce dossier où vous le souhaitez, puis lancez `npm install` à la racine.

## Usage

Les composants devant être initialisés d'une certaine manière pour chaque test, un peu de code est nécessaire pour les mettre en place.

Typiquement, chaque test nécessite d'écrire une *factory* : une petite fonction pour créer le composant concerné en fonction des paramètres requis par le test. C'est la *factory* qui fait le lien nécessaire entre la bibliothèque de tests et le composant.  
Ce fonctionnement permet à la suite de tests de rester générique, et de fonctionner avec des composants écrits en JavaScript pur, jQuery, Angular, ou React par exemple.

[Comme dit plus haut](#avertissement), certains tests ne peuvent pas être éxécutés automatiquement. Quand vous lancez les tests, ils sont quand même affichés dans les résultats avec le statut *skipped* et un message d'avertissement.

### Exemple

Voici un exemple d'implémentation du test d'une *ProgressBar* :

```js
var testSuite = require('rgaa-test-suite');

/**
 * Une factory prenant en paramètre les options nécessaires
 * pour le test (ici min, max, et value).
 * Cette fonction doit retourner un élément de DOM contenant
 * le composant à tester, ici une ProgressBar.
 */
function progressBarFactory(options) {
  var node = document.createElement('div');
  node.setAttribute('role', 'progressbar');
  node.setAttribute('aria-valuemin', options.min);
  node.setAttribute('aria-valuemax', options.max);
  node.setAttribute('aria-value', options.value);

  return node;
}

/**
 * Mise en place du test mocha.
 */
describe('Ma super barre de progression', testSuite.progressBar(progressBarFactory));
```

Note : si vous avez utilisé le dossier [./template](./template), vous pouvez tester cet exemple en créant un fichier `test/progressBar.js`, et en y copiant le code ci-dessus.

Au lancement de mocha, `progressBar()` exécutera tous les tests du motif de conception :

```sh
Ma super barre de progression
  Motif de conception ARIA Progressbar
    Critère 1 : L'implémentation ARIA est-elle conforme ?
      Test 1.1 : Le composant respecte-t-il ces conditions ?
        ✔ Le composant possède un role="progressbar"
        ✔ Le composant possède une propriété aria-valuemin="[valeur minimale]"
        ✔ Le composant possède une propriété aria-valuemax="[valeur maximale]"
      Test 1.2 : Le composant respecte-t-il une de ces conditions ?
        ...
```

Vous trouverez également des exemples d'implémentation des différents tests dans le dossier [./test](./test).

### Options des *factories*

Chaque test requiert des options particulières pour initialiser les composants.
Vous trouverez ci-dessous la liste de ces options :

* [Accordion](#accordion)
* [Simple Checkbox](#simple-checkbox)
* [Tristate Checkbox](#tristate-checkbox)
* [Dialog](#dialog)
* [ProgressBar](#progressbar)
* [RadioButton](#radiobutton)
* [Slider](#slider)
* [TabPanel](#tabpanel)
* [Tooltip](#tooltip)

#### Accordion

Options :

```js
{
  // liste des onglets
  panels: [
    {
      title: 'Titre', // {string} titre de l'onglet
      content: 'Contenu', // {string} contenu de l'onglet (peut contenir du HTML)
      selected: true // {bool} si l'onglet est actif ou non
    }
  ]
}
```

[Exemple](./test/accordion.js)


#### Simple Checkbox
Options :

```js
{
  checked: true // {bool} si la checkbox est cochée
}
```

[Exemple](./test/checkbox.js)

#### Tristate Checkbox
Options :

```js
{
  state: 'mixed', // {string} si la checkbox est partiellement cochée
  items: [
    {
        label: 'Lettuce', // {string} le label de la checkbox
        checked: true // {bool} si la checkbox est cochée
    },
    {
        label: 'Tomato',
        checked: false
    },
    {
        label: 'Mustard',
        checked: false
    },
    {
        label: 'Sprouts',
        checked: false
    }
  ],
  title: 'Sandwich Condiments' // {string} Titre du groupement de checkbox
}
```

[Exemple](./test/tristateCheckbox.js)

#### Dialog

Options :

```js
{
  title: 'Titre', // {string} titre de la modale
  content: 'Contenu' // {string} contenu de la modale
}
```

Pour que le test fonctionne, la factory devra renvoyer une fonction pour ouvrir la modale, et une pour la fermer.
Ceci est dû à la manière dont sont couramment implémentées les modales, qui sont souvent ajoutées à la fin de `<body />` plutôt qu'à côté de l'élement déclencheur.

[Exemple](./test/dialog.js)

#### ProgressBar

Options :

```js
{
  min: 0, // {int} valeur minimale autorisée
  max: 100, // {int} valeur minimale autorisée
  value: 50 // {int} valeur courante
}
```

[Exemple](./test/progressBar.js)

#### RadioButton

Options :

```js
{
  // liste de boutons
  items: [
    {
      text: 'Premier bouton', // {string} texte du bouton
      checked: false // {bool} si le bouton radio est coché
    }
    // ...
  ]
}
```

[Exemple](./test/radioButton.js)

#### Slider

Options :

```js
{
  min: 0, // {int} valeur minimale autorisée
  max: 100, // {int} valeur maximale autorisée
  current: 50, // {int} valeur courante
  isVertical: false, // {bool} si le slider est vertical
  withLabel: false // {bool} si le slider est titré (aria-valuetext)
}
```

[Exemple](./test/slider.js)

#### TabPanel

Options :

```js
{
  // liste des onglets
  panels: [
    {
      title: 'Titre', // {string} titre de l'onglet
      content: 'Contenu', // {string} contenu de l'onglet (peut contenir du HTML)
      selected: true // {bool} si l'onglet est actif ou non
    }
    // ...
  ]
}
```

[Exemple](./test/tabPanel.js)

#### Tooltip

Options :

```js
{
  text: 'Texte' // {string} texte du tooltip
}
```

Pour que le test fonctionne, la factory devra renvoyer un élément focusable, sur lequel le tooltip sera mis en place.

[Exemple](./test/tooltip.js)
