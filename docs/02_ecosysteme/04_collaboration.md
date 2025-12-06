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

## Structurer la collaboration

### 1. Créer un langage commun

Avant de parler de moteur de règles, il faut établir un glossaire partagé entre équipes tech et métier. Ce glossaire documente les termes qui n'ont pas le même sens selon le contexte :

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

Le glossaire évite les malentendus lors des revues : quand un expert dit "foyer", il faut savoir s'il parle du foyer fiscal, du foyer CAF ou du ménage au sens INSEE.

### 2. Formaliser la validation avec des cas types

Les cas types sont le contrat entre développeurs et experts métier. Ils décrivent des situations concrètes avec les entrées et sorties attendues, dans un format lisible par un non-technicien :

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
      Attention : si l'étudiant est rattaché au foyer
      fiscal des parents, l'éligibilité change.
```

Le workflow est simple : le développeur crée un cas type, l'expert le revoit, on corrige si besoin, puis on merge une fois validé. Le champ `commentaire_expert` capture le raisonnement métier pour les futures évolutions.

### 3. Documenter les interprétations ambiguës

Quand le texte légal est ambigu, la décision d'interprétation doit être tracée dans un registre. Sans cela, on risque de remettre en question les mêmes choix à chaque mise à jour :

```yaml
interpretations:
  - question: "Les revenus exceptionnels sont-ils inclus dans le calcul ?"
    texte_source: "Article X - les revenus de l'année N-1"
    ambiguïté: "Le texte ne précise pas 'revenus courants' vs 'revenus totaux'"
    
    options:
      - id: a
        description: "Inclure tous les revenus (lecture littérale)"
      - id: b
        description: "Exclure les revenus exceptionnels (intention probable)"
        
    décision: b
    justification: |
      Après échange avec la DGCS (mail du 15/02), l'intention
      du législateur était de mesurer la capacité financière
      récurrente du ménage, pas les revenus ponctuels.
      
    validé_par: "Jean P., juriste DGCS"
    date: "2024-02-20"
    réversible: true
```

Ce registre sert de mémoire collective. Quand quelqu'un demande "pourquoi on fait comme ça ?", la réponse est tracée avec son contexte.

### 4. Organiser la veille réglementaire

Les évolutions réglementaires arrivent souvent par vagues (loi de finances, décrets d'application). Sans veille organisée, l'équipe technique découvre les changements trop tard pour les anticiper.

Quelques pratiques observées dans l'écosystème :

- Abonnement aux flux RSS de Légifrance pour les codes concernés
- Point régulier avec un référent métier qui signale les évolutions à venir
- Suivi des circulaires ministérielles et notes de service des opérateurs
- Alertes sur les projets de loi en cours d'examen

## Contribuer à un modèle partagé

Plusieurs simulateurs utilisent les mêmes modèles (`openfisca-france` pour les minima sociaux, `publicodes` pour les aides à la rénovation). Contribuer à ces modèles partagés bénéficie à tout l'écosystème, mais demande de comprendre leur gouvernance.

### Processus de contribution

Le parcours type d'une contribution :

1. **Issue** : décrire le problème ou l'évolution souhaitée. Interlocuteurs : mainteneurs du repo.
2. **Discussion** : valider l'interprétation juridique avec un expert métier et les mainteneurs.
3. **PR** : soumettre le code avec tests et documentation. Review technique par les mainteneurs.
4. **Review métier** : validation par un expert du domaine identifié.
5. **Merge** : intégration et release par les mainteneurs.

### Gouvernance d'`openfisca-france`

Le modèle `openfisca-france` est maintenu par une communauté de contributeurs issus de plusieurs projets. Quelques points à connaître :

- Les PR doivent inclure des **cas de test** validant le comportement attendu
- Les modifications de barèmes ou plafonds nécessitent une **référence légale**
- Les changements structurels (nouvelles entités, refactoring) sont discutés en issue avant implémentation
- Le changelog doit être mis à jour

### Quand forker vs contribuer upstream

**Contribuer upstream** (au modèle source) : correction d'erreur, ajout d'un barème manquant. C'est la voie à privilégier.

**Fork ou extension séparée** : extension locale (aide régionale), modification expérimentale en cours de validation.

**Discussion préalable en issue** : interprétation divergente d'un texte. Ne pas coder avant d'avoir un consensus.

Le fork crée une dette de maintenance : à chaque mise à jour du modèle source, il faut re-merger. Privilégier la contribution upstream quand c'est possible.

## Ce qui existe et ce qui manque

Pour l'édition collaborative des règles ou le suivi des cas types, on peut utiliser GitHub ou GitLab. Mais la courbe d'apprentissage est raide pour les non-développeurs : créer une branche, ouvrir une PR, laisser un commentaire sur une ligne de code.

### Outils visuels pour la collaboration

Les formats textuels (YAML, JSON, Publicodes) sont précis mais parfois abstraits pour des non-développeurs. Les **diagrammes** peuvent servir de support intermédiaire :

- **Arbres de décision** : pour valider la logique d'éligibilité avec un expert métier, sans entrer dans le code
- **Graphes de dépendances** : pour expliquer l'impact d'une modification réglementaire sur les variables calculées
- **Diagrammes de parcours** : pour vérifier avec le PO et le designer que les questions apparaissent aux bonnes personnes

Ces diagrammes ne remplacent pas les cas types formels, mais facilitent les discussions en atelier ou en revue métier. Voir [Ressources visuelles](/99_annexe/ressources-visuelles) pour des exemples concrets de diagrammes Mermaid réutilisables, organisés par phase de projet.

### Ce qui pourrait exister

- Un éditeur de règles accessible en interface web, avec preview du résultat
- Une plateforme de validation métier avec workflow d'approbation
- Un outil d'annotation de textes juridiques lié aux règles implémentées
- Un dashboard de conformité montrant la couverture réglementaire

Ces outils n'existent pas encore sous forme packagée. Les équipes qui en ont besoin les construisent en interne, ou font sans.

## Voir aussi

- [Ressources visuelles](/99_annexe/ressources-visuelles) — Diagrammes pour représenter règles, flux et processus
- [Tester et ajuster](/01_simulateurs/06_tester-ajuster) — Détail des formats de cas types
- [Enjeux du Rules as Code](/00_meta/01_enjeux-rules-as-code) — Tensions à assumer
- [Maintenir un simulateur](/01_simulateurs/07_maintenir) — Gestion des évolutions dans le temps
