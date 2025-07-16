# Guide des simulateurs

Cette section présente notre méthodologie pour créer des simulateurs d'aides publiques efficaces et maintenables.

## Vue d'ensemble du processus

La création d'un simulateur d'aide publique suit plusieurs étapes clés :

1. **[Modéliser une aide](/simulateurs/modeliser-une-aide)** - Traduire les règles réglementaires en modèle logique
2. **[Concevoir un simulateur multi-aide](/simulateurs/simulateur-multi-aide)** - Gérer plusieurs aides dans un même parcours
3. **[Comprendre l'importance de la modélisation](/simulateurs/importance-modelisation)** - Pourquoi modéliser est essentiel
4. **[Passer le modèle en code](/simulateurs/passer-en-code)** - Implémenter techniquement les règles
5. **[Tester et ajuster](/simulateurs/tester-ajuster)** - Valider et améliorer le simulateur
6. **[Maintenir](/simulateurs/maintenir)** - Faire évoluer le simulateur dans le temps

## Défis principaux

### Complexité réglementaire
Les textes de loi sont souvent complexes, avec de nombreuses exceptions et cas particuliers.

### Expérience utilisateur
Comment rendre un parcours fluide tout en respectant la précision réglementaire ?

### Maintenance
Comment maintenir à jour les règles face aux évolutions réglementaires ?

### Interopérabilité  
Comment permettre la réutilisation entre différents contextes et acteurs ?

## Notre approche

Nous privilégions une approche **itérative** et **collaborative** :

- **Multidisciplinaire** : Juristes, designers, développeurs travaillent ensemble
- **Centrée utilisateur** : Tests réguliers avec des usagers réels
- **Open source** : Partage des outils et méthodes
- **Documentée** : Traçabilité des choix et arbitrages

::: tip Conseil
Commencez toujours par comprendre le besoin utilisateur avant de vous lancer dans la modélisation technique.
:::

## Outils utilisés

- **Moteurs de règles** : OpenFisca, Publicodes
- **Visualisation** : Miro, Lucidchart, Mermaid
- **Tests** : Personas, scénarios d'usage
- **Documentation** : Markdown, schémas d'architecture

## Cas d'usage types

### Simulateur simple
Une aide, un parcours linéaire, critères clairs.

### Simulateur multi-aides
Plusieurs aides, optimisation du parcours, gestion de la cumulabilité.

### Intégration dans un service existant
API, widget, iframe pour intégrer dans d'autres sites.

## Prochaines étapes

Choisissez votre point d'entrée selon votre besoin :

- **Nouveau produit** → [Modéliser une aide](/simulateurs/modeliser-une-aide)
- **Produit complexe** → [Simulateur multi-aide](/simulateurs/simulateur-multi-aide)  
- **Questionnement méthodologique** → [Importance de la modélisation](/simulateurs/importance-modelisation)
