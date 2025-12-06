```markdown
# Panorama des simulateurs publics

Une vingtaine de simulateurs d'aides et de droits sont développés dans la sphère publique française, principalement au sein de beta.gouv.fr et de ses partenaires. Ils couvrent des domaines variés : prestations sociales, fiscalité, transition écologique, droit du travail.

## Par domaine de politique publique

### Aides sociales et prestations

**aides-jeunes** centralise les aides pour les jeunes via 1jeune1solution. Le simulateur modélise 539 aides avec OpenFisca et propose un système de contribution no-code via NetlifyCMS.

**estime** aide les demandeurs d'emploi à estimer leurs ressources lors d'une reprise d'activité. Développé par Pôle Emploi avec OpenFisca.

**mes-ressources-formation** calcule les ressources financières disponibles pendant une formation professionnelle, également basé sur OpenFisca.

### Fiscalité et entreprise

**mon-entreprise** propose plusieurs simulateurs pour créateurs et dirigeants d'entreprise.

**leximpact** permet d'analyser l'impact budgétaire de réformes fiscales.

**portail-rse** informe les entreprises de leurs obligations en matière de responsabilité sociétale.

### Logement et rénovation

**mes-aides-reno** simule les aides à la rénovation énergétique.

**pacoupa** recommande des solutions de pompes à chaleur adaptées.

### Environnement et transition

**nosgestesclimat** permet de calculer son bilan carbone personnel.

**impact-co2** compare l'empreinte carbone de différents choix du quotidien.

**transition-widget** est un web component embarquable qui affiche les aides à la transition écologique.

**envergo** évalue l'impact environnemental des projets d'aménagement.

### Justice et droit du travail

**code-du-travail-numérique** propose des simulateurs sur le droit du travail, notamment pour une cinquantaine de conventions collectives.

**a-just** aide à la décision pour l'allocation des moyens dans les tribunaux, avec des algorithmes métier sur mesure.

### Agriculture et urbanisme

**aides-agri** recense les aides agricoles de la PAC sous forme de catalogue.

**terristory** analyse les données territoriales avec du calcul Python et des modèles de machine learning.

**sparte** diagnostique l'artificialisation des sols avec Django et des données géospatiales du CEREMA.

## Deux familles technologiques dominent

**Les projets Publicodes** représentent environ un tiers des simulateurs. Le moteur Publicodes, développé par beta.gouv, privilégie la lisibilité des règles et la contribution par des non-développeurs. On trouve notamment :

- **mon-entreprise** — le simulateur phare pour les entrepreneurs
- **mes-aides-reno** — simulateur des aides à la rénovation énergétique
- **nosgestesclimat** — bilan carbone personnel de l'ADEME, disponible en 5 langues
- **code-du-travail-numérique** — qui l'utilise pour 47 conventions collectives

**Les projets OpenFisca** représentent environ un tiers des projets de l'écosystème. Ce moteur Python de microsimulation économique est adapté aux systèmes socio-fiscaux complexes avec plusieurs entités (individu, foyer, ménage). Projets notables :

- **aides-jeunes** — 539 aides modélisées, avec un système de contribution no-code via NetlifyCMS
- **leximpact** — analyse d'impact budgétaire des réformes fiscales, avec une centaine de cas types JSON
- **estime** — estimation des aides au retour à l'emploi par Pôle Emploi

Le reste de l'écosystème utilise soit des solutions hybrides (comme aides-simplifiées qui peut fonctionner avec les deux moteurs), soit des approches sur mesure adaptées à des besoins très spécifiques.

## Les approches sans moteur déclaratif

Environ un tiers des projets n'utilisent ni Publicodes ni OpenFisca. Ces choix sont généralement motivés par des besoins très spécifiques qui ne justifient pas l'adoption d'un moteur générique :

**envergo** a développé une "moulinette" Python avec PostGIS pour évaluer l'impact environnemental des projets d'aménagement. Les règles sont trop liées aux données géospatiales pour bénéficier d'un moteur déclaratif.

**pacoupa** utilise simplement une base SQLite avec de la validation Zod. Il s'agit davantage de recommandation basée sur une base de données produits que de calcul réglementaire.

**terristory** fait du calcul Python avec des modèles de machine learning pour analyser les données territoriales.

Ces projets montrent qu'il n'y a pas de solution unique : le choix technologique doit répondre au besoin métier, pas l'inverse.

## Voir aussi

- [Outils réutilisables](./02_outils.md)
- [Patterns architecturaux](./03_patterns.md)
