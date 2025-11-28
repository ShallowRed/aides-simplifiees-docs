# Outils et briques réutilisables

L'écosystème des simulateurs publics a produit de nombreux outils open source réutilisables. Cette page recense les principales briques disponibles.

## Moteurs de règles

### Publicodes

**Dépôt** : [github.com/publicodes/publicodes](https://github.com/publicodes/publicodes)

Moteur de règles déclaratif en YAML, optimisé pour la lisibilité et la contribution collaborative.

```yaml
# Exemple de règle Publicodes
aide . montant:
  formule:
    somme:
      - base
      - bonus si: conditions . prioritaire
```

**Points forts** :
- Syntaxe accessible aux non-développeurs
- Documentation intégrée aux règles
- Écosystème JavaScript riche

**Limitations** :
- Moins adapté aux modèles multi-entités complexes
- Écosystème npm (nécessite compétences JS)

### OpenFisca

**Dépôt** : [github.com/openfisca](https://github.com/openfisca)

Moteur de microsimulation économique, référence pour les systèmes socio-fiscaux.

```python
# Exemple de variable OpenFisca
class aide_montant(Variable):
    value_type = float
    entity = Individu
    definition_period = MONTH
    
    def formula(individu, period):
        return individu('revenu', period) * 0.1
```

**Points forts** :
- Modélisation fine des entités (individu, foyer, ménage)
- Validation économique et juridique solide
- API REST native

**Limitations** :
- Courbe d'apprentissage plus longue
- Stack Python côté serveur

## Génération de formulaires

### @publicodes/forms

**Dépôt** : [github.com/publicodes/publicodes](https://github.com/publicodes/publicodes) (packages/forms)

Génère automatiquement des formulaires React à partir de règles Publicodes.

**Caractéristiques** :
- Questions dérivées des métadonnées des règles
- Gestion des conditions d'affichage
- Personnalisation via composants React

### RuleInput (mon-entreprise)

Pattern développé par mon-entreprise pour générer des inputs typés depuis les règles Publicodes.

**Caractéristiques** :
- Composants React spécialisés par type de donnée
- Intégration design system
- Extensible

## Schémas déclaratifs

### Survey-schema (aides-simplifiees)

Format JSON/YAML pour décrire des questionnaires indépendamment du moteur de calcul.

```json
{
  "questions": [
    {
      "id": "age",
      "type": "number",
      "label": "Quel est votre âge ?",
      "validation": { "min": 0, "max": 120 }
    }
  ]
}
```

**Caractéristiques** :
- Découplage formulaire / moteur
- Multi-moteur natif
- Génération UI agnostique au framework

## Tests et validation

### Cas types YAML

Format émergent pour formaliser des fixtures métier lisibles par les experts.

```yaml
cas_types:
  - nom: "Situation type éligible"
    entrees:
      age: 25
      revenu: 1200
    sorties_attendues:
      eligible: true
      montant: 150
```

**Avantages** :
- Lisible par les experts métier
- Exécutable comme tests automatisés
- Traçable vers des situations réelles

### OpenFisca Test

Format de test intégré à OpenFisca pour valider les calculs.

```yaml
- name: Test aide logement
  period: 2024-01
  input:
    salaire: 1500
  output:
    aide_logement: 200
```

## Widgets et intégration

### transition-widget

Widget embarquable pour afficher les aides à la transition écologique.

**Caractéristiques** :
- Web component autonome
- 213 programmes configurés
- Intégrable en quelques lignes HTML

### Composants DSFR

Plusieurs projets utilisent le Design System de l'État (DSFR) via :
- `@codegouvfr/react-dsfr` (React)
- `@gouvfr/dsfr` (vanilla)
- `vue-dsfr` (Vue.js)

## Données et référentiels

### france-chaleur-urbaine

Données géographiques sur les réseaux de chaleur, réutilisées par plusieurs simulateurs.

### Base Adresse Nationale (BAN)

API d'autocomplétion d'adresses, intégrée dans de nombreux simulateurs.

## Bonnes pratiques de réutilisation

1. **Vérifier la licence** : la plupart sont sous licence MIT ou AGPL
2. **Évaluer la maintenance** : activité récente du dépôt, réactivité aux issues
3. **Contribuer en retour** : signaler les bugs, proposer des améliorations
4. **Documenter les adaptations** : faciliter la synchronisation avec l'upstream

::: tip Contribution
Vous connaissez un outil réutilisable non listé ? Proposez un ajout via [notre dépôt GitHub](https://github.com/betagouv/aides-simplifiees-docs).
:::

## Voir aussi

- [Panorama des projets](./01_panorama.md)
- [Patterns architecturaux](./03_patterns.md)
