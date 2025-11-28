# Patterns architecturaux

Cette page détaille les principales architectures utilisées pour connecter formulaires et moteurs de règles dans l'écosystème des simulateurs publics.

## Vue d'ensemble

L'analyse des projets révèle **quatre grandes familles** d'approches, distinguées par deux axes :
- Le **degré de couplage** entre le formulaire et le moteur de règles
- La **localisation du calcul** (client vs serveur)

```
                        COUPLAGE FAIBLE                    COUPLAGE FORT
                              │                                  │
    CALCUL        ┌───────────┴───────────┐        ┌─────────────┴─────────────┐
    CLIENT        │  Config déclarative   │        │   Formulaire généré       │
                  │  (YAML/JSON)          │        │   depuis règles           │
                  │                       │        │                           │
                  │  mes-aides-reno       │        │   mon-entreprise          │
                  │  transition-widget    │        │   @publicodes/forms       │
                  │  nosgestesclimat      │        │   aides-simplifiees       │
                  │  aides-simplifiees    │        │   (mode Publicodes)       │
                  └───────────────────────┘        └───────────────────────────┘
                              │                                  │
    CALCUL        ┌───────────┴───────────┐        ┌─────────────┴─────────────┐
    SERVEUR       │  API backend          │        │   Formulaires codés       │
                  │  + front découplé     │        │   + appels API            │
                  │                       │        │                           │
                  │  estime               │        │   aides-jeunes            │
                  │  leximpact            │        │   code-du-travail         │
                  │  mes-ressources       │        │   a-just                  │
                  └───────────────────────┘        └───────────────────────────┘
```

## Pattern 1 : Config déclarative (YAML/JSON)

### Principe

Les questions sont décrites dans un fichier de configuration (YAML ou JSON) séparé du code. Le moteur de règles est invoqué avec les réponses collectées.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Config     │     │   Form UI    │     │   Moteur     │
│   YAML/JSON  │────▶│  (générique) │────▶│  (invoke)    │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Variantes observées

| Projet | Format config | Moteur | Particularité |
|--------|---------------|--------|---------------|
| **mes-aides-reno** | YAML (`simulationConfig.yaml`) | Publicodes | Liste les questions "prioritaires" (ordre) |
| **transition-widget** | YAML (inline dans programmes) | Publicodes | Règles embarquées dans chaque programme |
| **nosgestesclimat** | YAML | Publicodes | Questions dérivées des règles + config ordre |
| **aides-simplifiees** | JSON (`public/forms/*.json`) | Publicodes OU OpenFisca | Champ `engine` pour routage multi-moteur |

### Exemple : mes-aides-reno

```yaml
# simulationConfig.yaml
prioritaires:
  - vous . propriétaire . statut
  - logement . propriétaire occupant
  - logement . adresse
  - ménage . personnes
  - ménage . revenu
```

Le fichier YAML définit l'**ordre des questions**, mais celles-ci correspondent à des règles Publicodes existantes.

### Exemple : aides-simplifiees (multi-moteur)

```json
{
  "version": "2.0.3",
  "id": "demenagement-logement",
  "engine": "openfisca",
  "steps": [
    {
      "questions": [
        {
          "id": "age",
          "type": "number",
          "label": "Quel est votre âge ?"
        }
      ]
    }
  ]
}
```

La spécificité est le champ `engine` qui permet au **même schéma** de router vers Publicodes ou OpenFisca selon le simulateur.

### Caractéristiques

| Aspect | Description |
|--------|-------------|
| **Découplage** | Moyen à fort (selon implémentation) |
| **Contribution** | Le fichier config peut être édité sans toucher au code moteur |
| **Multi-moteur** | Possible si prévu (aides-simplifiees), sinon non |
| **Flexibilité** | Ordonnancement et regroupement libres |

### Quand l'utiliser ?

- Catalogue de programmes/aides à afficher
- Besoin de flexibilité dans l'ordre des questions
- Contribution métier sur la structure du parcours
- (Si multi-moteur prévu) Besoin de supporter Publicodes ET OpenFisca

---

## Pattern 2 : Formulaire généré depuis les règles

### Principe

L'interface utilisateur est dérivée automatiquement des métadonnées des règles Publicodes. Chaque variable d'entrée génère une question.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Publicodes  │────▶│  Générateur  │────▶│   React UI   │
│   Rules      │     │  de forms    │     │  Components  │
│   (.yaml)    │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Caractéristiques

| Aspect | Description |
|--------|-------------|
| **Source unique** | Les règles sont la seule source de vérité |
| **Cohérence** | Garantie entre calcul et UI |
| **Personnalisation** | Via extension des métadonnées des règles |
| **Couplage** | Fort avec le moteur Publicodes |

### Exemple : mon-entreprise

mon-entreprise utilise des composants `RuleInput` qui :
- Déterminent le type d'input selon la règle (radio, checkbox, montant, commune...)
- Affichent les suggestions et unités depuis les métadonnées
- Gèrent les conditions d'applicabilité automatiquement

