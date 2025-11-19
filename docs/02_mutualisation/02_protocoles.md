# Protocoles de collaboration

Cette page documente les méthodes partagées pour faciliter les interactions récurrentes dans les projets de simulateurs d'aides.

## Protocole de validation métier

### Objectif
Garantir la conformité des modèles avec les règles en vigueur à travers un processus structuré et traçable.

### Étapes du protocole

#### 1. Préparation de la validation

**Livrables requis** :
- [ ] Document de modélisation complété (selon [template standard](01_standards-formats.md#template-de-modelisation-daide))
- [ ] Liste des personas de test pertinents
- [ ] Version de test déployée (staging)
- [ ] Tableau de correspondance règle/code

**Participants** :
- Expert métier (organisme gestionnaire ou juriste)
- Modélisateur
- Développeur (optionnel selon complexité)

#### 2. Session de validation

**Format recommandé** : Atelier de 2h maximum

**Déroulé** :
1. **Revue documentaire** (30 min)
   - Présentation du modèle par le modélisateur
   - Questions/réponses sur les choix de modélisation
   - Identification des zones d'incertitude

2. **Tests sur personas** (60 min)
   - L'expert métier passe les cas types dans le simulateur
   - Comparaison résultats obtenus vs attendus
   - Documentation des écarts

3. **Validation des edge cases** (30 min)
   - Tests sur les cas limites identifiés
   - Discussion sur les arbitrages nécessaires

#### 3. Compte-rendu de validation

**Template de compte-rendu** :

```markdown
# Validation métier - [Nom de l'aide]

**Date** : [Date]
**Participants** : [Noms et rôles]
**Version testée** : [Numéro version / commit]

## Résultats globaux
- ✅ Personas validés : X/Y
- ⚠️ Ajustements mineurs : Z cas
- ❌ Blocages : W cas

## Détail par persona

### Persona 1 : [Nom]
- **Statut** : ✅ Validé / ⚠️ Ajustement / ❌ Non conforme
- **Résultat obtenu** : [Montant ou statut]
- **Résultat attendu** : [Montant ou statut]
- **Écart** : [Description si écart]
- **Action** : [Correction à apporter si nécessaire]

[Répéter pour chaque persona]

## Points d'attention identifiés
1. [Point d'attention 1 + source juridique]
2. [Point d'attention 2 + source juridique]

## Décision
- [ ] ✅ Validation complète - Passage en production autorisé
- [ ] ⚠️ Validation conditionnelle - Corrections mineures requises
- [ ] ❌ Validation refusée - Révision majeure nécessaire

## Actions à mener
| Action | Responsable | Échéance |
|--------|-------------|----------|
| [Action 1] | [Nom] | [Date] |

## Signature
Expert métier : [Nom et date]
```

### Fréquence des validations

- **Validation initiale** : Avant mise en production
- **Validation incrémmentale** : À chaque ajout de nouvelle aide
- **Revalidation** : 
  - À chaque changement réglementaire majeur
  - Tous les 6 mois minimum (même sans changement)
  - Suite à la détection d'anomalie en production

### Traçabilité

Tous les comptes-rendus de validation sont archivés et versionnés :
- Dans le dépôt Git du projet (`/docs/validations/`)
- Avec un lien depuis le modèle d'aide concerné
- Accessibles aux auditeurs et parties prenantes

## Protocole de revue juridique

### Objectif
Assurer la conformité juridique et la robustesse des interprétations réglementaires.

### Grille de lecture juridique

**Checklist pour la revue** :

#### Sources et références
- [ ] Tous les articles de loi cités sont à jour
- [ ] Les références incluent les versions datées
- [ ] Les circulaires d'application sont mentionnées
- [ ] Les jurisprudences pertinentes sont citées

#### Interprétation des règles
- [ ] Les cas d'ambiguïté sont documentés
- [ ] Les choix d'interprétation sont justifiés
- [ ] Les zones grises sont signalées explicitement
- [ ] Alternative conservative proposée si doute

#### Temporalité et versioning
- [ ] Dates d'entrée en vigueur identifiées
- [ ] Périodes transitoires gérées
- [ ] Modifications futures connues anticipées

#### Gestion des exceptions
- [ ] Cas particuliers recensés exhaustivement
- [ ] Hiérarchie des textes respectée (loi > décret > circulaire)
- [ ] Dérogations locales identifiées si pertinent

### Points de contrôle récurrents

| Aspect | Question à poser | Risque si non traité |
|--------|------------------|---------------------|
| **Rétroactivité** | La règle s'applique-t-elle rétroactivement ? | Calculs erronés sur périodes antérieures |
| **Cumul** | Quelles autres aides peuvent interférer ? | Double attribution ou exclusion abusive |
| **Plafonds** | Les plafonds sont-ils annuels, mensuels, par foyer ? | Calculs faux en cas de changement de situation |
| **Ressources** | Quels revenus inclure/exclure ? | Sous ou sur-évaluation de l'éligibilité |

### Processus de revue

1. **Soumission** : Document de modélisation + code source
2. **Revue préliminaire** (1-2j) : Lecture juridique par un expert
3. **Points de clarification** : Échanges sur les zones floues
4. **Validation** : Avis juridique écrit et signé
5. **Archivage** : Conservation de l'avis pour traçabilité

## Processus de collaboration inter-métiers

### Communication continue

**Outils recommandés** :
- **Slack/Teams** : Canal dédié par projet pour questions rapides
- **GitHub Issues** : Traçabilité des décisions et questions complexes
- **Wiki partagé** : Documentation vivante accessible à tous

### Rituels d'équipe

#### Sprint review avec l'expert métier (1h / 2 semaines)
- Démonstration des nouvelles fonctionnalités
- Validation rapide sur cas types
- Identification des prochains sujets

#### Atelier de modélisation (2-3h / mois)
- Travail collaboratif sur nouvelles aides complexes
- Designer + Développeur + Expert métier + Juriste
- Co-construction du modèle et du parcours

### Glossaire partagé

Maintenir un glossaire commun des termes métier est essentiel :

| Terme métier | Définition juridique | Traduction code | Exemple |
|--------------|---------------------|-----------------|---------|
| Personne isolée | Au sens de l'article L.262-2 | `composition_foyer == "seul"` | Célibataire sans enfant |
| Ressources | Revenus N-1 définis par article X | `rfr` (Revenu Fiscal de Référence) | 18 000 € |

→ Le glossaire est accessible dans [l'annexe](/99_annexe/glossaire.md)

## Gestion des désaccords

### Escalade graduée

1. **Discussion d'équipe** : Tentative de résolution locale
2. **Consultation externe** : Sollicitation de l'organisme gestionnaire
3. **Arbitrage documenté** : Choix explicite avec justification
4. **Disclaimer** : Mention dans le simulateur si incertitude persiste

### Documentation des incertitudes

Quand une règle reste ambiguë :
```markdown
::: warning Incertitude juridique
La règle concernant [sujet] présente une ambiguïté sur [point précis].

**Sources contradictoires** :
- Article X : [interprétation 1]
- Circulaire Y : [interprétation 2]

**Choix retenu** : [interprétation choisie]

**Justification** : [raisons du choix]

**Contact organisme** : [nom] - [email] - [date dernier échange]
:::
```

## Mesurer l'efficacité de la collaboration

### Indicateurs suggérés

- **Temps de validation** : Délai entre demande et validation complète
- **Taux d'aller-retours** : Nombre de cycles avant validation
- **Défauts en production** : Erreurs de calcul remontées post-lancement
- **Satisfaction équipe** : Enquête trimestrielle

### Amélioration continue

Organisation d'une **rétrospective collaboration** tous les 6 mois :
- Qu'est-ce qui fonctionne bien ?
- Qu'est-ce qui bloque ?
- Quelles améliorations proposer aux protocoles ?

::: tip Partage d'expérience
Votre équipe a développé des pratiques efficaces ? Partagez-les via une [pull request](https://github.com/betagouv/aides-simplifiees-docs/pulls) pour enrichir ces protocoles !
:::
