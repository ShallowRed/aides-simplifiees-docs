# Standards et formats partagés

Les standards et formats partagés facilitent l'interopérabilité entre projets et accélèrent le développement. Cette page documente les formats recommandés pour l'écosystème des simulateurs d'aides.

## Format de personas de test

### Objectif
Disposer de cas types validés métier, réutilisables et exécutables automatiquement pour tester les simulateurs.

### Structure YAML recommandée

```yaml
personas:
  - id: famille-monoparentale-1-enfant
    nom: "Parent isolé avec un enfant"
    description: "Situation fréquente : parent seul avec un enfant de 5 ans, revenus modestes"
    source: "CAF - cas type 2024"
    variables:
      composition_foyer:
        adultes: 1
        enfants: 1
        age_enfant_1: 5
      situation_professionnelle:
        statut: "salarie"
        revenus_mensuels_nets: 1400
      logement:
        type: "locataire"
        loyer_mensuel: 650
        zone: "zone_2"
      fiscal:
        rfr: 16800
        annee_reference: 2023
    resultats_attendus:
      apl:
        eligible: true
        montant_estime: 280
      prime_activite:
        eligible: true
        montant_estime: 185
      allocation_rentree_scolaire:
        eligible: false  # enfant trop jeune
        
  - id: etudiant-non-rattache
    nom: "Étudiant non rattaché au foyer fiscal"
    description: "Étudiant de 22 ans, non rattaché fiscalement, job étudiant"
    source: "CROUS - cas type 2024"
    variables:
      composition_foyer:
        adultes: 1
        enfants: 0
      situation:
        statut: "etudiant"
        age: 22
        rattache_foyer_fiscal_parents: false
      revenus:
        salaire_annuel: 7500
      logement:
        type: "locataire"
        loyer_mensuel: 400
        residence_crous: false
    resultats_attendus:
      apl_etudiant:
        eligible: true
        montant_estime: 150
      bourses_crous:
        eligible: true
        echelon_estime: 4
```

### Utilisation

**Pour les tests automatisés** :
```python
# Exemple avec OpenFisca
import yaml
from openfisca_core.simulation_builder import SimulationBuilder

with open('personas.yml', 'r') as f:
    personas = yaml.safe_load(f)['personas']

for persona in personas:
    simulation = SimulationBuilder().build_from_dict(
        tax_benefit_system,
        persona['variables']
    )
    # Vérifier les résultats attendus
    for aide, attendu in persona['resultats_attendus'].items():
        resultat = simulation.calculate(aide, periode)
        assert resultat == attendu['montant_estime']
```

**Pour la documentation** :
Les personas servent aussi de documentation vivante des cas d'usage principaux.

### Personas types à disposition

Un ensemble de 50-100 cas types validés est en cours de constitution, couvrant :
- Familles monoparentales (différentes configurations)
- Jeunes (étudiants, apprentis, primo-accédants)
- Seniors (retraités, dépendance)
- Travailleurs (salariés, indépendants, temps partiel)
- Situations spécifiques (handicap, expatriés, etc.)

