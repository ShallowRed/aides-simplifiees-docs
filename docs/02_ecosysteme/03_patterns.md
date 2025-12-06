# Patterns architecturaux

Comment connecter un formulaire web et un moteur de règles ? Cette question apparemment simple cache plusieurs décisions d'architecture qui impactent la maintenabilité et la traçabilité du simulateur.

L'analyse des 20 projets beta.gouv révèle qu'il n'y a pas *une* architecture type mais des combinaisons de choix sur trois axes :

1. **Où sont définies les questions du formulaire ?** Dans un fichier de config, dérivées automatiquement des règles, ou codées en dur ?
2. **Où s'exécute le calcul ?** Côté navigateur ou côté serveur ?
3. **Quelle transformation entre les réponses et le moteur ?** Directe, légère, ou complexe avec des builders ?

## Définir le formulaire : trois approches

### Approche 1 : Configuration déclarative

Les questions sont décrites dans un fichier YAML ou JSON séparé du code applicatif. Deux variantes coexistent.

**mes-aides-reno** utilise un YAML comme filtre d'ordonnancement. Les règles Publicodes contiennent déjà les métadonnées des questions (label, type). Le YAML ne fait que filtrer et ordonner les `missingVariables` du moteur :

```yaml
# simulationConfig.yaml
prioritaires:
  - vous . propriétaire . statut
  - logement . adresse
  - ménage . revenu
```

**aides-simplifiées** utilise un JSON comme schéma complet autonome. Le formulaire décrit intégralement les questions, indépendamment du moteur :

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

Le champ `engine` permet de router vers Publicodes ou OpenFisca. C'est le seul projet de l'écosystème qui peut basculer de moteur sans réécrire le frontend.

### Approche 2 : Génération depuis les règles

**mon-entreprise** génère l'UI automatiquement depuis les métadonnées Publicodes. Les composants `RuleInput` déterminent le type d'input selon la règle, affichent les suggestions et unités, gèrent les conditions d'applicabilité.

L'avantage : garantie de cohérence entre les règles et l'interface. Si une règle devient inutile, la question disparaît.

### Approche 3 : Formulaires codés

**aides-jeunes** définit des Property classes en TypeScript avec les transformations intégrées :

```typescript
export const age: Property = {
  type: 'number',
  label: 'Quel est votre âge ?',
  toOpenFisca: (value) => ({ age: value })
}
```

Cette approche maximise la flexibilité du parcours utilisateur mais disperse la logique de mapping dans le code.

## Calcul côté client ou serveur ?

### Publicodes dans le navigateur

La plupart des projets Publicodes (mes-aides-reno, mon-entreprise, nosgestesclimat) exécutent le moteur directement côté client. Avantages : réactivité instantanée, pas de latence réseau, pas de backend à maintenir.

Inconvénient : toutes les règles sont téléchargées dans le navigateur. Si le modèle est volumineux, ça peut ralentir le chargement initial.

### OpenFisca côté serveur

OpenFisca étant en Python, il s'exécute obligatoirement côté serveur. Deux variantes :

**Proxy simple** (aides-simplifiées) : le backend fait un relais transparent vers l'API OpenFisca. Le frontend construit la requête, le backend la transmet. Aucune logique métier dans le backend.

**Backend avec logique métier** (estime) : le backend Java Spring transforme les objets métier en requêtes OpenFisca. 16 mappeurs différents convertissent les données. Plus sécurisé mais beaucoup plus complexe à maintenir.

## La couche de mapping : point critique

La transformation entre les réponses utilisateur et les variables du moteur est souvent source de difficultés de traçabilité.

### Mapping direct

Avec Publicodes côté client, les réponses alimentent directement les règles :

```typescript
engine.setSituation({ 'ménage . revenu': 25000 })
```

Traçabilité excellente : la variable du formulaire a le même nom que la règle.

### Mapping avec formatters

aides-simplifiées utilise des fonctions simples pour formater les valeurs :

```typescript
export function formatSurveyAnswerToRequest(
  variableName: string,
  period: string,
  value: unknown
): Record<string, VariableValueOnPeriod> {
  return { [variableName]: { [period]: value } }
}
```

### Mapping avec builders complexes

Pour OpenFisca, la transformation est plus complexe. aides-simplifiées utilise un `OpenFiscaRequestBuilder` avec plusieurs couches :

1. **MappingResolver** : résout une clé de réponse vers son mapping OpenFisca
2. **Dispatchers** : transforme une valeur en plusieurs variables (ex: "alternance" → `alternant: true`)
3. **Entity Managers** : gère les entités OpenFisca (individus, ménages, familles, foyers fiscaux)
4. **Date Periods** : calcule les périodes (MONTH, YEAR, YEAR_ROLLING, ETERNITY)

Exemple de transformation :

```typescript
// Entrée utilisateur
{ "situation-professionnelle": "alternance" }

// Dispatch
case FORM_VALUES.ALTERNANCE:
  return formatSurveyAnswerToRequest('alternant', period, true)

// Sortie OpenFisca
{
  "individus": {
    "demandeur": {
      "alternant": { "2025-01": true }
    }
  }
}
```

Cette complexité est inévitable avec OpenFisca mais rend la traçabilité difficile.

## Projets sans moteur déclaratif

Certains projets n'utilisent ni Publicodes ni OpenFisca. **envergo** a développé une moulinette Python spécifique aux règles environnementales. **pacoupa** fait du lookup dans une base SQLite. **impact-co2** utilise des données JSON statiques. Ces approches sont justifiées quand les règles sont trop spécifiques pour bénéficier d'un moteur générique.

## Quelques repères pour choisir

Si vous voulez maximiser la **contribution non-technique**, une config déclarative (YAML/JSON) sera plus accessible qu'un formulaire codé.

Si vous cherchez la **cohérence entre règles et UI**, la génération automatique depuis Publicodes est probablement le meilleur choix.

Si vous avez besoin de **flexibilité sur le parcours utilisateur**, une config déclarative ou des formulaires codés donnent plus de liberté.

Pour la **traçabilité**, Publicodes avec mapping direct peut-être une soltion. OpenFisca demande souvent une couche de transformation plus complexe.

Si vous devez **supporter plusieurs moteurs**, seule l'approche aides-simplifiées (schéma déclaratif + builder adapté) permet de basculer entre Publicodes et OpenFisca.

Pour la **latence**, le calcul client (Publicodes) est imbattable. Pour la **sécurité des données**, le calcul serveur est préférable.

## Voir aussi

- [Panorama des projets](./01_panorama.md)
- [Outils réutilisables](./02_outils.md)
- [Du modèle au schéma de questionnaire](/01_simulateurs/05_passer-en-code.html#du-modele-au-schema-de-questionnaire)
