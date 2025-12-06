````markdown
# Outils et briques réutilisables

L'écosystème des simulateurs publics produit des outils open source qu'on peut réutiliser dans d'autres projets. Cette page fait le tour de ce qui est disponible.

## Les deux moteurs de règles principaux

### Publicodes

Développé initialement pour mon-entreprise, Publicodes est un langage déclaratif qui s'écrit en YAML. Son principal atout : les règles restent lisibles par quelqu'un qui ne code pas. Ça facilite la collaboration avec les experts métier.

```yaml
# Exemple de règle Publicodes
aide . montant:
  formule:
    somme:
      - base
      - bonus si: conditions . prioritaire
```

Le projet fournit maintenant plusieurs packages NPM officiels :
- `@publicodes/core` — le moteur lui-même
- `@publicodes/forms` — génération automatique de formulaires React
- `@publicodes/react-ui` — composants d'interface
- `@publicodes/rest-api` — serveur REST pour exposer les calculs

L'écosystème JavaScript rend Publicodes adapté aux projets web modernes. En revanche, il est moins adapté quand on doit modéliser plusieurs entités interdépendantes (individu, foyer, ménage). Pour ces cas complexes, OpenFisca est généralement préférable.

### OpenFisca

OpenFisca vient du monde de la microsimulation économique. C'est un moteur Python conçu pour modéliser finement les systèmes socio-fiscaux avec leurs multiples entités.

```python
# Exemple de variable OpenFisca
class aide_montant(Variable):
    value_type = float
    entity = Individu
    definition_period = MONTH
    
    def formula(individu, period):
        return individu('revenu', period) * 0.1
```

Il expose nativement une API REST, ce qui permet de garder la logique métier en Python côté serveur tout en développant le frontend avec n'importe quelle techno.

La contrepartie : la courbe d'apprentissage est plus raide. Il faut comprendre les concepts de périodes, d'entités, de formules paramétrées. Mais pour modéliser des aides qui dépendent de la composition du foyer ou des revenus de plusieurs personnes, c'est souvent le bon choix.

## Règles métier packagées (10 packages)

L'audit a identifié 10 packages NPM contenant des règles métier réutilisables :

| Package | Source | Domaine | Version |
|---------|--------|---------|---------|
| `modele-social` | mon-entreprise | Cotisations, statuts, fiscalité | 9.0.0 |
| `@socialgouv/modeles-social` | code-du-travail | 47 conventions collectives | 4.202.0 |
| `mesaidesreno` | mes-aides-reno | Rénovation énergétique | 1.6.1 |
| `@incubateur-ademe/nosgestesclimat` | nosgestesclimat | Bilan carbone, 5 langues | 1.9.1 |
| `@incubateur-ademe/impactco2-react` | impact-co2 | Widgets CO2 embeddables | - |
| `@incubateur-ademe/publicodes-acv-numerique` | impact-co2 | ACV numérique | 1.4.0 |
| `@betagouv/aides-velo` | aides-jeunes | Aides à l'achat vélo | - |
| `@betagouv/survey-schema` ⭐ | aides-simplifiees | Formulaires multi-moteur | 2.0.0 |
| `@shallowred/publicodes-entreprise-innovation` | aides-simplifiees | CIR/CII/JEI | - |
| `@leximpact/socio-fiscal-openfisca-json` | leximpact | Variables fiscales OpenFisca | - |

## Génération de formulaires

Le grand défi dans un simulateur, c'est de garder le formulaire synchronisé avec les règles de calcul. Plusieurs approches existent.

### @publicodes/forms

Ce package officiel génère automatiquement des formulaires React à partir des métadonnées des règles Publicodes. L'idée : si une règle a besoin d'une information pour calculer, le formulaire devrait poser la question correspondante.

Le système gère les questions conditionnelles : si une réponse précédente rend certaines questions inutiles, elles ne sont pas affichées. On peut personnaliser l'interface en fournissant ses propres composants React.

### RuleInput (pattern mon-entreprise)

mon-entreprise a développé un pattern de composants React typés qui se connectent directement aux règles. Chaque type de donnée (montant, pourcentage, date, choix) a son composant dédié qui sait comment afficher et valider l'entrée utilisateur.

Ce pattern est moins automatique que `@publicodes/forms` mais offre plus de contrôle sur l'UX.

## Schémas déclaratifs

### @betagouv/survey-schema ⭐ STRATÉGIQUE

Ce format JSON/YAML décrit un questionnaire indépendamment du moteur de calcul. L'intérêt : on peut utiliser le même formulaire avec Publicodes ou OpenFisca, ou même changer de moteur sans réécrire l'UI.

```json
{
  "id": "demenagement-logement",
  "engine": "openfisca",
  "steps": [
    {
      "questions": [
        {
          "id": "date-naissance",
          "type": "date",
          "label": "Quelle est votre date de naissance ?",
          "required": true
        }
      ]
    }
  ]
}
```

Le schéma est agnostique au framework frontend. En théorie, on pourrait générer le même formulaire en React, Vue, ou Svelte.

## Tests et validation métier

### Cas types en YAML

Plusieurs projets (leximpact, aides-simplifiees) formalisent des cas types métier en YAML. Le principe : décrire une situation concrète avec les entrées et les sorties attendues, dans un format lisible par un expert métier.

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

Ces fichiers servent à la fois de documentation ("voilà les situations qu'on couvre") et de tests automatisés. L'expert métier peut les valider sans lire le code.

### Format de test OpenFisca

OpenFisca a son propre format YAML pour les tests :

```yaml
- name: Test aide logement
  period: 2024-01
  input:
    salaire: 1500
  output:
    aide_logement: 200
```

Ces tests s'exécutent directement avec l'outil en ligne de commande d'OpenFisca.

## Packages de règles métier publiés sur NPM

Plusieurs projets publient leurs règles de calcul sous forme de packages NPM réutilisables :

- `modele-social` (mon-entreprise) — règles sociales et fiscales françaises, version 9.0.0
- `@socialgouv/modeles-social` (code-du-travail) — 47 conventions collectives
- `mesaidesreno` — règles pour les aides à la rénovation énergétique
- `@incubateur-ademe/nosgestesclimat` — calcul du bilan carbone personnel
- `@shallowred/publicodes-entreprise-innovation` — CIR, CII, statut JEI

Ces packages permettent de réutiliser les règles sans dupliquer la modélisation. Si MaPrimeRénov' évolue, une mise à jour de `mesaidesreno` suffit.

## Widgets embarquables

**transition-widget** est un web component autonome qui affiche les aides à la transition écologique. Il configure 213 programmes d'aides et s'intègre en quelques lignes de HTML dans n'importe quel site.

## Design System de l'État (DSFR)

Environ 70% des simulateurs utilisent le DSFR. Plusieurs implémentations existent selon le framework :
- `@codegouvfr/react-dsfr` pour React
- `vue-dsfr` pour Vue.js
- `@gouvfr/dsfr` pour du JavaScript vanilla

## Données et référentiels

**Base Adresse Nationale (BAN)** — l'API d'autocomplétion d'adresses est intégrée dans la plupart des simulateurs qui demandent une localisation.

**france-chaleur-urbaine** — données géographiques sur les réseaux de chaleur, réutilisées par plusieurs projets.
