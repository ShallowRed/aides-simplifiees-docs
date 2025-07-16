# Historique des simulateurs d'aides dans l'écosystème public

Afin de situer le produit Aides simplifiées dans son contexte, il est utile de retracer l'évolution historique des simulateurs de prestations et de droits en France. Depuis les premiers calculateurs fiscaux des années 1990 jusqu'aux approches de "Rules as Code" aujourd'hui explorées, le rôle du numérique dans l'accès aux droits a beaucoup évolué.

## Les précurseurs : premières simulations fiscales (années 1990)

Les premiers simulateurs publics en ligne en France sont apparus dans le domaine fiscal. Dès le milieu des années 1990, l'administration fiscale propose aux contribuables un moyen d'estimer le montant de leur impôt annuel. En 2000, le portail officiel impots.gouv.fr généralise ce service.

### Caractéristiques de la première génération

- **Public averti** : supposait une bonne connaissance du système d'imposition
- **Logique administrative existante** : reproduction en ligne des formulaires papier
- **Développement en silos** : chaque administration créait son propre outil

Cette première génération a démontré la faisabilité de la dématérialisation de calculs complexes pour le citoyen, tout en révélant ses limites en termes d'expérience usager.

## L'essor des simulateurs sociaux sectoriels (années 2000)

Dans les années 2000, d'autres organismes publics développent leurs propres simulateurs, marquant une deuxième génération plus orientée vers le grand public.

### La CAF fait figure de précurseur

- **2001** : Premier simulateur en ligne pour l'Aide personnalisée au logement (APL)
- **2005** : Extension aux allocations familiales et à la PAJE
- **Innovation** : Interface plus accessible, langage simplifié, questions enchaînées de façon interactive

### Pôle emploi : Simulateurs emploi/chômage

- **2008** : Simulateur d'allocation chômage (ARE)
- **Fin 2000s** : Outils pour simuler les dispositifs incitatifs à la reprise d'activité

Dans cette période 2000-2010, chaque organisme conçoit son simulateur dans son périmètre. L'approche reste très sectorielle mais on note une amélioration progressive de l'ergonomie.

## La transformation numérique de l'action publique (années 2010)

Les années 2010 voient une accélération de la transformation numérique de l'État, avec deux dynamiques complémentaires.

### Modernisation et dématérialisation à grande échelle

- **2012** : Création du SGMAP et programme "France numérique 2012-2020"
- **2016** : Loi pour une République numérique (ouverture des données et algorithmes publics)
- **2017** : Mise en place du Portail national des droits sociaux (mesdroitssociaux.gouv.fr)

### Nouveau paradigme des "startups d'État" (Beta.gouv)

En 2013, l'incubateur de services numériques de l'État (beta.gouv.fr) propose de créer de petites équipes autonomes capables de développer rapidement des services publics innovants.

**Innovation majeure : Mes Aides (2014)**
- Premier simulateur transversal multi-prestations en France
- Une seule simulation pour vérifier ses droits à plus de 25 aides différentes
- S'appuie sur OpenFisca, moteur de calcul open source
- Succès d'usage : jusqu'à 30 000 simulations par jour en 2019

Cette période introduit un nouveau paradigme : celui d'un service public numérique "le plus simple possible pour l'utilisateur, quitte à gérer la complexité en coulisses".

## Vers l'écosystème actuel des simulateurs (2020-2025)

Au début des années 2020, l'écosystème se diversifie encore davantage.

### Diversification des porteurs de simulateurs

- **Collectivités territoriales** : métropoles et villes développent leurs simulateurs locaux
- **Associations et tiers de confiance** : positionnement comme intermédiaires
- **Exemple** : 1jeune1solution.gouv.fr (2020) avec plus de 1000 aides pour les moins de 30 ans

### Évolutions technologiques majeures

**Moteurs de règles :**
- **OpenFisca** : référence pour la modélisation du système socio-fiscal français
- **Publicodes** : alternative récente, accent sur la lisibilité des règles

**Intelligence Artificielle :**
- Assistants virtuels et chatbots pour guider les usagers
- Systèmes de recommandation proactive
- Objectif : administration "anticipative" qui notifie automatiquement les droits

## Le contexte international et l'approche « Rules as Code »

