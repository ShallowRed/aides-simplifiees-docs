# Les enjeux de la modélisation d’aides publiques

## Un cadre : le Rules as Code

Le concept de **Rules as Code (RaC)** consiste à représenter la règle juridique sous une forme **formelle et exécutable**, tout en préservant sa lisibilité pour les juristes et citoyens.  
Cette approche permet de créer un **jumeau numérique de la réglementation**, sur lequel il devient possible de :
- simuler des situations ;
- vérifier la cohérence d’une politique publique ;
- produire automatiquement des services (simulateurs, API, préremplissages…).

Le **Rules as code** explore une idée simple : et si les règles administratives pouvaient être **conçues, testées et maintenues comme du code** ?

L’objectif n’est pas de “digitaliser” la réglementation, mais de **la rendre opérable** : lisible par les humains, exécutable par les machines, et gouvernable collectivement. C’est dans cette articulation entre droit, conception et informatique que se déploie le Rules as Code.

## Pourquoi modéliser les aides publiques ?

La modélisation des aides n’est pas une qu'une question technique. C’est un **enjeu de politique publique** : rendre les droits sociaux accessibles, compréhensibles et exécutables sans perte de sens.

Les dispositifs d’aide se multiplient, se croisent, parfois se contredisent, résultant en :
- des règles trop complexes pour les usagers ;
- trop mouvantes pour les agents ;
- trop coûteuses à maintenir pour les développeurs publics.

> **Modéliser les aides**, c’est retrouver la capacité collective à comprendre ce que l’on finance, à mesurer l’impact réel des politiques publiques et à garantir l’égalité d’accès aux droits.

### 1. Un besoin d’équité et de lisibilité

Près d’un tiers des personnes éligibles à une aide publique ne la perçoivent pas, non par choix, mais faute d’information ou de compréhension du dispositif.

Les raisons sont connues :
- méconnaissance des critères d’éligibilité ;
- complexité du vocabulaire administratif ;
- multiplicité des formulaires et guichets ;
- peur de l’erreur ou du contrôle.

> **Le Rules as Code est un levier d’accessibilité et d’inclusion numérique**

### 2. Un besoin de cohérence et de réutilisation

Chaque aide publique repose sur sa propre architecture : textes, décrets, circulaires, instructions, exceptions locales, produisant des règles **sans mémoire commune**, où les mêmes conditions peuvent être redéfinies des dizaines de fois.

Modéliser les aides, c’est construire **un socle partagé** : un ensemble de briques logiques réutilisables (revenu fiscal de référence, âge, statut, résidence, etc.) que chacun peut invoquer sans les redéfinir.

> Le Rules as Code est un **levier de mutualisation et d’interopérabilité entre acteurs publics**.

### 3. Un besoin de transparence et de traçabilité

Les règles sont déjà traduites en code, souvent de manière implicite, dans des systèmes fermés. Or, quand le droit s'exprime à travers des programmes informatiques, leurs **lisibilités deviennent un enjeu démocratique**.

Publier les modèles de calcul, c’est permettre :
- la vérification citoyenne des conditions d’attribution ;
- l’auditabilité des décisions automatisées ;
- la comparaison des politiques publiques entre territoires ou périodes.

> Le Rules as Code est un levier de **transparence et de confiance** envers les institutions.

### 4. Un besoin de soutenabilité

Chaque modification de décret peut entraîner des heures de développement, chaque changement de barème impose une chaîne de vérification manuelle.

En produisant des **modèles explicites**, testés et documentés, on transforme un coût récurrent en investissement collectif : une fois codée, la règle peut être réutilisée, adaptée, versionnée.

> Le Rules as Code est un levier d’**efficience budgétaire et de continuité administrative**.

### 5. Un besoin d’alignement entre le droit et l’expérience

## Des tensions à assumer

Formaliser les règles, c’est aussi accepter plusieurs tensions :

| Tension | Description | Posture proposée |
|----------|--------------|------------------|
| **Lisibilité vs exhaustivité** | Simplifier sans trahir le texte | Adopter une granularité progressive (niveau 1 : critères principaux, niveau 2 : exceptions) |
| **Automatisation vs accompagnement humain** | Le simulateur ne remplace pas le conseiller | Intégrer des points de contact et rediriger vers les services compétents |
| **Réutilisation vs spécificité locale** | Mutualiser sans uniformiser | Isoler les règles “communes” et documenter les “dérivées” locales |
| **Innovation vs sécurité juridique** | Expérimenter sans fragiliser le droit | Travailler sous supervision juridique et publier les modèles avec disclaimers explicites |

> Le Rules as Code n’est pas une panacée. C’est un levier parmi d’autres pour repenser la relation entre droit, administration et usagers.

## Des enjeux politiques et éthiques

Formaliser le droit, c’est aussi le rendre manipulable. Le Rules as code soulève donc des questions de **gouvernance algorithmique** :
- qui décide de la version "référence" d’une règle ?
- comment garantir la neutralité du calcul ?
- comment signaler les zones d’incertitude ou d’interprétation ?

Ces sujets de gouvernance sont cruciaux dans les projets de Rules as Code : chaque modèle doit par exemple être associé à une source juridique, une date de validité et un responsable de publication.  

## Prochaines étapes

- [Découvrir comment nous modélisons les simulateurs](/simulateurs/)
- [Comprendre l'importance de la modélisation](/simulateurs/importance-modelisation)