```tsx
// Flux simplifié
function RuleInput({ dottedName }) {
  const nature = getRuleInputNature(engine.getRule(dottedName))
  
  if (nature.isMultiplePossibilities) return <Checkboxes ... />
  if (nature.isOnePossibility) return <RadioGroup ... />
  if (nature.isMontant) return <MontantField ... />
  // etc.
}
```

### Exemple : @publicodes/forms

La bibliothèque `@publicodes/forms` formalise ce pattern :
```tsx
import { Form } from '@publicodes/forms'

<Form
  engine={engine}
  objectives={['aide . montant']}
  onSubmit={handleResult}
/>
```

### Quand l'utiliser ?

- Projet 100% Publicodes
- Cohérence règles/UI prioritaire
- Équipe maîtrisant l'écosystème Publicodes
- Pas besoin de personnalisation fine du parcours

---

## Pattern 3 : Formulaires codés + appels API

### Principe

Les questions sont définies en TypeScript/JavaScript avec la logique de transformation intégrée. Les appels au moteur (souvent OpenFisca) passent par une API.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Property    │────▶│   Vue/React  │────▶│   OpenFisca  │
│  Classes     │     │  Components  │     │   API        │
│   (.ts)      │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Variantes observées

| Projet | Définition questions | Moteur | Backend |
|--------|---------------------|--------|---------|
| **aides-jeunes** | Property classes (TypeScript) | OpenFisca | Node.js |
| **code-du-travail** | Composants React | Mixte | Node.js |
| **a-just** | Angular Forms | Custom (JS) | Koa |

### Exemple : aides-jeunes

```typescript
// lib/properties/individu.ts (simplifié)
export const age: Property = {
  type: 'number',
  label: 'Quel est votre âge ?',
  min: 0,
  max: 120,
  toOpenFisca: (value) => ({ age: value })
}
```

### Caractéristiques

| Aspect | Description |
|--------|-------------|
| **Flexibilité** | Maximale sur les parcours |
| **Couplage** | Fort au code applicatif |
| **Contribution** | Nécessite compétences dev |
| **Adaptation** | Idéal pour parcours complexes |

### Quand l'utiliser ?

- Parcours très personnalisés avec logique conditionnelle complexe
- Équipe 100% dev
- Besoins UX spécifiques
- Intégration OpenFisca via API

---

## Pattern 4 : API backend + front découplé

### Principe

Le frontend est totalement indépendant : il collecte les réponses via des formulaires classiques et appelle une API backend qui interroge le moteur.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   REST API   │────▶│   OpenFisca  │
│   (Angular)  │     │   (Java)     │     │   (Python)   │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Exemple : estime

estime (Pôle Emploi) utilise :
- Un frontend Angular avec Reactive Forms (formulaires codés classiques)
- Un backend Java Spring Boot
- Des appels à l'API OpenFisca externe

Le frontend n'a **aucune connaissance** des règles : il envoie des données brutes au backend qui les transforme.

### Caractéristiques

| Aspect | Description |
|--------|-------------|
| **Séparation** | Totale frontend/backend |
| **Multi-langage** | Frontend JS, backend Java/Python |
| **Scalabilité** | Backend indépendamment scalable |
| **Latence** | Appels réseau à chaque calcul |

### Quand l'utiliser ?

- Architecture microservices existante
- Équipe backend non-JS (Java, Python)
- Besoins de scalabilité serveur
- Moteur non disponible en JavaScript

---

## Approches sans moteur déclaratif

Certains projets n'utilisent pas de moteur de règles générique :

| Projet | Approche | Justification |
|--------|----------|---------------|
| **envergo** | Moulinette Python (matrices, evaluators) | Règles environnementales très spécifiques |
| **pacoupa** | Lookup SQLite + validation Zod | Recommandation basée sur base de données |
| **impact-co2** | Données JSON + React state | Données statiques, peu de calcul |

Ces approches sont adaptées quand :
- Le domaine est très spécifique (pas de réutilisation envisagée)
- La complexité ne justifie pas un moteur générique
- L'équipe maîtrise mieux une approche custom

---

## Matrice de décision

| Critère | Config déclarative | Généré (Publicodes) | Codé + API | Backend découplé |
|---------|-------------------|---------------------|------------|------------------|
| Contribution non-dev | ✅✅ | ✅ | ❌ | ❌ |
| Cohérence règles/UI | ✅ | ✅✅ | ⚠️ | ⚠️ |
| Flexibilité parcours | ✅✅ | ⚠️ | ✅✅ | ✅ |
| Multi-moteur | ⚠️ (si prévu) | ❌ | ⚠️ | ✅ |
| Calcul côté client | ✅ | ✅ | ⚠️ | ❌ |
| Complexité initiale | Faible | Faible | Moyenne | Élevée |

Légende : ✅✅ Excellent | ✅ Bon | ⚠️ Limité/Dépend | ❌ Non adapté

## Voir aussi

- [Panorama des projets](./01_panorama.md)
- [Outils réutilisables](./02_outils.md)
- [Du modèle au schéma de questionnaire](/01_simulateurs/03_passer-en-code.html#du-modele-au-schema-de-questionnaire)
