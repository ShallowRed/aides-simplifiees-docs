# Maintenir son modèle/simulateur

La maintenance d'un simulateur d'aide publique est un enjeu critique : les règles évoluent, les usages changent, les technologies vieillissent. Cette section présente les stratégies pour assurer la pérennité de votre outil.

::: info Section en cours de rédaction
Cette section sera enrichie prochainement avec nos retours d'expérience sur la maintenance de simulateurs en production.
:::

## Enjeux de la maintenance

### Évolutions réglementaires

Les textes de loi évoluent régulièrement :
- **Loi de finances annuelle** : Modification des barèmes et plafonds
- **Réformes sectorielles** : Changement des critères d'éligibilité
- **Décrets d'application** : Précisions sur les modalités
- **Circulaires** : Instructions aux services

### Évolutions techniques

- **Mises à jour de sécurité** : Frameworks et dépendances
- **Obsolescence** : Technologies qui ne sont plus maintenues  
- **Performance** : Optimisation face à l'augmentation du trafic
- **Nouvelles fonctionnalités** : Demandes utilisateurs

### Évolutions des usages

- **Nouveaux publics** : Extension du périmètre d'usage
- **Nouveaux canaux** : Intégration dans d'autres services
- **Attentes utilisateurs** : Amélioration continue de l'UX

## Stratégies de maintenance

### Maintenance préventive

#### Veille réglementaire
- **Abonnement** aux sources officielles (JO, circulaires)
- **Réseau** d'experts métier pour alertes précoces
- **Calendrier** des évolutions connues à l'avance

#### Architecture évolutive
- **Séparation** données/logique de calcul
- **Modularité** : Règles indépendantes
- **Configuration** : Paramètres externalisés
- **Tests automatisés** : Détection rapide des régressions

### Maintenance corrective

#### Processus de mise à jour
1. **Détection** du changement réglementaire
2. **Analyse** de l'impact sur le modèle
3. **Modification** du code et des tests
4. **Validation** par l'expert métier
5. **Tests** de non-régression
6. **Déploiement** progressif
7. **Monitoring** post-déploiement

#### Gestion des urgences
- **Procédure d'urgence** : Déploiement rapide si nécessaire
- **Rollback** : Retour en arrière en cas de problème
- **Communication** : Information des utilisateurs

## Organisation de la maintenance

### Rôles et responsabilités

#### Expert métier
- **Veille réglementaire** active
- **Validation** des évolutions
- **Tests** de cohérence métier

#### Développeur
- **Implémentation** des changements
- **Tests techniques** automatisés
- **Monitoring** technique

#### Product owner
- **Priorisation** des évolutions
- **Communication** avec les utilisateurs
- **Arbitrage** en cas de conflit

### Fréquence et planification

#### Maintenance régulière
- **Revue mensuelle** : Évolutions mineures
- **Revue trimestrielle** : Évolutions majeures planifiées
- **Revue annuelle** : Roadmap et architecture

#### Maintenance réactive
- **Sous 48h** : Correction d'erreurs bloquantes
- **Sous 1 semaine** : Évolutions réglementaires urgentes
- **Sous 1 mois** : Améliorations UX importantes

## Outils de maintenance

### Monitoring et alertes

#### Monitoring technique
```yaml
Métriques à surveiller:
  - Temps de réponse API
  - Taux d'erreur 5xx
  - Utilisation des ressources
  - Disponibilité du service

Alertes configurées:
  - Temps de réponse > 2s
  - Taux d'erreur > 1%
  - Indisponibilité > 1 min
```

#### Monitoring métier
```yaml
Métriques métier:
  - Taux de conversion par étape
  - Distribution des résultats
  - Feedback utilisateurs négatifs
  - Comparaison avec calculs manuels

Alertes métier:
  - Variation > 20% des résultats
  - Pic d'abandons inexpliqué
  - Feedback négatif > seuil
```

### Versioning et déploiement

#### Gestion des versions
- **Semantic versioning** : MAJOR.MINOR.PATCH
- **Branches** : feature/hotfix/release
- **Tags** : Marquage des versions stables
- **Changelog** : Documentation des évolutions

