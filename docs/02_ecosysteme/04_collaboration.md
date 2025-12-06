# Collaboration métier, produit et partenaires

Cette page aborde un enjeu souvent sous-estimé : comment organiser la relation entre les équipes techniques, les experts métier et les partenaires institutionnels.

Les discussions sur Publicodes vs OpenFisca ou React vs Vue occultent parfois l'essentiel : un simulateur ne vaut que par la qualité de sa modélisation réglementaire, qui dépend elle-même de la fluidité des échanges entre ceux qui connaissent le droit et ceux qui l'implémentent.

## Le problème : des mondes qui ne se parlent pas

D'un côté, des partenaires institutionnels qui maîtrisent les textes juridiques, les circulaires, les cas particuliers. De l'autre, des équipes techniques qui parlent en variables, en tests unitaires, en pull requests. Entre les deux, une équipe produit qui essaie de faire le lien avec des user stories et des maquettes.

Symptômes courants :
- "Le simulateur ne correspond pas à la réglementation" → pas de validation métier formalisée
- "On découvre les changements réglementaires au dernier moment" → pas de canal de veille partagé
- "Les experts ne comprennent pas nos questions techniques" → pas de langage commun
- "On ne sait pas qui valide quoi" → gouvernance floue


Nous pourrions faire mieux en structurant la collaboration autour de cinq piliers :
1. La formalisation des règles (comment documenter une interprétation juridique de manière traçable ?)
2. La validation métier (comment faire valider un modèle par un expert sans le noyer dans le code ?)
3. La gestion des cas ambigus (comment arbitrer quand le texte est flou ?)
4. La veille réglementaire (comment être informé des changements à venir ?)
5. La communication avec les partenaires (comment maintenir un dialogue productif ?)

## Solutions et bonnes pratiques

### 1. Créer un langage commun

Avant de parler de moteur de règles, il faut établir un glossaire partagé entre équipes tech et métier. Exemple simple :

```yaml
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


### 2. Formaliser la validation métier

Les cas types servent de contrat entre équipes. Ils décrivent des situations concrètes avec les entrées et sorties attendues, dans un format lisible par un expert métier :

```yaml
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

Workflow simple : le dev crée un cas type, l'expert le revoit, on corrige si besoin, puis on merge une fois validé. L'expert laisse des commentaires explicatifs pour tracer sa validation.

### 3. Gérer les zones grises

### 3. Gérer les zones grises

Quand le texte légal est ambigu, documenter la décision dans un registre d'interprétations :

```yaml
question: "Les revenus exceptionnels sont-ils inclus dans le calcul ?"
texte_source: "Article X - les revenus de l'année N-1..."
ambiguité: "Le texte ne précise pas 'revenus courants' vs 'revenus totaux'"
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

### 4. Organiser la veille réglementaire


## Ce qui existe et ce qui manque

Pour l'édition collaborative des règles ou le suivi des formulaires utilisateurs, on peut utiliser GitHub ou GitLab, mais la courbe d'apprentissage peut être est raide pour les non-devs.

Ce qui pourrait exister :

1. Un éditeur de règles accessible en interface web, sans passer par Git/npm, avec preview du résultat
2. Une plateforme de validation métier pour soumettre des cas types à un expert, avec workflow d'approbation et historique
3. Un outil de traduction droit → code avec annotation de textes juridiques et lien vers les règles implémentées
4. Un dashboard de conformité montrant la couverture des textes par les règles et les alertes sur les textes non modélisés


## Voir aussi

- [Formaliser les cas types métier](/01_simulateurs/06_tester-ajuster.html#formaliser-les-cas-types-metier)
- [Panorama des projets](/02_ecosysteme/01_panorama) - Scores de maturité
- [Outils réutilisables](/02_ecosysteme/02_outils) - Packages NPM et patterns
- [Tensions à assumer](/00_meta/01_enjeux-rules-as-code.html#des-tensions-a-assumer)
- [Maintenir un simulateur](/01_simulateurs/07_maintenir)
