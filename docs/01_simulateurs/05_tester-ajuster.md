# Tester son modèle/simulateur et ajuster

Une fois le modèle implémenté, il est crucial de le valider pour s'assurer qu'il répond aux besoins des utilisateurs et respecte la réglementation.

Un simulateur n’est jamais “fini”. Chaque évolution du droit, chaque retour d’usager, chaque correction produit une nouvelle version du modèle. Tester et ajuster, c’est **garantir la fiabilité, la compréhension et la confiance**.

## Pourquoi tester ?

Les tests ne servent pas uniquement à corriger des bugs.  
Ils assurent que :
- le **calcul** est conforme à la réglementation ;  
- le **parcours** est compréhensible et accessible ;  
- la **restitution** correspond à l’intention de politique publique.

Les tests sont donc à la fois :
- **techniques** (précision du code) ;  
- **métier** (validité du modèle) ;  
- **expérience utilisateur** (utilisabilité et confiance).

## Types de tests à réaliser

### Tests automatisés/calcul avec expert métier

#### a. Tests unitaires
Ils vérifient le bon fonctionnement des formules et des conditions isolées. Chaque variable doit être testée avec plusieurs cas (valeurs limites, exceptions, erreurs de saisie).

#### b. Tests d’intégration
Ils vérifient que les modèles d’aides fonctionnent ensemble (dans un simulateur multi-aide, par exemple). Ces tests détectent les incohérences entre aides et les régressions croisées.

#### c. Tests de non-régression
Ils sont garants de la stabilité dans le temps : après une mise à jour réglementaire, ils comparent les nouveaux résultats avec la version précédente.

### Revue par un expert juridique/métier

Les modèles doivent être validés par un expert avant et après implémentation. La relecture croisée permet de détecter les erreurs d’interprétation, les oublis et les ambiguïtés.

Permettre à un expert de faire passer des cas réels (dossiers traités manuellement) est un excellent moyen de valider la conformité.

Organiser des ateliers réguliers de revue entre modeleurs et experts est une bonne pratique pour maintenir la qualité.

### Formaliser les cas types métier

Au-delà des tests techniques, il est recommandé de formaliser des **cas types métier** (ou « fixtures métier ») : des situations représentatives définies avec les experts, servant à la fois de spécification et de test de non-régression.

Exemple de format YAML :

```yaml
cas_types:
  - nom: "Jeune alternant éligible Mobili-Jeunes"
    situation:
      age: 22
      contrat: alternance
      revenu_mensuel: 900
      loyer: 450
    resultat_attendu:
      eligible: true
      montant_estime: 100
    source: "Dossier traité CAF - Réf. 2024-1234"
```

Ces cas types permettent :
- Une **communication partagée** entre développeurs et experts métier
- Une **validation continue** à chaque modification des règles
- Une **traçabilité** vers des situations réelles anonymisées

### Formats de cas types dans l'écosystème

L'audit des simulateurs publics révèle deux formats matures pour partager des cas types :

#### Format LexImpact (84 cas types)

Le projet leximpact utilise un format JSON avec expressions calculées et périodes :

```json
{
  "id": "007_aah",
  "description": "Personne en situation de handicap avec AAH",
  "dixieme": 2,
  "individus": {
    "Adulte 1": {
      "taux_incapacite": { "year": 0.8 },
      "handicap": { "year": true },
      "salaire_de_base": { "year": "Math.round(smic * 0.5)" }
    }
  }
}
```

**Points forts** : 84 cas couvrant les 10 déciles de revenus INSEE, expressions calculées (Math.round, smic), périodes temporelles.

#### Format shared-test-cases (aides-simplifiees)

Format JSON traçant le flux complet formulaire → moteur → résultat :

```json
{
  "name": "Alternant éligible APL",
  "metadata": {
    "validated_by": "expert_caf",
    "validated_at": "2025-01-15",
    "source_reference": "Dossier 2024-1234"
  },
  "survey_answers": { "age": 22, "contrat": "alternance" },
  "openfisca_request": { "individus": { "demandeur": { "age": { "2025-01": 22 } } } },
  "openfisca_response": { "apl": { "2025-01": 150 } }
}
```

**Points forts** : Traçabilité complète du flux, validation experte avec metadata, réutilisable entre projets OpenFisca.

::: tip Recommandation
Combiner les deux formats pour créer un standard commun de cas types avec :
- La couverture socio-démographique de LexImpact
- La traçabilité et validation experte de shared-test-cases
:::

### Tests UX et compréhension usager

Même si le calcul est juste, l’interface peut trahir la règle. Les tests utilisateurs visent à mesurer la compréhension, la fluidité et la perception de fiabilité du simulateur.

Méthodologie recommandée :
1. Tests exploratoires en amont pour identifier les incompréhensions ;
2. Tests dirigés sur des parcours précis (questionnaires, résultats) ;
3. Tests comparatifs avant/après modification.

Quelques indicateurs observables :
- temps moyen pour terminer la simulation ;
- taux de complétion ;
- nombre de retours arrière ou d’abandons ;
- qualité de compréhension des résultats (auto-évaluation).

## Outils et protocoles

Tests techniques :
- Pytest / Jest / Mocha : frameworks standards pour exécuter les tests unitaires et d’intégration.
- Cypress, Playwright : pour tester les parcours complets dans le navigateur.
- CI/CD (GitHub Actions, GitLab CI) : pour automatiser les tests à chaque commit.

Tests utilisateurs :
-	Sessions en présentiel : tests accompagnés, micro-entretiens, observation non intrusive.
-	Maze, Useberry, Lookback : outils pour observer les comportements à distance.
-	Heatmaps (Hotjar) : pour repérer les zones d’hésitation.

## Interpréter les résultats et ajuster

Chaque test doit produire :
	•	une fiche de constat (ce qui fonctionne / ce qui bloque) ;
	•	une proposition d’ajustement (technique, contenu, design) ;
	•	un niveau de priorité (bloquant, mineur, amélioration continue).

Exemple d’ajustement

```csv
Problème observé, Ajustement proposé, Impact attendu
Question “rattaché au foyer” incomprise, Reformuler : “Êtes-vous fiscalement à la charge de vos parents ?”, Compréhension accrue, moins d’erreurs,
Parcours jugé trop long, Grouper les questions par thème, Réduction du taux d’abandon
Résultat perçu comme improbable, Ajouter un lien “Comprendre le calcul”, Renforcement de la confiance, 
```

## Tests post-lancement

Les tests ne s’arrêtent pas à la mise en ligne. Un simulateur public doit être monitoré en continu pour détecter les anomalies et évolutions d’usage.

Indicateurs clés :
- Taux d’erreur serveur (5xx) ;
- Temps moyen de réponse ;
- Nombre de simulations réalisées / jour ;
- Feedbacks utilisateurs (taux de satisfaction, verbatims).

## En résumé

Tester et ajuster, c’est :
- garantir la justesse des calculs ;
- s’assurer de la compréhension des règles ;
- construire la confiance entre usagers, développeurs et décideurs.

## Prochaines étapes

- [Maintenir votre simulateur dans le temps](/01_simulateurs/06_maintenir) - Garantir la pérennité
- [Consulter le glossaire](/99_annexe/glossaire) - Définitions des termes techniques