#### Déploiement
- **CI/CD** : Automatisation des tests et déploiements
- **Blue/Green** : Déploiement sans interruption
- **Feature flags** : Activation progressive des nouveautés
- **Rollback automatique** : En cas de détection d'anomalie

## Documentation de maintenance

### Documentation technique

#### Architecture Decision Records (ADR)
```markdown
# ADR-001 : Choix du moteur de règles

## Statut
Accepté

## Contexte
Besoin de modéliser des règles complexes...

## Décision
Utilisation d'OpenFisca pour...

## Conséquences
- Avantages : ...
- Inconvénients : ...
- Risques : ...
```

#### Runbooks
- **Procédures de déploiement** pas à pas
- **Résolution d'incidents** courants
- **Contacts** d'escalade
- **Checklist** de validation

### Documentation métier

#### Mapping réglementaire
```yaml
Variable: age_demandeur
Source: Article L123-4 du Code X
Définition: "Âge au moment de la demande"
Évolutions:
  - 2023-01-01: Passage de 25 à 30 ans max
  - 2024-07-01: Ajout d'exceptions pour...
Tests: scenario_age_limite.yaml
```

#### Journal des modifications
- **Date** de l'évolution
- **Source** réglementaire
- **Impact** sur les calculs
- **Tests** de validation effectués

## Stratégies de migration

### Migration de données

#### Évolution de modèle
Quand la structure des données change :
1. **Version intermédiaire** : Support des deux formats
2. **Migration progressive** : Conversion au fil de l'usage
3. **Nettoyage** : Suppression de l'ancien format

#### Évolution de calcul
Quand les règles de calcul changent :
1. **Rétrocompatibilité** : Maintien des anciens calculs pour l'historique
2. **Migration en lot** : Recalcul des situations impactées
3. **Communication** : Information des utilisateurs sur les changements

### Évolution d'architecture

#### Refactoring progressif
- **Strangler pattern** : Remplacement progressif
- **Branch by abstraction** : Nouvelle implémentation en parallèle
- **Feature flags** : Bascule contrôlée

## Bonnes pratiques

### Anticipation

#### Design for change
- **Paramétrage** : Barèmes et seuils externalisés
- **Modularité** : Règles indépendantes quand possible
- **Abstractions** : Interfaces stables même si l'implémentation change

#### Tests de régression
- **Scénarios de référence** : Cas types qui ne doivent jamais changer
- **Tests automatisés** : Exécution à chaque modification
- **Baseline** : Référence pour détecter les dérives

### Communication

#### Avec les utilisateurs
- **Changelog public** : Évolutions visibles par tous
- **Notifications** : Alertes sur les changements importants
- **Support** : Canal de feedback et d'aide

#### Avec l'équipe
- **Stand-ups** : Point régulier sur la maintenance
- **Post-mortems** : Analyse des incidents
- **Partage de connaissance** : Documentation et formation

### Amélioration continue

#### Métriques de qualité
- **MTTR** (Mean Time To Repair) : Temps de résolution des incidents
- **MTBF** (Mean Time Between Failures) : Fiabilité du système
- **Lead time** : Temps entre demande et livraison d'évolution

#### Retrospectives
- **Identification** des points d'amélioration
- **Expérimentation** de nouvelles pratiques
- **Mesure** de l'impact des changements

::: tip Conseil pratique
Investissez dans l'automatisation des tests et du déploiement dès le début. Le temps gagné sur la maintenance compensera largement l'effort initial.
:::

## Cas particuliers

### Fin de vie d'un simulateur

Quand un simulateur n'est plus maintenu :
1. **Communication** : Préavis aux utilisateurs
2. **Archives** : Sauvegarde des données et calculs
3. **Redirection** : Vers les outils de remplacement
4. **Documentation** : Conservation de la logique métier

### Changement d'équipe

Pour assurer la continuité :
1. **Formation** de la nouvelle équipe
2. **Transfert** de la documentation
3. **Shadowing** : Période de doublonnage
4. **Tests** : Validation de la prise en main

## Prochaines étapes

- [Consulter le glossaire des termes techniques](/glossaire)
- [Découvrir l'historique des simulateurs publics](/historique)
- [Retourner à la vue d'ensemble des simulateurs](/simulateurs/)