::: tip Contribuer
Vous avez des personas validés ? Partagez-les via une [pull request](https://github.com/betagouv/aides-simplifiees-docs/pulls) !
:::

## Template de modélisation d'aide

### Objectif
Structurer la documentation d'une aide de manière standardisée pour faciliter la compréhension et la réutilisation.

### Structure recommandée

```markdown
# [Nom de l'aide]

## Métadonnées
- **Organisme gestionnaire** : [CAF / Pôle emploi / CNAV / etc.]
- **Source juridique** : [Article de loi, décret, arrêté]
- **Dernière mise à jour** : [Date]
- **Responsable modélisation** : [Nom/équipe]
- **Statut** : [Brouillon / En validation / Validé / En production]

## Description
[Description en langage naturel de l'aide et de son objectif]

## Conditions d'éligibilité

### Conditions générales
- [ ] Condition 1 (source : [référence])
- [ ] Condition 2 (source : [référence])
- [ ] Condition 3 (source : [référence])

### Conditions spécifiques
- [ ] Si [situation], alors [condition supplémentaire]

### Exclusions
- ❌ [Cas d'exclusion 1]
- ❌ [Cas d'exclusion 2]

## Variables nécessaires

| Variable | Type | Source | Obligatoire | Valeur par défaut |
|----------|------|--------|-------------|-------------------|
| age | Nombre | Saisie usager | Oui | - |
| revenus_n_moins_1 | Nombre | API impots ou saisie | Oui | - |
| composition_foyer | Enum | Saisie usager | Oui | - |

## Formule de calcul

### Montant de base
```
montant_base = [formule]
```

### Majorations
```
si condition_1:
    majoration += montant_1
si condition_2:
    majoration += montant_2
```

### Plafonnement
```
montant_final = min(montant_base + majorations, plafond)
```

## Cas particuliers et edge cases

### Rétroactivité
[Comment gérer les demandes rétroactives]

### Cumul avec autres aides
- ✅ Cumulable avec : [liste]
- ❌ Non cumulable avec : [liste]
- ⚠️ Cumul partiel avec : [conditions]

### Changement de situation
[Comment gérer les changements en cours de période]

## Personas de test
- [Lien vers persona 1]
- [Lien vers persona 2]

## Points d'attention
- ⚠️ [Point d'attention 1]
- ⚠️ [Point d'attention 2]

## Historique des modifications
| Date | Version | Modification | Auteur |
|------|---------|--------------|--------|
| 2024-01 | 1.0 | Création initiale | [Nom] |

## Références
- [Lien vers texte officiel]
- [Lien vers documentation organisme]
- [Lien vers implémentation code]
```

### Exemples disponibles

Des exemples complets de modélisation sont disponibles pour :
- APL (Aide Personnalisée au Logement)
- Prime d'activité
- RSA (Revenu de Solidarité Active)
- Allocation de rentrée scolaire

## Format d'échange de questions (Survey Schema)

Pour faciliter l'interopérabilité entre simulateurs, un format JSON standardisé est proposé :

```json
{
  "survey": {
    "id": "aides-logement-2024",
    "version": "1.0",
    "metadata": {
      "title": "Simulateur aides au logement",
      "description": "Questions pour calculer l'éligibilité aux APL",
      "provider": "CAF",
      "last_updated": "2024-01-15"
    },
    "questions": [
      {
        "id": "composition_foyer",
        "type": "choice",
        "label": "Quelle est la composition de votre foyer ?",
        "help_text": "Comptez uniquement les personnes vivant avec vous",
        "required": true,
        "options": [
          {"value": "seul", "label": "Seul(e)"},
          {"value": "couple_sans_enfant", "label": "En couple sans enfant"},
          {"value": "couple_avec_enfants", "label": "En couple avec enfant(s)"},
          {"value": "parent_isole", "label": "Parent isolé"}
        ],
        "conditions": null
      },
      {
        "id": "nombre_enfants",
        "type": "number",
        "label": "Combien d'enfants à charge ?",
        "required": true,
        "min": 1,
        "max": 10,
        "conditions": {
          "show_if": "composition_foyer in ['couple_avec_enfants', 'parent_isole']"
        }
      },
      {
        "id": "revenus_mensuels",
        "type": "number",
        "label": "Quel est le total de vos revenus mensuels nets ?",
        "help_text": "Salaires, revenus de remplacement, pensions...",
        "required": true,
        "unit": "€",
        "min": 0,
        "conditions": null
      }
    ]
  }
}
```

### Avantages du format standardisé
- Réutilisation des questions entre projets
- Génération automatique d'interfaces
- Tests cross-platform
- Documentation unifiée

## Validation et adoption

Ces formats sont proposés et évolueront selon les retours des équipes. L'adoption est **volontaire** et progressive.

### Feuille de route
- **Q1 2025** : Expérimentation avec 2-3 équipes pilotes
- **Q2 2025** : Ajustements basés sur les retours
- **Q3 2025** : Généralisation si adoption > 50%

::: info Feedback
Vos retours sont essentiels ! Partagez votre expérience sur [Slack #domaine-aides-simulateurs](https://example.com) ou via une [issue GitHub](https://github.com/betagouv/aides-simplifiees-docs/issues).
:::
