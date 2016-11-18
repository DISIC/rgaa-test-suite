# Suite de tests pour composants RGAA 3

Une suite de tests [mocha](https://github.com/mochajs/mocha) pour tester la conformité de composants ARIA avec le référentiel RGAA 3.

## Installation

```sh
npm install --save-dev rgaa-test-suite
```

Les tests nécessitant un DOM, vous devriez également utiliser un lanceur de tests comme [karma](https://github.com/karma-runner/karma) ou un DOM virtuel comme [jsdom](https://github.com/tmpvar/jsdom).

## Usage

Les composants devant être initialisés d'une certaine manière pour chaque test, un peu de code est nécessaire pour les mettre en place.

Typiquement, chaque test nécessite d'écrire une petite fonction pour créer le composant concerné en fonction des paramètres requis par le test.

Ce fonctionnement permet de tester des composants implémentés avec n'importe quel framework, puisque c'est à l'utilisateur de les initialiser. Cela permet à la suite de tests de rester générique, et de fonctionner avec des composants JavaScript pur, jQuery, Angular, ou React par exemple.

Attention toutefois, ces tests ne sont pas exhaustifs. Certains d'entre eux ne peuvent être réalisés automatiquement, et seront donc à vérifier manuellement pour s'assurer d'une conformité totale. Ces tests seront tout de même affichés dans les résultats avec le statut skipped et un message d'avertissement.

### Exemple

Voici comment on pourrait tester une barre de progression :

```js
import {progressBar} from 'rgaa-test-suite';

/**
 * Une factory prenant en paramètre les options nécessaires
 * pour le test (ici min, max, et value).
 * Cette fonction doit retourner un élément de DOM contenant
 * le composant à tester.
 */
function progressBarFactory(options) {
  const node = document.createElement('div');
  node.setAttribute('aria-valuemin', options.min);
  node.setAttribute('aria-valuemax', options.max);
  node.setAttribute('aria-value', options.value);

  return node;
}

/**
 * Mise en place du test mocha.
 */
describe('Ma super barre de progression', progressBar(progressBarFactory));
```

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

### Options des factories

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
      text: 'Premier bouton' // {string} texte du bouton
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
  withLabel: false // {bool] si le slider est titré (aria-valuetext)
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
