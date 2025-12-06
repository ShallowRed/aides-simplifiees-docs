# Historique des simulateurs d'aides publiques

Cette page retrace l'évolution des simulateurs de prestations en France, des premiers calculateurs fiscaux aux approches "Rules as Code" actuelles.

## Années 1990 : les précurseurs

Les premiers simulateurs fiscaux apparaissent sur disquettes et CD-ROM, diffusés par des éditeurs privés ou la presse spécialisée. Ce sont des tableurs permettant d'estimer son impôt sur le revenu à partir de barèmes figés. Ils s'adressent à un public averti — cadres, indépendants, lecteurs de magazines économiques — et deviennent vite obsolètes faute de mise à jour régulière.

À cette époque, l'administration fiscale reste à distance. Les interactions avec les contribuables passent par le papier ou le guichet. Le premier simulateur officiel sur impots.gouv.fr n'arrivera qu'en 2006.

## Années 2000 : l'institutionnalisation

Les administrations prennent le relais des éditeurs privés. En 2007, la CAF met en ligne son simulateur d'APL, permettant aux allocataires d'estimer leur droit avant de déposer un dossier. L'Assurance Retraite suit au début des années 2010. Pôle Emploi propose des estimateurs d'allocation chômage.

Le changement est double : les simulateurs passent en ligne, et ils deviennent officiels. La mise à jour suit désormais le rythme des évolutions réglementaires. L'audience s'élargit — n'importe qui peut accéder à ces outils depuis un navigateur.

Mais chaque organisme développe sa propre solution. Les simulateurs restent cloisonnés par caisse ou par prestation. Pour un usager qui veut estimer plusieurs aides, il faut naviguer entre plusieurs sites, ressaisir les mêmes informations, et parfois obtenir des résultats incohérents.

## Années 2010 : le tournant numérique

### Le cadre institutionnel

