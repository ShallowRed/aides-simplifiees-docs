# Écosystème des simulateurs publics

Cette section présente un panorama des projets de simulateurs développés dans la sphère publique française, principalement au sein du réseau beta.gouv.fr et de ses partenaires.

Nous avons recensé une vingtaine de projets de simulateurs open-source au sein de l'écosystème betagouv, avec des approches techniques variées. L'objectif ici : documenter les différentes architectures, identifier les outils réutilisables, et partager les bonnes pratiques qui émergent.

## Contenu

### [Panorama des projets](./01_panorama.md)
Tour d'horizon des principaux simulateurs : domaines couverts, technologies utilisées.

### [Outils et briques réutilisables](./02_outils.md)
Inventaire des composants open source disponibles : moteurs de règles (Publicodes, OpenFisca), packages NPM de règles métier, génération de formulaires, etc.

### [Patterns architecturaux](./03_patterns.md)
Analyse des différentes architectures pour connecter formulaires et moteurs de règles. Trois axes : où sont définies les questions, où s'exécute le calcul, quelle transformation entre les réponses et le moteur.

### [Collaboration métier-produit](./04_collaboration.md)
Comment organiser la relation entre équipes techniques, experts métier et partenaires institutionnels. Un enjeu souvent sous-estimé mais déterminant pour la qualité de la modélisation réglementaire.

## Compléments

Cette section présente l'**écosystème existant**. Pour la **méthode de conception** d'un simulateur, consultez le [Guide des simulateurs](/01_simulateurs/) qui détaille les étapes de modélisation, d'implémentation et de maintenance.
