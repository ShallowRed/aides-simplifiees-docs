# Glossaire

Ce glossaire rassemble les notions, acronymes et références employés dans la documentation.  
Il a pour vocation de **clarifier le vocabulaire commun** aux métiers du droit, du numérique et de la conception de services publics.

## A

### Aide publique
Mesure financière, fiscale ou sociale accordée par une autorité publique (État, collectivité, opérateur) selon des conditions d’éligibilité. Une aide peut être monétaire, en nature ou sous forme d’exonération.

### Algorithme
Suite d’instructions logiques permettant d’exécuter un calcul déterminé. Dans un simulateur, l’algorithme traduit une règle de droit en opération mathématique ou logique.

### API (Application Programming Interface)
Interface permettant à différents logiciels de communiquer entre eux. Dans notre contexte, permet d'intégrer les calculs d'éligibilité dans d'autres services.

## B

### Barème
Tableau ou formule qui détermine un montant d’aide selon un ou plusieurs critères (revenus, nombre d’enfants, situation géographique).
Exemple : le barème APL selon la zone et les ressources du foyer.

## C

### Calcul
Processus d'opérations mathématiques par laquelle les conditions d'accès à une aide sont évaluées pour un usager. Il peut être binaire (éligible / non éligible) ou graduel (montant ajusté selon un barème).

### Cas type
Situation représentative définie avec les experts métier, servant à la fois de spécification fonctionnelle et de test. Contrairement aux tests unitaires, les cas types sont exprimés dans un langage compréhensible par des non-développeurs. Voir aussi : Fixtures métier.

### CI/CD (Continuous Integration / Continuous Deployment)
Pratiques d'intégration et de déploiement continu permettant d'automatiser les tests, la construction et la mise à jour du code.

### Commun numérique
Ressource logicielle, documentaire ou méthodologique ouverte, réutilisable et gouvernée collectivement.  

### Critères d'éligibilité
Conditions à remplir pour pouvoir bénéficier d'une aide publique (âge, revenus, situation familiale, etc.).

## D

### Dispositif (réglementaire)
Ensemble cohérent de règles juridiques visant à réguler une situation particulière ou produire un effet juridique précis. Exemple : l'aide personnalisée au logement.

### DMN (Decision Model and Notation)
Standard de modélisation des règles métier permettant de représenter la logique de décision de manière visuelle et exécutable.

## E

### Éligibilité
Fait de remplir les conditions requises pour bénéficier d'une aide ou d'un service public.

### Entité
Objet de calcul dans un moteur de règles (ex. : *individu*, *foyer*, *logement*).  
Chaque variable est rattachée à une entité pour structurer les dépendances.

### Expert métier
Personne disposant d'une connaissance approfondie d'un domaine réglementaire (juriste, agent CAF, conseiller Pôle Emploi, etc.). Dans un projet de simulateur, l'expert métier valide les interprétations et les cas types.

## F

### Fixtures métier
Cas types représentatifs définis avec les experts, servant à la fois de spécification fonctionnelle et de test de non-régression. Contrairement aux tests unitaires techniques, les fixtures métier sont lisibles par des non-développeurs et traçables vers des situations réelles.

## L

### Liquidateur
Système informatique utilisé par une administration pour calculer et attribuer automatiquement des prestations. Se distingue d'un simulateur par son caractère opérationnel.

## M

### Modèle (de règles)
Représentation formalisée et structurée des règles d'attribution d'une aide, permettant leur implémentation informatique.

### Moteur de règles
Logiciel spécialisé dans l'exécution de règles métier formalisées. Exemples : OpenFisca, Publicodes.

### Multi-moteur
Architecture permettant à un même formulaire ou schéma de questionnaire d'alimenter plusieurs moteurs de règles (Publicodes, OpenFisca, custom). Cette approche favorise le découplage entre l'interface utilisateur et la logique de calcul.

## P

### @publicodes/forms
Bibliothèque JavaScript permettant de générer automatiquement des formulaires à partir de règles Publicodes. Fait partie de l'écosystème publicodes-core.