### Pionniers nordiques

- **Finlande** : Portail benefits de la Kela (2010), simulateur multi-prestations pionnier
- **Estonie** : 99% des services publics en ligne dès 2014, principe du "Once Only"

### "Rules as Code" : vers la réglementation exécutable

Depuis quelques années, un mouvement international promeut l'idée de rendre les lois directement compréhensibles par les machines dès leur écriture.

- **Nouvelle-Zélande** : Programme Better Rules (2018) pour produire en parallèle le texte juridique et sa version exécutable
- **OCDE** : Guide "Cracking the Code" (2020) sur les principes du Rule as Code
- **France** : Début d'exploration via Etalab

## Positionnement d'Aides simplifiées

### Ce que nous reprenons des expériences passées

- **Approche centrée sur l'utilisateur** : approche beta.gouv
- **Moteurs de règles open source** : contribution aux communs numériques existants
- **Méthode itérative et agile** : amélioration continue basée sur les retours
- **Implication des experts métier** : garantie d'exactitude des règles

### Ce que nous apportons de nouveau

- **Focus méthodologique** : documentation et formalisation de la méthodologie de modélisation
- **Approche collaborative multi-acteurs** : processus pour que les experts contribuent directement
- **Réutilisabilité et essaimage** : outils pensés pour être facilement réutilisés par d'autres
- **Infrastructure partagée** : méthode de travail et bibliothèque commune de règles

## Vision à moyen terme

### Court terme (2025-2027)
- **Consolidation** : stabilisation des outils existants, sécurité, accessibilité
- **Essaimage** : adoption par d'autres acteurs publics
- **Standards d'interopérabilité** : formats d'API et données communs

### Moyen terme (2027-2030)
- **Personal Regulation Assistants (PRA)** : assistants personnels réglementaires
- **Proactivité** : notification automatique des droits
- **Européanisation** : intégration des aides européennes, interconnexions entre pays

## Leçons apprises et facteurs de réussite

### Facteurs de succès
1. **Impliquer l'utilisateur** dès la conception
2. **Associer l'expertise métier** dans l'équipe produit
3. **S'appuyer sur des technologies ouvertes** et éprouvées
4. **Itérer rapidement** et améliorer en continu
5. **Nouer des partenariats** avec les institutions métier

### Écueils à éviter
1. **Reproduire la complexité administrative** sans simplifier l'expérience
2. **Travailler en silos** sans coordination
3. **Techno-solutionnisme** : croire que la technologie résoudra tout
4. **Négliger la maintenance** sur la durée

L'étude de cette histoire montre le chemin parcouru et celui restant à faire. Aides simplifiées s'appuie sur les enseignements du passé pour innover dans la manière d'informer les citoyens sur leurs droits, dans une logique de transformation numérique de l'action publique qui place la donnée et les algorithmes au service de l'humain et de l'égalité d'accès aux droits.

### Évolutions nécessaires
1. **Standards** : Interopérabilité entre simulateurs
2. **Gouvernance** : Coordination entre acteurs
3. **Formation** : Montée en compétence des agents publics
4. **Inclusion** : Accessibilité pour tous les publics

::: tip Pour aller plus loin
Cette analyse historique nourrit notre réflexion prospective. Découvrez notre vision dans la [présentation du produit Aides simplifiées](/introduction).
:::

## Sources et références

### Rapports officiels
- Rapport Bothorel (2020) : "Pour une politique publique de la donnée"
- Mission Numerique (2017) : "État des lieux des simulateurs publics"
- DINUM (2021) : "Bilan de la dématérialisation des services publics"

### Articles de recherche
- Margetts & Dunleavy (2013) : "The second wave of digital-era governance"
- Janssen & Kuk (2016) : "The challenges and limits of big data algorithms in technocratic governance"

### Retours d'experience internationaux
- OECD (2020) : "Rules as Code: How to make regulations more digitally ready"
- Better Rules (NZ, 2019) : "Legislation as Code: Design principles"

## Prochaines étapes

- [Retourner à l'introduction du produit Aides simplifiées](/introduction)
- [Explorer la méthodologie des simulateurs](/simulateurs/)
- [Consulter le glossaire technique](/glossaire)
