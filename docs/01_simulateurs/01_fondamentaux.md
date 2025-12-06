# Les fondamentaux de la fabrique de simulateurs d'aides publiques

## Les principes fondateurs

Cinq principes doivent guider selon nous la conception et la mise en œuvre des simulateurs d'aides publiques :

### 1. Lisibilité
Toute règle doit pouvoir être expliquée à un non-juriste. Une modélisation lisible est une condition de confiance.

**Approches éprouvées** : Publicodes (syntaxe YAML lisible), documentation intégrée aux règles.

### 2. Vérifiabilité
Chaque condition de calcul doit être **traçable** jusqu'à sa source réglementaire. Les formules et variables doivent être documentées et testables.

**Approches éprouvées** : références légales systématiques ([code-du-travail](https://beta.gouv.fr/startups/codedutravail.html), [mon-entreprise](https://beta.gouv.fr/startups/mon-entreprise.html), [mes-aides-reno](https://beta.gouv.fr/startups/mesaidesreno.html)).

### 3. Maintenabilité
Le simulateur doit pouvoir **évoluer au rythme du droit**. Cela suppose des modèles modulaires, versionnés et testés automatiquement.

**Approches éprouvées** : ADR (Architecture Decision Records), CHANGELOG actif.

### 4. Interopérabilité
Les aides publiques s'articulent entre elles. Il faut encourager la **mise en commun des modèles**, afin de permettre des simulateurs multi-aides et des API partagées.

**Assets disponibles dans l'écosystème** :
- Plusieurs packages NPM publiés et réutilisables
- `@publicodes/forms` pour la liaison formulaire↔moteur Publicodes
- `@betagouv/survey-schema` pour les formulaires multi-moteur

### 5. Ouverture
L'ouverture du code et des modèles garantit la transparence, favorise la réutilisation et crée un apprentissage collectif.

Les projets de l'écosystème beta.gouv sont généralement open source, ce qui facilite le partage et la mutualisation.

## Protection des données personnelles

Les simulateurs d'aides collectent des données sensibles : revenus, situation familiale, santé, logement. Le cadre RGPD impose des obligations spécifiques.

### Minimisation des données

Ne demander que ce qui est strictement nécessaire au calcul. Un simulateur d'éligibilité n'a pas besoin du numéro de sécurité sociale. Si une question sert uniquement à affiner un montant de 5€, son utilité est discutable.

Trois approches coexistent :

- **Simulation anonyme** : aucune donnée stockée, calcul exécuté côté client. C'est le cas de [mon-entreprise](https://beta.gouv.fr/startups/mon-entreprise.html).
- **Pré-remplissage sans stockage** : les données sont récupérées via FranceConnect ou API Particulier, utilisées pour le calcul, puis oubliées.
- **Sauvegarde temporaire** : stockage chiffré pour permettre la reprise du parcours.

### FranceConnect et API Particulier

L'authentification FranceConnect permet de pré-remplir certaines données (revenus fiscaux, composition du foyer) via l'[API Particulier](https://particulier.api.gouv.fr/). Cela réduit la saisie et les erreurs, mais implique :

- Une habilitation préalable (délai : 2-4 semaines)
- Un périmètre de données justifié dans la demande
- Une gestion des cas où l'usager refuse ou n'a pas de compte

### Arbitrage précision vs confidentialité

Parfois, une question précise améliore le calcul mais peut être perçue comme intrusive. Exemple : demander le montant exact des pensions alimentaires versées permet un calcul juste, mais certains usagers préfèrent répondre par tranches.

La transparence aide : expliquer pourquoi une donnée est demandée, ce qu'elle permet de calculer, et ce qui se passe si on ne répond pas.

## Accessibilité numérique

Les simulateurs publics doivent respecter le [RGAA](https://accessibilite.numerique.gouv.fr/) (Référentiel Général d'Amélioration de l'Accessibilité). C'est une obligation légale, pas une option.

### Pièges fréquents des formulaires dynamiques

Les formulaires de simulation posent des défis spécifiques :

- **Questions dynamiques** : quand une question apparaît après une réponse, le lecteur d'écran ne l'annonce pas automatiquement. Solution : utiliser `aria-live` ou déplacer le focus.
- **Validation en temps réel** : les erreurs affichées au fil de la saisie peuvent ne pas être perçues. Regrouper les erreurs en résumé et les annoncer.
- **Résultats qui changent** : un montant qui se met à jour à chaque réponse est confusant pour la navigation clavier. Indiquer clairement les mises à jour.

### Le DSFR comme point de départ

Le [Système de Design de l'État](https://www.systeme-de-design.gouv.fr/) (DSFR) fournit des composants accessibles par défaut : champs de formulaire, boutons, alertes. Les utiliser réduit le risque d'erreur.

Attention : le DSFR couvre les composants de base, pas les interactions complexes spécifiques aux simulateurs (parcours conditionnels, résultats dynamiques). Ces parties restent à tester.

### Tester l'accessibilité

- **Automatique** : axe-core, Lighthouse (détecte ~30% des problèmes)
- **Manuel** : navigation clavier, lecteur d'écran (NVDA, VoiceOver)
- **Utilisateurs** : tests avec personnes concernées

## Une approche interdisciplinaire

La réussite d'un simulateur ne repose pas sur la technique seule. Elle dépend de la **convergence des expertises** :

- **Juridique** : Identifier, interpréter et traduire les conditions réglementaires
- **Design** : Transformer la logique administrative en parcours utilisateur clair
- **Technique** : Implémenter les modèles dans des moteurs de règles exécutables
- **Pilotage public** : Garantir la cohérence et la soutenabilité des choix

Cette approche impose une méthode de travail : **co-construire la règle** dès le départ avec ceux qui la traduiront en code.

Le texte réglementaire est écrit pour le contrôle, pas pour l'usage. Le citoyen, lui, a besoin de comprendre rapidement : *suis-je éligible, et à quoi ?*. En rapprochant juristes, designers et développeurs, on permet d'**aligner la logique du droit sur la logique de l'usager**.

### Le défi de la collaboration

Cette convergence ne va pas de soi. Les différents acteurs utilisent des **vocabulaires différents**, des **outils différents** et des **temporalités différentes** :

- L'expert métier raisonne en **cas particuliers** et **exceptions**
- Le designer pense en **parcours** et **compréhension**
- Le développeur structure en **modèles** et **tests**
- Le partenaire institutionnel arbitre selon des **contraintes politiques**

Sans outillage adapté, ces mondes peinent à communiquer efficacement. C'est pourquoi nous recommandons de :

1. **Établir un glossaire partagé** dès le début du projet → [Voir notre glossaire](/99_annexe/glossaire)
2. **Formaliser des cas types** validés par les experts métier → Format [shared-test-cases](/02_ecosysteme/02_outils#shared-test-cases)
3. **Documenter les interprétations** quand le texte est ambigu → [Registre d'interprétations](/02_ecosysteme/04_collaboration#le-registre-des-interpretations)
4. **Organiser des rituels réguliers** de synchronisation
5. **Adopter des ADR** pour capitaliser les décisions → [Exemple de mise en œuvre](/02_ecosysteme/04_collaboration#adr-architecture-decision-records---mon-entreprise)

::: tip Ressource complémentaire
Voir [Collaboration métier-produit](/02_ecosysteme/04_collaboration) pour un guide détaillé sur l'outillage de ces relations.
:::

## Les publics concernés

**Administrations centrales et opérateurs** : sécuriser et maintenir des simulateurs réglementaires. Cette documentation fournit méthode, outillage et référentiels communs.

**Collectivités territoriales** : développer ou adapter des aides locales. L'enjeu est la mutualisation et l'interopérabilité avec les dispositifs nationaux.

**Développeurs et designers publics** : construire des parcours de droit fiables. La documentation, les API et les tests sont les ressources clés.

**Chercheurs et observateurs du droit** : étudier la traduction des politiques publiques en code. Le corpus de règles ouvertes et traçables constitue un matériau d'analyse.