### Personal Regulation Assistant (PRA)
Concept d'assistant numérique personnel capable d'analyser la situation d'un individu au regard de multiples réglementations pour l'informer de ses droits et obligations.

### Publicodes
Moteur de règles open source développé par beta.gouv.fr, privilégiant la lisibilité et la facilité de contribution par des non-techniques.

## R

### Registre d'interprétations
Document traçant les décisions prises lorsqu'un texte réglementaire est ambigu. Chaque interprétation est justifiée, datée et validée par un expert, permettant de comprendre pourquoi le simulateur se comporte d'une certaine manière.

### Règle (réglementaire)
Portion d'un texte réglementaire identifiable comme une instruction précise émise par les législateurs. Exemple : "condition d'âge pour l'éligibilité à l'APL en location".

### Rules as Code
Approche consistant à traduire directement les règles juridiques en code informatique, permettant leur application automatisée tout en maintenant la traçabilité vers les sources légales.

## S

### Simulateur
Outil permettant à un utilisateur d'estimer son éligibilité et le montant potentiel d'une ou plusieurs aides publiques, à partir de la description de sa situation.

### Survey-schema
Format de description déclarative d'un questionnaire, indépendant du moteur de calcul. Permet de définir les questions, leur ordre, les conditions d'affichage et les validations sans coder l'interface. Utilisé notamment par aides-simplifiees.

## T

### Texte réglementaire
Document juridique officiel (loi, décret, arrêté, circulaire) définissant les règles d'attribution et de calcul d'une aide publique.

## V

### Validation métier
Processus par lequel un expert du domaine vérifie que le modèle informatique reflète correctement la réglementation. Distinct des tests techniques, la validation métier porte sur la conformité au droit, pas sur l'absence de bugs.

### Variable
Élément d'information nécessaire au calcul d'une aide (âge, revenus, type de logement, etc.). Peut être :
- **Variable d'entrée** : saisie par l'utilisateur
- **Variable calculée** : résultat d'un calcul intermédiaire  
- **Variable de référence** : valeur de barème officiel

## Acronymes courants

| Acronyme | Signification | Description |
|----------|---------------|-------------|
| **APL** | Aide Personnalisée au Logement | Aide au logement calculée selon les revenus et le loyer |
| **CAF** | Caisse d'Allocations Familiales | Organisme versant de nombreuses aides sociales |
| **RSA** | Revenu de Solidarité Active | Aide garantissant un revenu minimum |
| **UX** | User Experience | Expérience utilisateur, qualité d'usage d'un service |
| **API** | Application Programming Interface | Interface de programmation permettant l'interopérabilité |
| **CI/CD** | Continuous Integration/Continuous Deployment | Pratiques d'automatisation du développement |

## Ressources complémentaires

### Documentation technique
- [OpenFisca](https://openfisca.org/) : Moteur de règles pour la fiscalité et les prestations sociales
- [Publicodes](https://publi.codes/) : Moteur de règles orienté contribution collaborative

### Références juridiques
- [Légifrance](https://www.legifrance.gouv.fr/) : Service public de diffusion du droit français
- [Service-public.fr](https://www.service-public.fr/) : Information officielle sur les droits et démarches

### Méthodologie
- [Guide des algorithmes publics](https://guides.etalab.gouv.fr/algorithmes/) : Bonnes pratiques pour l'administration
- [Règles as Code](https://oecd-opsi.org/wp-content/uploads/2020/08/OECD-OPSI-Primer-Rules-as-Code.pdf) : Approche internationale (OCDE)

::: tip Contribution
Ce glossaire est évolutif. N'hésitez pas à proposer des ajouts ou corrections via [notre dépôt GitHub](https://github.com/betagouv/aides-simplifiees-docs).
:::

## Voir aussi

- [Historique des simulateurs publics](/99_annexe/historique)
- [Guide complet des simulateurs](/01_simulateurs/)
- [Les enjeux Rules as Code](/00_meta/01_enjeux-rules-as-code)
