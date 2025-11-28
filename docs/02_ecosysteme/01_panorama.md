# Panorama des simulateurs publics

L'écosystème français des simulateurs de droits sociaux et d'aides publiques est riche et diversifié. Cette page présente les principaux projets actifs.

## Par domaine

### Aides sociales et prestations

| Projet | Description | Moteur |
|--------|-------------|--------|
| **aides-jeunes** | Simulateur 1jeune1solution pour les jeunes | OpenFisca |
| **estime** | Estimation des aides à la reprise d'emploi (Pôle Emploi) | OpenFisca |
| **mes-ressources-formation** | Ressources financières pendant une formation | OpenFisca |

### Fiscalité et entreprise

| Projet | Description | Moteur |
|--------|-------------|--------|
| **mon-entreprise** | Simulateurs pour créateurs et dirigeants | Publicodes |
| **leximpact** | Impact budgétaire des réformes fiscales | OpenFisca |
| **portail-rse** | Obligations RSE des entreprises | Custom |

### Logement et rénovation

| Projet | Description | Moteur |
|--------|-------------|--------|
| **mes-aides-reno** | Aides à la rénovation énergétique | Publicodes |
| **pacoupa** | Recommandations de pompes à chaleur | Custom (SQLite) |

### Environnement et transition

| Projet | Description | Moteur |
|--------|-------------|--------|
| **nosgestesclimat** | Bilan carbone personnel | Publicodes |
| **impact-co2** | Comparateur d'empreinte carbone | Custom (JSON) |
| **transition-widget** | Widget multi-aides transition écologique | Publicodes |
| **envergo** | Évaluation environnementale des projets | Custom (Python) |

### Justice et administration

| Projet | Description | Moteur |
|--------|-------------|--------|
| **a-just** | Aide à la décision pour la justice | Custom |
| **code-du-travail-numerique** | Simulateurs droit du travail | Custom + Publicodes |

### Agriculture

| Projet | Description | Moteur |
|--------|-------------|--------|
| **aides-agri** | Aides agricoles de la PAC | Custom (Django) |

### Urbanisme

| Projet | Description | Moteur |
|--------|-------------|--------|
| **mon-diagnostic-artificialisation** | Diagnostic artificialisation des sols | Custom |
| **terristory** | Données territoriales | Custom |

## Par technologie

### Publicodes

Publicodes est un langage déclaratif développé par beta.gouv.fr, privilégiant la lisibilité et la contribution par des non-techniques.

**Projets** : mon-entreprise, mes-aides-reno, nosgestesclimat, transition-widget, code-du-travail (partiellement)

**Caractéristiques** :
- Syntaxe YAML lisible
- Documentation intégrée aux règles
- Écosystème JavaScript/TypeScript

### OpenFisca

OpenFisca est un moteur de microsimulation économique, utilisé pour modéliser les systèmes socio-fiscaux.

**Projets** : aides-jeunes, estime, leximpact, mes-ressources-formation

**Caractéristiques** :
- Modélisation fine des entités (individu, foyer, ménage)
- Python côté serveur
- Adapté aux calculs complexes multi-entités

### Approches custom

Certains projets développent leurs propres solutions adaptées à leurs besoins spécifiques.

**Exemples** :
- **envergo** : Moulinette Python pour l'évaluation environnementale
- **pacoupa** : Lookup SQLite + validation Zod
- **a-just** : Algorithmes métier en TypeScript

## Maturité et pérennité

L'écosystème présente des niveaux de maturité variés :

- **Projets matures** : mon-entreprise, aides-jeunes, nosgestesclimat (plusieurs années, équipes stables)
- **Projets en croissance** : mes-aides-reno, transition-widget, aides-simplifiees
- **Projets expérimentaux** : certains simulateurs spécialisés avec des équipes plus réduites

::: warning Évolution constante
Les startups d'État peuvent pivoter, fusionner ou s'arrêter. Les informations de cette page reflètent l'état de l'écosystème à un instant donné.
:::

## Voir aussi

- [Outils réutilisables](./02_outils.md)
- [Patterns architecturaux](./03_patterns.md)
