# Concevoir un simulateur multi-aide

Construire un simulateur combinant plusieurs aides publiques, c’est passer de la modélisation isolée à la **composition de règles hétérogènes**. Chaque aide a ses propres critères, barèmes et exceptions. Les regrouper dans un même outil suppose de **faire cohabiter plusieurs logiques administratives** sans créer de contradiction.

Combiner plusieurs aides dans un même simulateur présente des avantages évidents pour l'utilisateur, mais soulève de nombreux défis techniques et méthodologiques.

## Pourquoi mutualiser les aides ?

Les usagers ne pensent pas “par dispositif”, mais **par besoin** : se loger, se former, se déplacer, élever un enfant. Un simulateur multi-aide vise donc à **répondre à des situations de vie**, non à des silos administratifs.

## 1. Identifier les variables communes

Les aides partagent un certain nombre de **variables transverses**.  
Avant d’assembler les modèles, il faut recenser ces variables et définir une **grammaire commune**.
Chaque variable commune doit être définie **une seule fois** dans un référentiel partagé, puis appelée dans chaque modèle d’aide.

## 2. Résoudre les tensions

### Les variables hétérogènes

Chaque aide repose sur ses propres définitions (revenu, foyer, situation professionnelle...) qui ne se superposent pas toujours.

**Exemple** : La notion de "revenu" au sens de l'aide logement est différente de la notion de "revenu" au sens du RSA.

**Arbitrage** :
- Soit on utilise les notions de chaque aide, ce qui complexifie le parcours utilisateur
- Soit on les harmonise, ce qui peut entraîner des imprécisions de calcul

**Bonnes pratiques** :
- créer un **dictionnaire de correspondance** entre les noms de variables (`revenus_annuels`, `revenu_net_imposable`, etc.) ;
- documenter les divergences d’interprétation (ex. : “étudiant” ≠ “apprenti”) ;

### Les conflits de règles

Plusieurs aides peuvent se chevaucher ou se contredire. Ces situations doivent être anticipées.

**Types de conflits fréquents :**
- **Non-cumul légal** (ex. : deux aides au logement exclusives) ; 
- **Calcul en cascade** (une aide dépend du montant d’une autre) ;
- **Conditions contradictoires** (critères de résidence ou d’âge différents).

## 3. Concevoir le parcours utilisateur

Dans l'exercice précédent (modélisation d'une seule aide), il est relativement facile de passer de la liste des variables dont on a besoin à une suite de questions à poser à l'utilisateur 

Cependant, en combinant plusieurs aides dans un seul parcours, la liste des questions peut devenir laborieuse pour l'utilisateur. On cherche à **minimiser le nombre de questions et à bien les ordonner**, ce qui peut entraîner un certain nombre de difficultés.

### Exhaustivité réglementaire vs fluidité du parcours

Certaines questions couvrent des cas particuliers extrêmement minoritaires ou ayant des impacts mineurs sur l'éligibilité. Ne pas les inclure peut réduire le taux d'abandon, mais diminue la précision.

### Langage clair vs langage juridique

Chercher à améliorer la clarté d'une question peut faire perdre en exactitude réglementaire.

**Exemple** : Lors de tests utilisateurs, des notion juridiques commes "État matrimonial légal", "concubinage", etc. peuvent être mal comprise. Formuler la question en termes plus simples ("Vivez-vous en couple ?") peut améliorer la compréhension, mais introduit potentiellement une imprécision aux yeux de la règle.

## Itération entre règles et UX

Il n'existe pas de méthode toute faite pour concilier l'ensemble de ces tensions. **Le compromis est à construire** en mobilisant différents outils et en faisant dialoguer différents métiers autour de ces objets : juriste, designer, développeur, responsable produit.

Il s'agira d'**itérer entre deux pôles** :

1. **Les règles de calcul et leurs exigences** (identification des variables nécessaires à chaque éligibilité)
2. **Le parcours utilisateur** (ordonnancement des questions, formulations, raccourcis...)

## Les outils et représentations à mobiliser

Les représentations visuelles jouent un rôle central dans la conception. Elles rendent visibles les interactions entre modèles et facilitent le dialogue entre juristes, équipes produits, développeurs, etc.

Des éditeurs comme **Lucidchart**, **Figma** ou **Miro** facilitent la collaboration et permettent de créer des diagrammes clairs et partagés.

Des langages comme **Mermaid**, en revanche, permet un versionnage textuel et une maintenance automatisée.
- Facilite l'utilisation d'IA pour générer ou analyser des diagrammes.
- S'intègre dans des workflows de documentation (ex. : GitHub, MkDocs).

- Plugins figma ou extensions VSCode existent pour Mermaid.

- tendance à utiliser ce type de représentation en début de conception.
- on garde rarement les ressources visuelles synchronisées avec le code source du simulateur, qui passe au second plan par rapport au développement de fonctionnalités.
- aujurd'hui, on recommande de maintenir une documentation à jour avec des diagrammes Mermaid intégrés.
- L'ia peut aider à garder ces artefacts synchronisés.

### Arbres logiques

Les arbres de décision sont adaptés aux aides simples ou bien superposables.

