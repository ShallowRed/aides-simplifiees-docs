# Collaboration métier, produit et partenaires

Cette page aborde un enjeu souvent sous-estimé dans les projets de simulateurs : **l'outillage de la relation entre les équipes techniques, les experts métier et les partenaires institutionnels**.

Les discussions sur les moteurs de règles ou les frameworks JavaScript occultent parfois l'essentiel : un simulateur ne vaut que par la **qualité de sa modélisation réglementaire**, qui dépend elle-même de la fluidité des échanges entre ceux qui connaissent le droit et ceux qui l'implémentent.

## Le problème

### Des mondes qui ne se parlent pas

```
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│   Partenaire    │          │   Équipe        │          │   Équipe        │
│   institution-  │    ?     │   produit       │    ?     │   technique     │
│   nel (CAF,     │◄────────►│   (PO, design)  │◄────────►│   (dev, data)   │
│   DINUM, etc.)  │          │                 │          │                 │
└─────────────────┘          └─────────────────┘          └─────────────────┘
        │                            │                            │
        │  Textes juridiques         │  User stories              │  Code, tests
        │  Circulaires               │  Maquettes                 │  Pull requests
        │  Cas particuliers          │  Roadmap                   │  Documentation
        └────────────────────────────┴────────────────────────────┘
                              Outils différents
                              Vocabulaires différents
                              Temporalités différentes
```

### Les symptômes courants

| Symptôme | Cause profonde |
|----------|----------------|
| "Le simulateur ne correspond pas à la réglementation" | Pas de validation métier formalisée |
| "On découvre les changements réglementaires au dernier moment" | Pas de canal de veille partagé |
| "Les experts ne comprennent pas nos questions techniques" | Pas de langage commun |
| "On ne sait pas qui valide quoi" | Gouvernance floue |
| "Les partenaires ne répondent plus" | Sollicitations trop techniques ou trop fréquentes |

### Ce qui manque dans l'écosystème

L'observation des projets de simulateurs publics révèle un **déficit d'outillage** sur :

1. **La formalisation des règles** : Comment documenter une interprétation juridique de manière traçable ?
2. **La validation métier** : Comment faire valider un modèle par un expert sans le noyer dans le code ?
3. **La gestion des cas ambigus** : Comment arbitrer quand le texte est flou ?
4. **La veille réglementaire** : Comment être informé des changements à venir ?
5. **La communication avec les partenaires** : Comment maintenir un dialogue productif ?

## Solutions et bonnes pratiques

### 1. Créer un langage commun

#### Le glossaire partagé

Avant tout projet, établir un **glossaire commun** entre équipes tech et métier :

```yaml
# Exemple de glossaire projet
termes:
  - terme: "foyer fiscal"
    définition_juridique: "Ensemble des personnes inscrites sur une même déclaration de revenus"
    définition_technique: "Entité parente dans le modèle, contenant des individus"
    source: "CGI art. 6"
    
  - terme: "éligible"
    définition_métier: "Remplit toutes les conditions d'accès"
    définition_technique: "La règle 'eligibilite' retourne true"
    attention: "≠ bénéficiaire (qui a effectivement reçu l'aide)"
```

#### Les ateliers de traduction

Organiser des sessions régulières où :
- Un expert métier **lit le texte à voix haute**
- L'équipe technique **reformule** en pseudo-code
- On **identifie les zones grises** ensemble

### 2. Formaliser la validation métier

#### Les cas types comme contrat

