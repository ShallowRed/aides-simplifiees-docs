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

| Public cible | Rôle | Ressources clé |
|---------------|-----------------|-----------------------|
| **Administrations centrales et opérateurs** | Sécuriser et maintenir des simulateurs réglementaires | Méthode, outillage, référentiels communs |
| **Collectivités territoriales** | Développer ou adapter des aides locales | Mutualisation et interopérabilité |
| **Développeurs et designers publics** | Construire des parcours de droit fiables | Documentation, API et tests |
| **Chercheurs / observateurs du droit** | Étudier la traduction des politiques publiques en code | Corpus de règles ouvertes et traçables |