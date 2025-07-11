# Modéliser une aide pour en faire un simulateur user-friendly

La modélisation d'une aide publique est la première étape pour créer un simulateur efficace. Elle consiste à traduire un texte réglementaire en un modèle logique compréhensible et calculable.

## Sources d'information

### Sources de première main
- **Textes de loi** : Code du travail, Code de l'action sociale, etc.
- **Décrets d'application** : Précisions sur les modalités d'application
- **Circulaires** : Instructions aux services déconcentrés

### Sources de seconde main
- **Articles explicatifs** : service-public.fr, sites spécialisés
- **Documentation d'organismes** : CAF, Pôle emploi, etc.
- **Retours d'expérience** : Autres simulateurs existants

::: warning Attention aux sources
Privilégiez toujours les sources officielles. Les sources de seconde main peuvent contenir des simplifications ou des erreurs.
:::

## De la réglementation aux variables

### Analyse du texte réglementaire

1. **Identifier les conditions d'éligibilité** : Qui peut bénéficier de l'aide ?
2. **Repérer les modalités de calcul** : Comment le montant est-il déterminé ?
3. **Lister les exceptions** : Quels sont les cas particuliers ?
4. **Définir les temporalités** : Quand s'applique la règle ?

### Modélisation "pure et abstraite"

À cette étape, on se concentre sur l'identification de **toutes les variables** nécessaires au calcul, sans se préoccuper de l'expérience utilisateur :

```
Variables identifiées pour l'aide X :
- Âge du demandeur
- Situation familiale
- Nombre d'enfants à charge
- Revenus du foyer (N-1)
- Type de logement
- Montant du loyer
- Zone géographique
- etc.
```

### Types de variables

- **Variables d'entrée** : Informations à collecter auprès de l'utilisateur
- **Variables calculées** : Résultats d'opérations sur d'autres variables
- **Variables de référence** : Plafonds, barèmes officiels
- **Variables temporelles** : Dates de prise en compte

## Du modèle au parcours utilisateur

### Ordonnancement des questions

Une fois les variables identifiées, il faut déterminer :

1. **L'ordre optimal** des questions (du général au particulier)
2. **Les conditions d'affichage** (questions conditionnelles)
3. **Les regroupements logiques** (par thème)
4. **Les points de sortie** (élimination précoce)

### Formulation user-friendly

Transformer le langage juridique en questions compréhensibles :

| Langage juridique | Formulation utilisateur |
|-------------------|-------------------------|
| "Personne isolée au sens de l'article L.262-2" | "Vivez-vous seul(e) ?" |
| "Revenus d'activité perçus au cours de l'année N-1" | "Quel était votre salaire l'année dernière ?" |

## Outils de modélisation

### Représentation visuelle

- **Arbres de décision** : Pour les logiques conditionnelles simples
- **Diagrammes de flux** : Pour les parcours complexes
- **Cartes mentales** : Pour organiser les variables par thème

### Outils numériques

- **Miro/Figma** : Collaboration visuelle en équipe
- **Lucidchart** : Diagrammes professionnels
- **Mermaid** : Diagrammes en code (versionnables)

## Exemple pratique

### Aide au logement étudiante

**Texte réglementaire** (simplifié) :
> "L'aide est accordée aux étudiants de moins de 28 ans, en formation initiale, dont les ressources ne dépassent pas X€, résidant dans un logement autonome de moins de Y m²"

**Variables identifiées** :
- `age_etudiant` (nombre)
- `type_formation` (énumération)
- `revenus_foyer` (montant)
- `type_logement` (énumération)
- `surface_logement` (nombre)

**Parcours utilisateur** :
1. "Quel est votre âge ?" → Élimination si > 28 ans
2. "Êtes-vous en formation initiale ?" → Élimination si non
3. "Quel type de logement occupez-vous ?" → Élimination si non autonome
4. "Quelle est la surface de votre logement ?" → Élimination si > Y m²
5. "Quels sont vos revenus ?" → Calcul du montant

## Bonnes pratiques

### Validation métier
- Faire relire par un expert de l'aide modélisée
- Tester avec des cas réels
- Documenter les choix d'interprétation

### Documentation
- Tracer la correspondance variable ↔ article de loi
- Justifier les simplifications éventuelles
- Maintenir une liste des cas non couverts

### Évolutivité
- Anticiper les évolutions réglementaires probables
- Structurer le modèle pour faciliter les mises à jour
- Séparer les données (barèmes) de la logique

::: tip Conseil pratique
Commencez par modéliser les cas les plus fréquents (80% des situations) avant de traiter les cas particuliers.
:::

## Prochaines étapes

- [Gérer plusieurs aides dans un même simulateur](/simulateurs/simulateur-multi-aide)
- [Comprendre pourquoi la modélisation est cruciale](/simulateurs/importance-modelisation)
- [Implémenter le modèle en code](/simulateurs/passer-en-code)
