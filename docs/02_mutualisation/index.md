# Mutualisation et collaboration

Cette section aborde les enjeux de mutualisation au sein de l'écosystème des simulateurs d'aides publiques. Elle s'adresse aux équipes qui souhaitent partager leurs ressources, adopter des standards communs, et bénéficier des travaux des autres.

## Pourquoi mutualiser ?

Les startups d'État développant des simulateurs d'aides publiques font face à des défis similaires :
- Modélisation de règles complexes (cumuls, rétroactivité, cas limites)
- Validation avec les organismes (CAF, Pôle emploi, etc.)
- Tests de conformité métier
- Composants UI spécialisés

**Constats de l'écosystème** :
- ~20 projets actifs maintenant des simulateurs
- 80% des projets recréent les mêmes composants UI
- Chaque nouveau simulateur nécessite 3-6 mois de développement
- 20-40% de ce temps pourrait être économisé par la mutualisation

## Trois axes de mutualisation

### 1. Artefacts de médiation
Formats et outils communs pour faciliter le dialogue entre métiers (juristes, designers, développeurs).

➡️ [Standards et formats](01_standards-formats.md)

### 2. Protocoles de collaboration
Méthodes partagées pour les interactions récurrentes (validation métier, revue juridique).

➡️ [Protocoles de collaboration](02_protocoles.md)

### 3. Bibliothèque de patterns
Documentation des cas récurrents et solutions validées.

➡️ [Patterns et cas d'usage](03_patterns.md)

### 4. Mesure et amélioration continue
Indicateurs pour piloter la mutualisation et démontrer sa valeur.

➡️ [Mesure du succès](04_mesure-succes.md)

## Principes directeurs

1. **Adoption volontaire** : Aucune obligation, convaincre par la valeur
2. **Commencer simple** : Quick wins avant généralisation
3. **Mesurer concrètement** : Temps gagné, bugs évités
4. **Partager l'existant** : Valoriser ce qui est déjà créé
5. **Accepter l'échec** : Abandonner ce qui ne fonctionne pas

## Outils existants à réutiliser

| Outil | Usage | Adoption |
|-------|-------|----------|
| **Publicodes** | Moteur de règles métier | 5+ projets |
| **OpenFisca** | Modèles socio-fiscaux | 5+ projets |
| **DSFR** | Design system | Large adoption |

## Contribuer

Les ressources mutualisées sont hébergées sur GitHub et maintenues collectivement :
- 📦 [Formats et templates](https://github.com/betagouv/aides-simplifiees-docs)
- 💬 [Discussions](https://github.com/betagouv/aides-simplifiees-docs/discussions)
- 💡 [Proposer une amélioration](https://github.com/betagouv/aides-simplifiees-docs/issues)

::: tip
La mutualisation commence par le partage. Même une documentation partielle de vos pratiques peut aider d'autres équipes !
:::
