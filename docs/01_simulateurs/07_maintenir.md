# Maintenir son simulateur

Concevoir un simulateur juste, c’est un premier pas. Le maintenir, c’est garantir qu’il **reste juste** au fil des évolutions réglementaires, techniques et sociétales.

## Pourquoi la maintenance est centrale

Les aides changent, les lois évoluent, les montants sont revalorisés, les barèmes révisés. Un simulateur non maintenu devient vite une **source d’erreur et de défiance**.

La maintenance assure :
- la **conformité réglementaire** (mise à jour des textes) ;
- la **fiabilité technique** (tests, intégrations, déploiements) ;  
- la **transparence** (documentation, traçabilité des versions).

## Les types de maintenance

Quatre types de maintenance coexistent :

- **Corrective** : corriger une erreur ou incohérence de calcul, dès détection.
- **Évolutive** : intégrer une nouvelle règle, un barème ou une exception, à chaque modification réglementaire.
- **Préventive** : anticiper les changements de structure ou de dépendances, typiquement chaque trimestre.
- **Améliorative** : optimiser performances ou lisibilité, en continu.

Chaque version doit être **datée, testée et publiée** avec un changelog clair.

## Détecter les changements réglementaires

La maintenance débute par la **veille juridique et administrative**.

### Sources principales :
- Journal officiel, Légifrance, BOFIP, circulaires ;
- Notes des opérateurs (CAF, MSA, etc.) ;
- Informations des ministères porteurs ou collectivités ;
- Retours terrain des agents et usagers.

### Organiser la veille

La veille s'organise à plusieurs échelles :

- **Quotidien** : alertes Légifrance automatisées, gérées par l'équipe technique.
- **Hebdomadaire** : revue des circulaires pertinentes par l'expert métier.
- **Mensuel** : point avec les partenaires institutionnels, porté par le product owner.
- **Trimestriel** : revue des évolutions anticipées en comité de pilotage.

> La veille est un travail collectif : chaque acteur du réseau contribue à la mise à jour.

::: tip Ressource complémentaire
Voir [Collaboration métier-produit](/02_ecosysteme/04_collaboration) pour des conseils détaillés sur l'organisation de la veille et le dialogue avec les partenaires.
:::

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
- Simuler les effets d'un futur barème avant sa publication ;

## Suivre le simulateur en production

La veille réglementaire ne suffit pas. Il faut aussi surveiller ce qui se passe en production.

### Métriques à suivre

Cinq indicateurs méritent un suivi régulier :

- **Taux de complétion** : un taux faible signale un parcours trop long ou une question bloquante. Outils : Matomo, Plausible.
- **Abandon par étape** : permet d'identifier précisément quelle question pose problème. Nécessite un tracking par événements.
- **Taux de rejet** : si 95% des utilisateurs sont inéligibles, le parcours cible-t-il le bon public ?
- **Erreurs JavaScript** : bugs non détectés en dev. Outils : Sentry, LogRocket.
- **Temps de calcul** : dégradation de performance du moteur. Outils : APM (Datadog, New Relic).

### Détecter les incohérences

Certaines anomalies ne génèrent pas d'erreur technique mais signalent un problème :

- **Montants aberrants** : un APL de 2000€/mois indique probablement une erreur de saisie ou de calcul
- **Taux de rejet anormalement haut**
- **Pics d'usage inattendus** : campagne de communication non anticipée, article de presse

### Retours utilisateurs

Le formulaire de contact ou de feedback en fin de parcours est une source d'information sous-exploitée. Les retours révèlent souvent des cas non couverts ou des formulations confuses.

Organiser une revue mensuelle des retours avec l'équipe produit permet d'alimenter le backlog.

## En résumé
Maintenir, c'est :
- garantir la conformité et la durabilité des simulateurs ;
- documenter et versionner chaque changement ;
- surveiller, prévenir et améliorer continuellement.

## Pour approfondir

- [Les fondamentaux de la fabrique de simulateurs](/01_simulateurs/01_fondamentaux)
- [Collaboration métier-produit](/02_ecosysteme/04_collaboration) — Organisation de la veille réglementaire
- [Panorama des simulateurs](/02_ecosysteme/01_panorama) — Comment les autres projets gèrent la maintenance
- [Consulter le glossaire](/99_annexe/glossaire)