Les [fixtures métier](/01_simulateurs/06_tester-ajuster.html#formaliser-les-cas-types-metier) servent de **contrat** entre équipes :

```yaml
# cas-types/aide-logement.yaml
cas_types:
  - nom: "Étudiant boursier en colocation"
    source: "Dossier réel CAF anonymisé - Réf. 2024-XXX"
    validé_par: "Marie D., experte CAF"
    date_validation: "2024-03-15"
    situation:
      age: 21
      statut: étudiant
      boursier: true
      type_logement: colocation
      loyer_part: 350
    resultat_attendu:
      eligible: true
      montant_mensuel: 180
    commentaire_expert: |
      Cas classique. Le montant tient compte de la part
      de loyer individuelle, pas du loyer total.
```

#### Le workflow de validation

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Dev crée   │────►│  Expert      │────►│  Correction  │────►│   Merge      │
│   cas type   │     │  review      │     │  si besoin   │     │   validé     │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Commentaire │
                     │  explicatif  │
                     └──────────────┘
```

### 3. Gérer les zones grises

#### Le registre des interprétations

Quand le texte est ambigu, documenter la décision :

```yaml
# interpretations/revenus-pris-en-compte.yaml
question: "Les revenus exceptionnels sont-ils inclus dans le calcul ?"
texte_source: "Article X - les revenus de l'année N-1..."
ambiguïté: "Le texte ne précise pas 'revenus courants' vs 'revenus totaux'"
options:
  - option_a: "Inclure tous les revenus (lecture littérale)"
  - option_b: "Exclure les revenus exceptionnels (intention probable)"
décision: "option_b"
justification: |
  Après échange avec la DGCS, l'intention du législateur était
  de mesurer la capacité financière récurrente du ménage.
validé_par: "Jean P., juriste DGCS"
date: "2024-02-20"
réversible: true
```

#### L'escalade structurée

Définir qui tranche selon le niveau d'ambiguïté :

| Niveau | Type d'ambiguïté | Qui tranche | Délai |
|--------|------------------|-------------|-------|
| 1 | Formulation équivalente | Équipe produit | Immédiat |
| 2 | Interprétation plausible | Expert métier référent | 1 semaine |
| 3 | Zone grise réglementaire | Partenaire institutionnel | 2-4 semaines |
| 4 | Contradiction entre textes | Direction juridique | Variable |

### 4. Organiser la veille réglementaire

#### Les canaux à surveiller

| Source | Contenu | Fréquence |
|--------|---------|-----------|
| Légifrance | Textes officiels | Quotidien (alertes) |
| Circulaires.gouv.fr | Instructions d'application | Hebdomadaire |
| Bulletins ministériels | Interprétations | Mensuel |
| Partenaires directs | Changements prévus | Trimestriel |

#### Le rituel de veille

```
Lundi matin (30 min) :
├── Revue des alertes Légifrance
├── Check des issues GitHub "veille-réglementaire"
└── Point avec l'expert métier si changement détecté

Mensuel (2h) :
├── Revue des modifications du trimestre passé
├── Anticipation des évolutions connues
└── Mise à jour de la roadmap réglementaire
```

### 5. Maintenir le dialogue avec les partenaires

#### La posture recommandée

| À faire | À éviter |
|---------|----------|
| Poser des questions **fermées** avec contexte | Envoyer des extraits de code |
| Proposer **2-3 options** avec leurs implications | Demander "comment ça marche ?" |
| Partager les **cas types** validés précédemment | Solliciter pour chaque micro-question |
| Grouper les questions en **lots mensuels** | Harceler au fil de l'eau |
| Valoriser leur contribution (mentions, remerciements) | Considérer comme acquis leur disponibilité |

#### Le template de sollicitation

```markdown
## Contexte
Nous développons un simulateur de [aide X] pour [public Y].
Nous avons modélisé les conditions d'éligibilité à partir de [texte Z].

## Question précise
Concernant la condition "[extrait du texte]", nous hésitons entre :
- Interprétation A : [description + exemple]
- Interprétation B : [description + exemple]

## Impact
Cette décision affecte ~[N] situations par an sur notre simulateur.

## Notre recommandation
Nous pencherions pour l'interprétation [A/B] car [justification].
Qu'en pensez-vous ?

## Délai souhaité
Une réponse avant le [date] nous permettrait de [livraison prévue].
```

## Outils existants et manquants

### Ce qui existe

| Besoin | Outil actuel | Limite |
|--------|--------------|--------|
| Édition collaborative des règles | GitHub, GitLab | Courbe d'apprentissage pour non-devs |
| Documentation | VitePress, Docusaurus | Pas de workflow de validation intégré |
| Tests métier | YAML, JSON | Pas d'interface de saisie conviviale |
| Veille | Alertes Légifrance | Bruit, pas de filtrage intelligent |

### Ce qui manquerait

1. **Éditeur de règles accessible**
   - Interface web pour éditer des règles Publicodes/OpenFisca
   - Sans passer par Git/npm
   - Avec preview du résultat

2. **Plateforme de validation métier**
   - Soumettre des cas types à un expert
   - Workflow d'approbation
   - Historique des validations

3. **Outil de traduction droit → code**
   - Annotation de textes juridiques
   - Lien automatique vers les règles implémentées
   - Détection des incohérences

4. **Dashboard de conformité**
   - Couverture des textes par les règles
   - Alertes sur les textes non modélisés
   - Rapport pour les partenaires

## Recommandations par taille d'équipe

### Équipe réduite (1-3 personnes)

- **Prioriser** : Un expert métier référent identifié
- **Formaliser** : 10-20 cas types validés
- **Rituel** : Point mensuel avec l'expert

### Équipe moyenne (4-10 personnes)

- **Prioriser** : Glossaire partagé + registre d'interprétations
- **Formaliser** : Workflow de validation dans le CI
- **Rituel** : Revue de veille hebdomadaire

### Équipe large ou multi-partenaires

- **Prioriser** : Gouvernance explicite (RACI)
- **Formaliser** : Comité de pilotage réglementaire
- **Rituel** : Revue trimestrielle avec les partenaires

## Voir aussi

- [Formaliser les cas types métier](/01_simulateurs/06_tester-ajuster.html#formaliser-les-cas-types-metier)
- [Tensions à assumer](/00_meta/01_enjeux-rules-as-code.html#des-tensions-a-assumer)
- [Maintenir un simulateur](/01_simulateurs/07_maintenir)
- [Ressources visuelles mutualisables](/99_annexe/ressources-visuelles) - Templates Mermaid pour workflows et traçabilité

::: tip Contribution
Ce sujet est en construction. Partagez vos retours d'expérience et bonnes pratiques via [notre dépôt GitHub](https://github.com/betagouv/aides-simplifiees-docs).
:::
