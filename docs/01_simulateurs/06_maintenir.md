# Maintenir son simulateur

Concevoir un simulateur juste, c’est un premier pas. Le maintenir, c’est garantir qu’il **reste juste** au fil des évolutions réglementaires, techniques et sociétales.

## Pourquoi la maintenance est centrale

Les aides changent, les lois évoluent, les montants sont revalorisés, les barèmes révisés. Un simulateur non maintenu devient vite une **source d’erreur et de défiance**.

La maintenance assure :
- la **conformité réglementaire** (mise à jour des textes) ;
- la **fiabilité technique** (tests, intégrations, déploiements) ;  
- la **transparence** (documentation, traçabilité des versions).

## Les types de maintenance

| Type | Objectif | Fréquence |
|------|-----------|-----------|
| **Corrective** | Corriger une erreur ou incohérence de calcul | Dès détection |
| **Évolutive** | Intégrer une nouvelle règle, barème ou exception | À chaque modification réglementaire |
| **Préventive** | Anticiper les changements (structure, dépendances) | Trimestrielle |
| **Améliorative** | Optimiser les performances ou la lisibilité | Continue |

Chaque version doit être **datée, testée et publiée** avec un changelog clair.

## Détecter les changements réglementaires

La maintenance débute par la **veille juridique et administrative**.

### Sources principales :
- Journal officiel, Légifrance, BOFIP, circulaires ;
- Notes des opérateurs (CAF, MSA, etc.) ;
- Informations des ministères porteurs ou collectivités ;
- Retours terrain des agents et usagers.

> La veille est un travail collectif : chaque acteur du réseau contribue à la mise à jour.

## Mettre à jour le simulateur

### Étapes recommandées :
2. **Analyser l’impact** sur les variables et formules ;  
3. **Modifier le modèle** (ajout, retrait, ajustement) ;  
4. **Valider par le métier et tests** (conformité et cohérence) ;  
5. **Déployer** en production avec suivi.
6. **Publier un changelog** détaillant les modifications.

## Anticiper les évolutions

Recommandations :
- Paramétrer les barèmes et seuils dans des fichiers séparés ;
- Documenter les liens entre règles et décrets ;
- Prévoir les prochaines révisions réglementaires connues ;
- Simuler les effets d’un futur barème avant sa publication ;

## En résumé
Maintenir, c'est :
- garantir la conformité et la durabilité des simulateurs ;
- documenter et versionner chaque changement ;
- surveiller, prévenir et améliorer continuellement.

## Pour approfondir

- [Les fondamentaux de la fabrique de simulateurs](/01_simulateurs/01_fondamentaux)
- [Consulter le glossaire](/99_annexe/glossaire).