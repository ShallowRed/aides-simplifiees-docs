# Les fondamentaux de la fabrique de simulateurs d’aides publiques

## Les principes fondateurs

Cinq principes doivent guider selon nous la conception et la mise en œuvre des simulateurs d’aides publiques :

### 1. Lisibilité
Toute règle doit pouvoir être expliquée à un non-juriste. Une modélisation lisible est une condition de confiance.

### 2. Vérifiabilité
Chaque condition de calcul doit être **traçable** jusqu’à sa source réglementaire. Les formules et variables doivent être documentées et testables.

### 3. Maintenabilité
Le simulateur doit pouvoir **évoluer au rythme du droit**. Cela suppose des modèles modulaires, versionnés et testés automatiquement.

### 4. Interopérabilité
Les aides publiques s’articulent entre elles. Il faut encourager la **mise en commun des modèles**, afin de permettre des simulateurs multi-aides et des API partagées.

### 5. Ouverture
L’ouverture du code et des modèles garantit la transparence, favorise la réutilisation et crée un apprentissage collectif.

## Une approche interdisciplinaire

La réussite d’un simulateur ne repose pas sur la technique seule. Elle dépend de la **convergence des expertises** :

| Domaine | Rôle |
|----------|----------------------|
| **Juridique** | Identifier, interpréter et traduire les conditions réglementaires |
| **Design** | Transformer la logique administrative en parcours utilisateur clair |
| **Technique** | Implémenter les modèles dans des moteurs de règles exécutables |
| **Pilotage public** | Garantir la cohérence et la soutenabilité des choix |

Cette approche impose une méthode de travail : **co-construire la règle** dès le départ avec ceux qui la traduiront en code.

Le texte réglementaire est écrit pour le contrôle, pas pour l’usage. Le citoyen, lui, a besoin de comprendre rapidement : *suis-je éligible, et à quoi ?*. En rapprochant juristes, designers et développeurs, on permet d’**aligner la logique du droit sur la logique de l’usager**.

## Les publics concernés

| Public cible | Rôle | Ressources clé |
|---------------|-----------------|-----------------------|
| **Administrations centrales et opérateurs** | Sécuriser et maintenir des simulateurs réglementaires | Méthode, outillage, référentiels communs |
| **Collectivités territoriales** | Développer ou adapter des aides locales | Mutualisation et interopérabilité |
| **Développeurs et designers publics** | Construire des parcours de droit fiables | Documentation, API et tests |
| **Chercheurs / observateurs du droit** | Étudier la traduction des politiques publiques en code | Corpus de règles ouvertes et traçables |