La création du SGMAP (Secrétariat général pour la modernisation de l'action publique) en 2012 marque un tournant dans la stratégie de dématérialisation. La DINSIC (2014), puis la DINUM (2019), structurent progressivement la politique numérique de l'État.

La loi pour une République numérique (2016) impose l'ouverture des données publiques et la publication des algorithmes utilisés par l'administration. France Connect (2016) unifie l'authentification aux services publics. En 2017, mesdroitssociaux.gouv.fr devient le premier portail unifié d'accès aux droits sociaux, même si son périmètre reste limité.

### Beta.gouv.fr et la méthode startup d'État

En parallèle des grands chantiers de dématérialisation, l'incubateur Beta.gouv.fr (2013) introduit un modèle radicalement différent : des équipes autonomes de 3 à 5 personnes, des cycles courts de 6 mois, une liberté de choix technique, et surtout une conception centrée sur l'usager plutôt que sur les processus administratifs.

Ce modèle produit plusieurs simulateurs qui changent la donne :

**Mes Aides (2014)** est le produit emblématique de cette période. Premier simulateur multi-prestations en France, il permet de vérifier ses droits à plus de 25 aides — RSA, APL, prime d'activité, CMU-C, allocations familiales — en une seule simulation d'environ 10 minutes. Le service repose sur OpenFisca, un moteur de calcul open source capable de modéliser le système socio-fiscal français. En 2019, Mes Aides traite jusqu'à 30 000 simulations par jour.

**1jeune1solution.gouv.fr (2020)** agrège plus de 1 000 aides pour les moins de 30 ans — emploi, formation, logement, santé, mobilité. Le service s'appuie sur Aides-jeunes, un simulateur dédié qui reprend l'approche de Mes Aides pour ce public spécifique.

**Mon-entreprise.urssaf.fr** applique la même logique aux indépendants et créateurs d'entreprise : estimation des cotisations, comparaison des statuts juridiques, simulation de revenus. Le service utilise Publicodes, un langage de règles développé en interne qui privilégie la lisibilité.

## Années 2020 : diversification et nouveaux acteurs

### Les collectivités territoriales

Les régions, départements et métropoles développent leurs propres simulateurs pour les aides locales. Ces dispositifs — bourses régionales, aides au permis de conduire, chèques énergie locaux — restent souvent méconnus. Quelques collectivités pionnières intègrent leurs aides aux simulateurs nationaux ou développent des portails unifiés.

### Les associations et l'inclusion numérique

Les associations jouent un rôle croissant d'intermédiaire pour les publics éloignés du numérique. Des structures comme Emmaüs Connect ou les CCAS forment des aidants à l'utilisation des simulateurs. Certaines développent leurs propres outils adaptés à leurs bénéficiaires.

### La consolidation technique

Côté moteurs de règles, deux approches coexistent :

**OpenFisca** modélise fidèlement le système socio-fiscal. Utilisé par Mes Aides, il est aussi déployé en Nouvelle-Zélande, en Tunisie et dans plusieurs pays africains. Sa force : la précision des calculs. Sa contrainte : la complexité de prise en main pour les non-développeurs.

**Publicodes** privilégie la lisibilité des règles. Le code est compréhensible par un non-technicien, ce qui facilite la collaboration avec les experts métier. Il alimente mon-entreprise.urssaf.fr, le simulateur d'empreinte carbone Nos Gestes Climat, et plusieurs autres produits Beta.gouv.

## Le contexte international

### Les pays pionniers

D'autres pays ont pris de l'avance sur l'unification des services.

La **Finlande** dispose depuis 2010 d'un simulateur multi-prestations (portail Benefits de la Kela). Le citoyen finlandais peut estimer en une seule démarche ses droits aux allocations logement, familiales, maladie, chômage et retraite.

L'**Estonie** a centralisé 99% de ses services publics sur X-Road dès 2001. Le principe du "Once Only" y est appliqué : les usagers ne transmettent leurs informations qu'une seule fois, l'administration se charge de les partager entre services. La déclaration d'impôts pré-remplie ne prend que quelques minutes.

Le **Danemark** (borger.dk) et les **Pays-Bas** (mijnoverheid.nl) ont également développé des portails unifiés, avec des niveaux variables d'intégration des simulateurs.

### Rules as Code

Le mouvement "Rules as Code" pousse la logique plus loin : écrire la loi sous une forme directement exécutable par les machines, en parallèle de sa rédaction juridique traditionnelle. L'objectif : garantir que les simulateurs reflètent exactement l'intention du législateur, et réduire le délai entre publication d'une loi et mise à jour des services.

La **Nouvelle-Zélande** expérimente cette approche depuis 2018 avec le programme Better Rules. Des juristes et des développeurs travaillent ensemble dès la conception des textes. L'**OCDE** a publié en 2020 un guide de bonnes pratiques (*Cracking the Code*) qui documente ces expérimentations.

En France, le mouvement reste embryonnaire. OpenFisca et Publicodes constituent des briques techniques compatibles avec cette vision, mais aucune administration n'a encore formalisé une démarche "Rules as Code" à grande échelle.

## Où se situe Aides simplifiées ?

Aides simplifiées s'inscrit dans la continuité de Mes Aides et des simulateurs Beta.gouv : conception centrée usager, moteurs de règles open source, méthode itérative, implication des experts métier dans la modélisation.

Le projet apporte quelques éléments supplémentaires :

- Une documentation méthodologique formalisée, destinée à être réutilisée par d'autres équipes
- Une approche collaborative qui intègre les partenaires (collectivités, associations, opérateurs) dès la conception
- Des outils de modélisation pensés pour des non-développeurs

::: tip Pour aller plus loin
Voir la [présentation du produit](/00_meta/02_aides-simplifiées) pour le positionnement actuel, et les [enjeux du Rules as Code](/00_meta/01_enjeux-rules-as-code) pour le contexte conceptuel.
:::

## Références

### Rapports et études

- **Rapport Bothorel (2020)** : *Pour une politique publique de la donnée* — recommandations sur l'ouverture des algorithmes publics
- **DINUM (2021)** : *Observatoire de la qualité des démarches en ligne* — suivi de la dématérialisation
- **Défenseur des droits (2019)** : *Dématérialisation et inégalités d'accès aux services publics* — alertes sur l'exclusion numérique

### International

- **OECD (2020)** : *Cracking the Code — Rulemaking for humans and machines*
- **Better Rules (Nouvelle-Zélande, 2018)** : documentation du programme Legislation as Code
- **World Bank (2021)** : *GovTech Maturity Index* — comparatif international des services publics numériques

### Projets techniques

- [OpenFisca](https://openfisca.org) — moteur de calcul socio-fiscal open source
- [Publicodes](https://publi.codes) — langage de règles lisible
- [France Connect](https://franceconnect.gouv.fr) — fédération d'identité pour les services publics
