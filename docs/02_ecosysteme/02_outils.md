# Outils et briques réutilisables

Cette page inventorie les outils open source disponibles dans l'écosystème des simulateurs publics. Pour les questions d'architecture (quand utiliser quoi, comment les combiner), voir [Patterns architecturaux](./03_patterns).

## Moteurs de règles

### Publicodes

Langage déclaratif en YAML, développé pour mon-entreprise. Les règles restent lisibles par des non-développeurs.

```yaml
aide . montant:
  formule:
    somme:
      - base
      - bonus si: conditions . prioritaire
```

Packages NPM officiels :
- `publicodes` — le moteur
- `@publicodes/react-ui` — composants de documentation interactive
- `@publicodes/rest-api` — serveur REST

Adapté aux projets web avec calcul côté navigateur. Moins adapté aux modèles multi-entités complexes (foyer, ménage).

### OpenFisca

Moteur Python issu de la microsimulation économique. Conçu pour les systèmes socio-fiscaux avec entités interdépendantes.

```python
class aide_montant(Variable):
    value_type = float
    entity = Individu
    definition_period = MONTH
    
    def formula(individu, period):
        return individu('revenu', period) * 0.1
```

Expose une API REST native. Courbe d'apprentissage plus raide (périodes, entités, paramètres), mais indispensable pour les aides dépendant de la composition familiale.

## Packages de règles métier

| Package | Projet source | Domaine |
|---------|---------------|--------|
| `modele-social` | mon-entreprise | Cotisations, statuts, fiscalité |
| `@socialgouv/modeles-social` | code-du-travail | 47 conventions collectives |
| `mesaidesreno` | mes-aides-reno | Rénovation énergétique (MaPrimeRénov', etc.) |
| `@incubateur-ademe/nosgestesclimat` | nosgestesclimat | Bilan carbone personnel |
| `@betagouv/aides-velo` | aides-jeunes | Aides à l'achat vélo |
| `@shallowred/publicodes-entreprise-innovation` | aides-simplifiées | CIR, CII, statut JEI |

Ces packages permettent de réutiliser des règles sans dupliquer la modélisation. Si MaPrimeRénov' évolue, une mise à jour de `mesaidesreno` suffit.

## Outils de formulaire

### @publicodes/react-ui

Composants React pour afficher la documentation interactive d'un moteur Publicodes. Inclut :
- `RulePage` : page de documentation d'une règle avec décomposition du calcul
- `Explanation` : affichage du détail d'un nœud de calcul
- `RuleLink` : lien cliquable vers une règle

Permet l'explicabilité : l'utilisateur peut remonter le calcul pour comprendre d'où vient chaque valeur.

### @betagouv/survey-schema

Format JSON décrivant un questionnaire indépendamment du moteur de calcul. Permet d'utiliser le même formulaire avec Publicodes ou OpenFisca.

Voir [Patterns architecturaux](./03_patterns) pour les différentes approches de définition de formulaire.

## Tests et validation

### Cas types YAML

Format partagé par plusieurs projets pour décrire des situations concrètes avec entrées et sorties attendues :

```yaml
cas_types:
  - nom: "Étudiant boursier"
    entrees:
      age: 21
      boursier: true
    sorties_attendues:
      eligible: true
      montant: 180
```

Sert à la fois de documentation et de tests automatisés. Voir [Collaboration métier-produit](./04_collaboration) pour les bonnes pratiques de validation avec les experts.

### Format OpenFisca

OpenFisca utilise son propre format YAML exécutable en ligne de commande :

```yaml
- name: Test aide logement
  period: 2024-01
  input:
    salaire: 1500
  output:
    aide_logement: 200
```

## Widgets et composants UI

| Outil | Usage |
|-------|-------|
| `transition-widget` | Web component affichant les aides transition écologique (213 programmes) |
| `@codegouvfr/react-dsfr` | Design System de l'État pour React |
| `vue-dsfr` | Design System de l'État pour Vue.js |
| `@gouvfr/dsfr` | Design System de l'État vanilla JS |


## APIs et données

| Ressource | Usage |
|-----------|-------|
| Base Adresse Nationale (BAN) | Autocomplétion d'adresses |
| france-chaleur-urbaine | Données géographiques réseaux de chaleur |
| API Entreprise | Données SIREN/SIRET |

## Voir aussi

- [Patterns architecturaux](./03_patterns) — Comment combiner ces outils
- [Panorama des projets](./01_panorama) — Qui utilise quoi
