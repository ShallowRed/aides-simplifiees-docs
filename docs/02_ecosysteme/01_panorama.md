```markdown
# Panorama des simulateurs publics

L'écosystème français des simulateurs de droits sociaux et d'aides publiques est riche et diversifié. Cette page présente les principaux projets actifs.

## Vue d'ensemble

L'écosystème compte une vingtaine de projets de simulateurs, utilisant différentes technologies et approches. La majorité utilise le Design System de l'État (DSFR) et dispose de tests automatisés.

## Par domaine

### Aides sociales et prestations

| Projet | Description | Moteur |
|--------|-------------|--------|
| **aides-jeunes** | Simulateur 1jeune1solution pour les jeunes (539 aides YAML) | OpenFisca |
| **aides-simplifiees** | Simulateur multi-aides avec validation tracée | Publicodes + OpenFisca |
| **estime** | Estimation des aides à la reprise d'emploi (France Travail) | OpenFisca |
| **mes-ressources-formation** | Ressources financières pendant une formation | OpenFisca |

### Fiscalité et entreprise

| Projet | Description | Moteur |
|--------|-------------|--------|
| **mon-entreprise** | Simulateurs pour créateurs et dirigeants | Publicodes |
| **leximpact** | Impact budgétaire des réformes fiscales | OpenFisca |
| **portail-rse** | Obligations RSE des entreprises | Django |

### Logement et rénovation

| Projet | Description | Moteur |
|--------|-------------|--------|
| **mes-aides-reno** | Aides à la rénovation énergétique | Publicodes |
| **pacoupa** | Recommandations de pompes à chaleur | SQLite + Zod |
| **mon-devis-sans-oublis** | Vérification devis rénovation | Next.js |

### Environnement et transition

| Projet | Description | Moteur |
|--------|-------------|--------|
| **nosgestesclimat** | Bilan carbone personnel (5 langues) | Publicodes |
| **impact-co2** | Comparateur d'empreinte carbone | Publicodes |
| **transition-widget** | Widget multi-aides transition écologique | Publicodes |
| **envergo** | Évaluation environnementale des projets | Python |

### Justice et droit du travail

| Projet | Description | Moteur |
|--------|-------------|--------|
| **a-just** | Aide à la décision pour la justice | Koa.js |
| **code-du-travail-numerique** | Simulateurs droit du travail (47 conventions) | Publicodes |

### Agriculture et territoires

| Projet | Description | Moteur |
|--------|-------------|--------|
| **aides-agri** | Aides agricoles de la PAC | Django |
| **sparte** | Diagnostic artificialisation des sols | Django |
| **terristory** | Données territoriales | Python/Sanic |

### Socle technique

| Projet | Description | Moteur |
|--------|-------------|--------|
| **publicodes-core** | Moteur officiel Publicodes (6 packages NPM) | Publicodes |

## Par technologie

### Répartition des moteurs de règles

L'écosystème utilise principalement trois familles de moteurs : Publicodes (environ 40%), OpenFisca (environ 25%) et des solutions custom adaptées à des besoins spécifiques.

### Publicodes

Publicodes est un langage déclaratif développé par beta.gouv.fr, privilégiant la lisibilité et la contribution par des non-techniques.

**Projets** : mon-entreprise, mes-aides-reno, nosgestesclimat, transition-widget, code-du-travail, impact-co2, aides-simplifiees (dual), publicodes-core

**Packages NPM publiés dans ce cluster** :

| Projet | Package NPM | Version |
|--------|-------------|---------|
| publicodes-core | @publicodes/core, @publicodes/forms, @publicodes/react-ui, @publicodes/rest-api | 1.9.1 |
| mon-entreprise | modele-social | 9.0.0 |
| code-du-travail | @socialgouv/modeles-social | 4.202.0 |
| mes-aides-reno | mesaidesreno | 1.6.1 |
| nosgestesclimat | @incubateur-ademe/nosgestesclimat | 1.9.1 |
| aides-simplifiees | @betagouv/survey-schema, @shallowred/publicodes-entreprise-innovation | 2.0.0 |
| impact-co2 | @incubateur-ademe/impactco2-react, @incubateur-ademe/publicodes-acv-numerique | 1.4.0 |

**Caractéristiques** :
- Syntaxe YAML lisible
- Documentation intégrée aux règles
- Écosystème JavaScript/TypeScript
- Le package `@publicodes/forms` résout le problème de liaison formulaire↔moteur

### OpenFisca

OpenFisca est un moteur de microsimulation économique, utilisé pour modéliser les systèmes socio-fiscaux.

**Projets utilisateurs** : aides-jeunes, estime, leximpact, mes-ressources-formation, aides-simplifiees (dual)

| Projet | Version OpenFisca | Type d'intégration |
|--------|-------------------|-------------------|
| aides-jeunes | France 174.2.12 + Local + Paris | API locale |
| leximpact | France-with-indirect-taxation (fork) | API backend |
| aides-simplifiees | France standard | API externe |
| estime | France (fork Pôle emploi) | API externe |
| mes-ressources-formation | France (via HTTP) | API externe |

**Caractéristiques** :
- Modélisation fine des entités (individu, foyer, ménage)
- Python côté serveur
- Adapté aux calculs complexes multi-entités

### Approches custom

Certains projets développent leurs propres solutions adaptées à leurs besoins spécifiques.

| Projet | Approche | Justification |
|--------|----------|---------------|
| **envergo** | Moulinette Python + PostGIS | Règles environnementales très spécifiques, données géospatiales |
| **pacoupa** | Lookup SQLite + validation Zod + Turso edge | Recommandation basée sur base de données |
| **a-just** | Algorithmes JavaScript custom | Calculs de charge tribunaux très spécifiques |
| **terristory** | Python/Sanic + ML (scikit-learn) | Données territoriales + prédiction |
| **sparte** | Django + Airflow ETL | Données CEREMA, géospatial |
| **portail-rse** | Django ORM + ProConnect | Questionnaires RSE, intégration État |
| **aides-agri** | Django ORM | Catalogue d'aides agricoles |

## Bonnes pratiques observées

Plusieurs projets de l'écosystème ont développé des pratiques qui méritent d'être partagées :

| Pratique | Exemple de mise en œuvre | Bénéfice |
|----------|--------------------------|----------|
| **ADR (Architecture Decision Records)** | mon-entreprise | Pérennité des décisions techniques |
| **Validation métier tracée** | aides-simplifiees (shared-test-cases) | Conformité prouvable aux organismes |
| **Références juridiques** | code-du-travail, mes-aides-reno | Traçabilité règle→texte de loi |
| **Packages NPM réutilisables** | modele-social, mesaidesreno | Partage entre projets |

::: tip Recommandation
Ces pratiques (glossaire métier, ADR, validation tracée) gagneraient à devenir des standards de l'écosystème. Voir [Collaboration métier-produit](./04_collaboration.md) pour des modèles.
:::

## Voir aussi

- [Outils réutilisables](./02_outils.md)
- [Patterns architecturaux](./03_patterns.md)