```mermaid
graph TD
    A[Âge < 25 ans ?] -->|Oui| B[En formation ?]
    A -->|Non| C[Situation professionnelle ?]
    B -->|Oui| D[Bourse étudiante]
    B -->|Non| E[Mission locale]
    C -->|Salarié| F[Prime d'activité]
    C -->|Chômeur| G[ARE / RSA]
```

### Carte visuelle des variables

Les cartes de variables illustrent les recouvrements et divergences entre les aides.

```mermaid
graph LR
    subgraph APL
        R1[Revenu foyer]
        T1[Type logement]
        Z1[Zone géographique]
    end
    subgraph Aide Départementale
        R2[Revenu foyer]
        T2[Type logement]
        Z2[Code postal]
    end
    subgraph Aide Municipale
        R3[Revenu actuel]
        T3[Type logement]
        Z3[Quartier prioritaire]
    end
    R1 --- R2
    T1 --- T2 --- T3
```

## Diagramme de flux

Les diagrammes de flux illustrent le parcours utilisateur à travers les différentes étapes de questions et de décisions.

```mermaid
flowchart TD
    Start([Début]) --> Q1{Question 1}
    Q1 -->|Oui| Q2{Question 2}
    Q1 -->|Non| Q3{Question 3}
    Q2 --> Result1[Résultat A]
    Q3 --> Result2[Résultat B]
    Result1 --> End([Fin])
    Result2 --> End([Fin])
```

## Approche centrée sur les profils

Les personas servent à tester les arbres et à identifier les redondances ou incompréhensions.  
Ils aident à repérer les zones de friction avant la phase technique.

> Exemple : *Marie, 24 ans, étudiante en colocation, travaille dix heures par semaine, parents séparés.*

Cette méthode contribue à ajuster la granularité des questions et à vérifier la cohérence du parcours.

## Grille d'arbitrage

Chaque décision de simplification ou de fusion doit être documentée. Une grille d’arbitrage permet de garder trace des compromis entre précision réglementaire et lisibilité.

| Question originale | Problème identifié | Solution retenue | Impact | Validation |
|--------------------|-------------------|------------------|---------|------------|
| “Formation initiale ou continue ?” | Distinction peu claire | Fusionnée en “Êtes-vous étudiant ?” | Perte mineure de précision | Validé par expert métier |

Ce tableau formalise les choix structurants du parcours et contribue à la traçabilité.

## ADR (Architecture Decision Records)
Les ADR documentent les décisions architecturales majeures prises lors de la conception du simulateur multi-aide. Elles permettent de garder une trace des choix techniques et méthodologiques, facilitant ainsi la maintenance et l'évolution future du simulateur.
Ils sont particulièrement utiles dans un contexte de conception de simulateur, où de nombreux arbitrages et compromis doivent être faits entre différentes contraintes (techniques, réglementaires, UX, etc.).

## Étude de cas : modélisation croisée d’aides logement

La modélisation croisée des **APL**, d’une **aide départementale** et d’une **aide municipale** illustre la complexité de l’intégration.

### Correspondance des variables

| Variable | APL | Aide départementale | Aide municipale | Question commune ? |
|-----------|-----|--------------------|-----------------|--------------------|
| Revenu foyer | N-1 | N-2 | Actuel | ❌ |
| Type logement | Location/propriété | Location seule | Tous types | ✅ |
| Zone géographique | Zone APL | Code postal | Quartier prioritaire | ❌ |

**Analyse** :
- Des incohérences portent sur les périodes de revenus.
- Des redondances concernent le type de logement, consolidable en une seule question. Certaines divergences subsistent mais sont explicitées dans la documentation.

**Validation**
- Les arbitrages sont testés sur plusieurs profils représentatifs.
- Cette validation permet de vérifier la pertinence du parcours sans perte de sens métier.

## Principes de conception

Un simulateur multi-aide repose sur quatre principes :

1. Partir des règles pour déterminer les informations indispensables.  
2. Factoriser intelligemment les questions en altérant le moins possible la signification juridique.  
3. Tracer les arbitrages pour maintenir la lisibilité et la réversibilité.  
4. Conserver la modularité : certaines aides peuvent être simulées en option.

Ces principes assurent l’équilibre entre rigueur et accessibilité.

### Groupement des questions

```mermaid
graph TD
    A[Questions communes] --> B{Choix du module}
    B --> C[Logement]
    B --> D[Emploi]
    B --> E[Famille]
    C --> F[Résultats logement]
    D --> G[Résultats emploi]
    E --> H[Résultats famille]
    F --> I[Synthèse globale]
    G --> I
    H --> I
```

### Restitution et expérience utilisateur

Le simulateur ne se limite pas aux résultats d'éligibilités et de monter : il doit aussi proposer une **restitution claire et segmentée**.

Par ailleurs, quelques bonnes pratiques :
- La restitution doit refléter la clarté du calcul et la provenance des données.
- Les résultats gagnent en lisibilité lorsqu’ils sont regroupés par **thématique de vie** plutôt que par organisme.
- Chaque aide doit mentionner sa **source réglementaire** et ses **conditions d’incertitude**.
- Un résumé synthétique, exportable ou imprimable, renforce la transparence.
