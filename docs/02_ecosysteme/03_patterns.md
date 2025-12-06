# Patterns architecturaux

Comment connecter un formulaire web et un moteur de règles ? Cette question cache plusieurs décisions d'architecture qui impactent la maintenabilité et la traçabilité du simulateur. Cette page traite des choix à faire ; pour l'inventaire des outils disponibles, voir [Outils et briques réutilisables](./02_outils).

L'analyse des projets beta.gouv révèle qu'il n'y a pas *une* architecture type mais des combinaisons de choix sur trois axes :

1. **Où sont définies les questions du formulaire ?** Dans un fichier de config, dérivées automatiquement des règles, ou codées en dur ?
2. **Où s'exécute le calcul ?** Côté navigateur ou côté serveur ?
3. **Quelle transformation entre les réponses et le moteur ?** Directe, légère, ou complexe avec des builders ?

## Définir le formulaire : trois approches

### Approche 1 : Configuration déclarative

Les questions sont décrites dans un fichier YAML ou JSON séparé du code applicatif. Deux variantes coexistent.

**[mes-aides-reno](https://beta.gouv.fr/startups/mesaidesreno.html)** utilise un YAML comme filtre d'ordonnancement. Les règles Publicodes contiennent déjà les métadonnées des questions (label, type). Le YAML ne fait que filtrer et ordonner les `missingVariables` du moteur :

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

Le champ `engine` permet de router vers Publicodes ou OpenFisca. Les avantages sont multiples, de la flexibilité pour l'UX à la capacité de générer des diagrammes automatiquement à partir du schéma. Le principal inconvénient est la nécessité de maintenir deux sources de vérité (formulaire et règles), avec une couche de mapping entre les deux.

### Approche 2 : Génération depuis les règles

**[mon-entreprise](https://beta.gouv.fr/startups/mon-entreprise.html)** génère l'UI automatiquement depuis les métadonnées Publicodes. Les composants `RuleInput` déterminent le type d'input selon la règle, affichent les suggestions et unités, gèrent les conditions d'applicabilité.

L'avantage : garantie de cohérence entre les règles et l'interface. Si une règle devient inutile, la question disparaît.

### Approche 3 : Formulaires codés

**[aides-jeunes](https://beta.gouv.fr/startups/aides.jeunes.html)** définit des Property classes en TypeScript avec les transformations intégrées :

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

La plupart des projets Publicodes ([mes-aides-reno](https://beta.gouv.fr/startups/mesaidesreno.html), [mon-entreprise](https://beta.gouv.fr/startups/mon-entreprise.html), [nosgestesclimat](https://github.com/incubateur-ademe/nosgestesclimat)) exécutent le moteur directement côté client. Avantages : réactivité instantanée, pas de latence réseau, pas de backend à maintenir.

Inconvénient : toutes les règles sont téléchargées dans le navigateur. Si le modèle est volumineux, ça peut ralentir le chargement initial. La gestion d'entités complexes (individus, foyers) est aussi plus délicate avec Publicodes.

### OpenFisca côté serveur

OpenFisca étant en Python, il s'exécute obligatoirement côté serveur. Deux variantes :

**Proxy simple** (aides-simplifiées) : le backend fait un relais transparent vers l'API OpenFisca. Le frontend construit la requête, le backend la transmet. Aucune logique métier dans le backend.

**Backend avec logique métier** ([estime](https://beta.gouv.fr/startups/estime.html)) : le backend Java Spring transforme les objets métier en requêtes OpenFisca, ce qui est plus sécurisé mais plus complexe à maintenir.

## La couche de mapping : point critique

La transformation entre les réponses utilisateur et les variables du moteur est souvent source de difficultés de traçabilité.

### Mapping direct

Avec Publicodes côté client, les réponses alimentent directement les règles :

```typescript
engine.setSituation({ 'ménage . revenu': 25000 })
```

Traçabilité excellente : la variable du formulaire a le même nom que la règle.

### Mapping avec formatters

aides-simplifiées utilise des fonctions plus ou moins simples pour formater les valeurs :

```typescript
export function formatSurveyAnswerToRequest(
  variableName: string,
  period: string,
  value: unknown
): Record<string, VariableValueOnPeriod> {
  return { [variableName]: { [period]: value } }
}
```

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

Cette complexité est inévitable pour faire correspondre un formulaire flexible à un moteur sophistiqué et précis, mais rend la traçabilité difficile.

## Projets sans moteur déclaratif

Certains projets n'utilisent ni Publicodes ni OpenFisca. **[envergo](https://beta.gouv.fr/startups/envergo.html)** a développé une moulinette Python spécifique aux règles environnementales. **[pacoupa](https://beta.gouv.fr/startups/pacoupa.html)** fait du lookup dans une base SQLite. **[impact-co2](https://beta.gouv.fr/startups/impact.co2.html)** utilise des données JSON statiques. Ces approches sont justifiées quand les règles sont trop spécifiques pour bénéficier d'un moteur générique.

## Quelques repères pour choisir

Si vous voulez maximiser la **contribution non-technique**, une config déclarative (YAML/JSON) sera plus accessible qu'un formulaire codé.

Si vous cherchez la **cohérence entre règles et UI**, la génération automatique depuis Publicodes est probablement le meilleur choix.

Si vous avez besoin de **flexibilité sur le parcours utilisateur**, une config déclarative ou des formulaires codés donnent plus de liberté.

Pour la **traçabilité**, Publicodes avec mapping direct est souvent le meilleur choix. OpenFisca demande une couche de transformation plus complexe.

Si vous devez **supporter plusieurs moteurs**, seule l'approche aides-simplifiées (schéma déclaratif + builder adapté) permet de basculer entre Publicodes et OpenFisca.

Pour la **latence**, le calcul client (Publicodes) est souvent un meilleur choix. Pour la **sécurité des données**, le calcul serveur est préférable.

Pour la gestion de **modèles complexes** avec plusieurs entités (individus, foyers), OpenFisca est généralement plus adapté.

## Voir aussi

- [Outils et briques réutilisables](./02_outils) — Inventaire des packages disponibles
- [Panorama des projets](./01_panorama) — Qui utilise quelle architecture
- [Du modèle au schéma de questionnaire](/01_simulateurs/05_passer-en-code) — Mise en pratique
