```markdown
# Panorama des simulateurs publics

Une vingtaine de simulateurs d'aides et de droits sont développés dans la sphère publique française, principalement au sein de beta.gouv.fr et de ses partenaires. Ils couvrent des domaines variés : prestations sociales, fiscalité, transition écologique, droit du travail.

## Par domaine de politique publique

### Aides sociales et prestations

**[aides-jeunes](https://beta.gouv.fr/startups/aides.jeunes.html)** centralise les aides pour les jeunes via 1jeune1solution. Le simulateur modélise plusieurs centaines d'aides, en grande partie avec OpenFisca, et propose un système de contribution no-code via NetlifyCMS.

**[estime](https://beta.gouv.fr/startups/estime.html)** aide les demandeurs d'emploi à estimer leurs ressources lors d'une reprise d'activité. Développé par France Travail avec OpenFisca.

**[mes-ressources-formation](https://beta.gouv.fr/startups/estime.formation.html)** calcule les ressources financières disponibles pendant une formation professionnelle, également basé sur OpenFisca.

### Fiscalité et entreprise

**[mon-entreprise](https://beta.gouv.fr/startups/mon-entreprise.html)** propose plusieurs simulateurs pour créateurs et dirigeants d'entreprise.

**[leximpact](https://beta.gouv.fr/startups/leximpact.html)** permet d'analyser l'impact budgétaire de réformes fiscales.

**[portail-rse](https://beta.gouv.fr/startups/portail-rse.html)** informe les entreprises de leurs obligations en matière de responsabilité sociétale.

### Logement et rénovation

**[mes-aides-reno](https://beta.gouv.fr/startups/mesaidesreno.html)** simule les aides à la rénovation énergétique.

**[pacoupa](https://beta.gouv.fr/startups/pacoupa.html)** recommande des solutions de pompes à chaleur adaptées.

### Environnement et transition

**[nosgestesclimat](https://github.com/incubateur-ademe/nosgestesclimat)** permet de calculer son bilan carbone personnel.

**[impact-co2](https://beta.gouv.fr/startups/impact.co2.html)** compare l'empreinte carbone de différents choix du quotidien.

**transition-widget** est un web component embarquable qui affiche les aides à la transition écologique.

**[envergo](https://beta.gouv.fr/startups/envergo.html)** évalue l'impact environnemental des projets d'aménagement.

### Justice et droit du travail

**[code-du-travail-numérique](https://beta.gouv.fr/startups/codedutravail.html)** propose des simulateurs sur le droit du travail, notamment pour une cinquantaine de conventions collectives.

**[a-just](https://beta.gouv.fr/startups/a-just.html)** aide à la décision pour l'allocation des moyens dans les tribunaux, avec des algorithmes métier sur mesure.

### Agriculture et urbanisme

**[aides-agri](https://beta.gouv.fr/startups/plateforme-agriculteurs.html)** recense les aides agricoles de la PAC sous forme de catalogue.

**[terristory](https://beta.gouv.fr/startups/terri-story.html)** analyse les données territoriales avec du calcul Python et des modèles de machine learning.

**[sparte](https://beta.gouv.fr/startups/mon-diagnostic-artificialisation.html)** diagnostique l'artificialisation des sols avec Django et des données géospatiales du CEREMA.

## Deux familles technologiques dominent

**Les projets Publicodes** représentent environ un tiers des simulateurs. Le moteur Publicodes, développé par beta.gouv, privilégie la lisibilité des règles et la contribution par des non-développeurs. On trouve notamment :

- **[mon-entreprise](https://beta.gouv.fr/startups/mon-entreprise.html)** — le simulateur phare pour les entrepreneurs
- **[mes-aides-reno](https://beta.gouv.fr/startups/mesaidesreno.html)** — simulateur des aides à la rénovation énergétique
- **[nosgestesclimat](https://github.com/incubateur-ademe/nosgestesclimat)** — bilan carbone personnel de l'ADEME, disponible en 5 langues
- **[code-du-travail-numérique](https://beta.gouv.fr/startups/codedutravail.html)** — qui l'utilise pour 47 conventions collectives

**Les projets OpenFisca** représentent environ un tiers des projets de l'écosystème. Ce moteur Python de microsimulation économique est adapté aux systèmes socio-fiscaux complexes avec plusieurs entités (individu, foyer, ménage). Projets notables :

- **[aides-jeunes](https://beta.gouv.fr/startups/aides.jeunes.html)** — 539 aides modélisées, avec un système de contribution no-code via NetlifyCMS
- **[leximpact](https://beta.gouv.fr/startups/leximpact.html)** — analyse d'impact budgétaire des réformes fiscales, avec une centaine de cas types JSON
- **[estime](https://beta.gouv.fr/startups/estime.html)** — estimation des aides au retour à l'emploi par France Travail

Le reste de l'écosystème utilise soit des solutions hybrides (comme aides-simplifiées qui peut fonctionner avec les deux moteurs), soit des approches sur mesure adaptées à des besoins très spécifiques.

## Les approches sans moteur déclaratif

Environ un tiers des projets n'utilisent ni Publicodes ni OpenFisca. Ces choix sont généralement motivés par des besoins très spécifiques qui ne justifient pas l'adoption d'un moteur générique :

**[envergo](https://beta.gouv.fr/startups/envergo.html)** a développé une "moulinette" Python avec PostGIS pour évaluer l'impact environnemental des projets d'aménagement. Les règles sont trop liées aux données géospatiales pour bénéficier d'un moteur déclaratif.

**[pacoupa](https://beta.gouv.fr/startups/pacoupa.html)** utilise simplement une base SQLite avec de la validation Zod. Il s'agit davantage de recommandation basée sur une base de données produits que de calcul réglementaire.

**[terristory](https://beta.gouv.fr/startups/terri-story.html)** fait du calcul Python avec des modèles de machine learning pour analyser les données territoriales.

Ces projets montrent qu'il n'y a pas de solution unique : le choix technologique doit répondre au besoin métier, pas l'inverse.

## Voir aussi

- [Outils réutilisables](./02_outils) — Packages NPM et briques techniques
- [Patterns architecturaux](./03_patterns) — Comment connecter formulaire et moteur
- [Scope des aides](/01_simulateurs/04_scope-des-aides) — Stratégies selon le périmètre couvert
