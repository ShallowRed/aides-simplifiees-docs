# Ressources visuelles mutualisables

Ce document recense les **diagrammes et templates visuels** utiles pour :
- Améliorer la traçabilité entre texte réglementaire et code
- Faciliter la collaboration métier / produit / tech
- Documenter les architectures de simulateurs

Tous les templates sont en **Mermaid** (versionnables, intégrables dans VitePress/GitHub).

---

## 1. MODÉLISATION DES RÈGLES

### 1.1 Arbre de décision d'éligibilité

**Usage** : Visualiser les conditions d'éligibilité d'une aide pour validation métier.

```mermaid
flowchart TD
    START((Début)) --> Q1{Condition 1 ?}
    Q1 -->|Oui| Q2{Condition 2 ?}
    Q1 -->|Non| REJECT[❌ Non éligible]
    Q2 -->|Oui| Q3{Condition 3 ?}
    Q2 -->|Non| REJECT
    Q3 -->|Oui| ELIGIBLE[✅ Éligible]
    Q3 -->|Non| REJECT
    
    REJECT --> FIN1((Fin))
    ELIGIBLE --> CALCUL[Calcul du montant]
    CALCUL --> FIN2((Fin))
    
    style ELIGIBLE fill:#d4edda,stroke:#28a745
    style REJECT fill:#f8d7da,stroke:#dc3545
    style CALCUL fill:#cce5ff,stroke:#004085
```

**Template personnalisable** :

```
flowchart TD
    START((Début)) --> Q1{[CONDITION_1] ?}
    Q1 -->|Oui| Q2{[CONDITION_2] ?}
    Q1 -->|Non| REJECT[❌ Non éligible<br/>Motif: [MOTIF_1]]
    Q2 -->|Oui| ELIGIBLE[✅ Éligible]
    Q2 -->|Non| REJECT2[❌ Non éligible<br/>Motif: [MOTIF_2]]
```

---

### 1.2 Logigramme avec références légales

**Usage** : Documenter la traçabilité condition → article de loi.

```mermaid
flowchart TD
    subgraph "Art. L.351-1 CCH"
        A1[Résidence principale ?]
    end
    
    subgraph "Art. R.351-3 CCH"
        A2[Non rattaché au foyer fiscal parents ?]
    end
    
    subgraph "Art. D.351-5 CCH"
        A3[Ressources < plafond ?]
    end
    
    A1 -->|Oui| A2
    A1 -->|Non| X1[❌ Rejet Art. L.351-1]
    A2 -->|Oui| A3
    A2 -->|Non| X2[❌ Rejet Art. R.351-3]
    A3 -->|Oui| OK[✅ Éligible APL]
    A3 -->|Non| X3[❌ Rejet Art. D.351-5]
    
    click A1 "https://legifrance.gouv.fr/codes/article_lc/LEGIARTI..."
    click A2 "https://legifrance.gouv.fr/codes/article_lc/LEGIARTI..."
```

---

### 1.3 Graphe de dépendances entre variables

**Usage** : Comprendre les relations entre variables d'un modèle.

```mermaid
flowchart LR
    subgraph Entrées
        E1[âge]
        E2[revenus_bruts]
        E3[nb_enfants]
        E4[loyer]
    end
    
    subgraph Intermédiaires
        I1[revenus_nets]
        I2[quotient_familial]
        I3[plafond_ressources]
    end
    
    subgraph Sorties
        S1[éligibilité]
        S2[montant_aide]
    end
    
    E2 --> I1
    E3 --> I2
    I1 --> I2
    E3 --> I3
    I2 --> S1
    I3 --> S1
    S1 --> S2
    E4 --> S2
    E1 --> S1
    
    style E1 fill:#e1f5fe
    style E2 fill:#e1f5fe
    style E3 fill:#e1f5fe
    style E4 fill:#e1f5fe
    style S1 fill:#c8e6c9
    style S2 fill:#c8e6c9
```

---

### 1.4 Timeline des périodes de calcul

**Usage** : Clarifier les temporalités (revenus N-1, N-2, projection).

```mermaid
gantt
    title Périodes de référence pour le calcul
    dateFormat  YYYY-MM
    
    section Revenus
    Année N-2 (déclaration)    :done, rev2, 2023-01, 2023-12
    Année N-1 (actualisation)  :active, rev1, 2024-01, 2024-12
    
    section Situation
    Situation actuelle         :crit, sit, 2025-01, 2025-03
    
    section Aide
    Période de versement       :aid, 2025-04, 2025-12
```

---

## 2. ARCHITECTURE TECHNIQUE

### 2.1 Flux formulaire → moteur → résultat

**Usage** : Documenter l'architecture complète d'un simulateur.

```mermaid
flowchart LR
    subgraph Frontend
        F1[📝 Formulaire]
        F2[🔄 State Management]
    end
    
    subgraph Mapping
        M1[📋 Request Builder]
        M2[🔀 Dispatchers]
        M3[📅 Périodisation]
    end
    
    subgraph Moteur
        E1[⚙️ OpenFisca API]
        E2[📜 Publicodes Engine]
    end
    
    subgraph Résultats
        R1[📊 Calcul éligibilité]
        R2[💰 Montant aide]
        R3[📄 Explications]
    end
    
    F1 --> F2
    F2 --> M1
    M1 --> M2
    M2 --> M3
    M3 --> E1
    M3 --> E2
    E1 --> R1
    E2 --> R1
    R1 --> R2
    R2 --> R3
    R3 --> F1
```

---

### 2.2 Détail de la couche de mapping (traçabilité)

**Usage** : Documenter la transformation réponses utilisateur → variables moteur.

```mermaid
flowchart TB
    subgraph "Réponse utilisateur"
        U1["situation-professionnelle: 'alternance'"]
    end
    
    subgraph "MappingResolver"
        MR1["variables.ts<br/>Trouve: dispatchSituationProfessionnelle"]
    end
    
    subgraph "Dispatcher"
        D1["case 'alternance':<br/>return { alternant: true }"]
    end
    
    subgraph "EntityManager"
        EM1["IndividuManager.addVariable()<br/>'alternant', true, '2025-01'"]
    end
    
    subgraph "Requête OpenFisca"
        OF1["individus:<br/>  demandeur:<br/>    alternant:<br/>      2025-01: true"]
    end
    
    U1 --> MR1
    MR1 --> D1
    D1 --> EM1
    EM1 --> OF1
    
    style U1 fill:#fff3cd
    style OF1 fill:#d1ecf1
```

---

### 2.3 Architecture multi-moteur

**Usage** : Documenter un système hybride (Publicodes + OpenFisca).

```mermaid
flowchart TB
    subgraph "Schéma JSON"
        S1["{ engine: 'publicodes' }"]
        S2["{ engine: 'openfisca' }"]
    end
    
    subgraph "Router"
        R1{engine ?}
    end
    
    subgraph "Publicodes (Client)"
        P1[Engine JS]
        P2[Règles YAML]
        P1 --> P2
    end
    
    subgraph "OpenFisca (Serveur)"
        O1[Backend Proxy]
        O2[API Python]
        O1 --> O2
    end
    
    S1 --> R1
    S2 --> R1
    R1 -->|publicodes| P1
    R1 -->|openfisca| O1
    
    P1 --> RES[Résultats]
    O2 --> RES
```

---

## 3. COLLABORATION MÉTIER-PRODUIT

### 3.1 Workflow de validation métier

**Usage** : Documenter le processus de validation des règles.

```mermaid
sequenceDiagram
    participant Dev as 👩‍💻 Développeur
    participant PR as 📋 Pull Request
    participant Expert as 👨‍⚖️ Expert métier
    participant CI as 🤖 CI/Tests
    participant Prod as 🚀 Production
    
    Dev->>PR: Crée cas type + règle
    PR->>CI: Déclenche tests auto
    CI-->>PR: ✅ Tests passent
    PR->>Expert: Demande review
    
    alt Validation OK
        Expert->>PR: ✅ Approuve + commente
        PR->>Prod: Merge
    else Correction nécessaire
        Expert->>PR: ❌ Demande modification
        PR->>Dev: Retour avec commentaires
        Dev->>PR: Corrige
    end
```

---

### 3.2 Matrice RACI projet simulateur

**Usage** : Clarifier les responsabilités dans l'équipe.

```mermaid
quadrantChart
    title Responsabilités par domaine
    x-axis Technique --> Métier
    y-axis Opérationnel --> Stratégique
    
    quadrant-1 Expert juridique
    quadrant-2 Product Owner
    quadrant-3 Developpeur
    quadrant-4 Designer UX
    
    Interpretation regles: [0.85, 0.7]
    Validation cas types: [0.75, 0.4]
    Veille reglementaire: [0.9, 0.6]
    Architecture technique: [0.15, 0.5]
    Implementation code: [0.1, 0.3]
    Tests automatises: [0.2, 0.4]
    Parcours utilisateur: [0.5, 0.5]
    Priorisation features: [0.6, 0.8]
```

---

### 3.3 Cycle de vie d'une règle

**Usage** : Visualiser les états d'une règle dans le système.

```mermaid
stateDiagram-v2
    [*] --> Identifiee: Texte repéré
    Identifiee --> Modelisee: Analyse terminée
    Modelisee --> Implementee: Code écrit
    Implementee --> Testee: Cas types créés
    Testee --> Validee: Expert approuve
    Validee --> Production: Déployée
    
    Production --> MiseAJour: Évolution réglementaire
    MiseAJour --> Modelisee
    
    Production --> Deprecie: Règle abrogée
    Deprecie --> [*]
    
    note right of Validee
        Cas types conservés
        comme tests de régression
    end note
```

---

## 4. TRAÇABILITÉ

### 4.1 Carte de correspondance texte → code

**Usage** : Tableau de traçabilité pour audit.

```mermaid
flowchart LR
    subgraph "Texte réglementaire"
        T1["Art. L.821-1<br/>Conditions AAH"]
        T2["Art. R.821-4<br/>Taux incapacité"]
        T3["Art. D.821-1<br/>Plafond ressources"]
    end
    
    subgraph "Règles Publicodes"
        R1["aah . eligibilite"]
        R2["aah . taux_incapacite"]
        R3["aah . plafond"]
    end
    
    subgraph "Tests"
        C1["cas-aah-01.yaml"]
        C2["cas-aah-02.yaml"]
    end
    
    T1 -.->|implémente| R1
    T2 -.->|implémente| R2
    T3 -.->|implémente| R3
    R1 -.->|testé par| C1
    R2 -.->|testé par| C1
    R3 -.->|testé par| C2
```

---

### 4.2 Diagramme de conformité

**Usage** : Dashboard visuel de couverture réglementaire.

```mermaid
pie showData
    title Couverture du dispositif APL
    "Implémenté et testé" : 75
    "Implémenté non testé" : 15
    "Non implémenté" : 10
```

---

### 4.3 Historique des interprétations

**Usage** : Documenter les choix d'interprétation dans le temps.

```mermaid
gitGraph
    commit id: "v1.0 - Règle initiale"
    commit id: "v1.1 - Ajout exception A"
    branch interpretation-revenus
    commit id: "Question: inclure revenus exceptionnels ?"
    commit id: "Décision: exclure (validé DGCS)"
    checkout main
    merge interpretation-revenus id: "v1.2 - Clarification revenus"
    commit id: "v1.3 - Nouveau barème 2025"
```

---

## 5. PARCOURS UTILISATEUR

### 5.1 Funnel de simulation

**Usage** : Analyser les abandons dans le parcours.

```mermaid
flowchart TD
    E1["👤 1000 visiteurs"] --> E2["📝 800 démarrent<br/>(80%)"]
    E2 --> E3["✏️ 600 complètent Q1-Q3<br/>(75%)"]
    E3 --> E4["📊 450 voient résultat<br/>(75%)"]
    E4 --> E5["✅ 200 cliquent 'Faire demande'<br/>(44%)"]
    
    E2 -.-> A1["❌ 200 abandons<br/>Page d'accueil"]
    E3 -.-> A2["❌ 200 abandons<br/>Questions complexes"]
    E4 -.-> A3["❌ 150 abandons<br/>Résultat incompris"]
    
    style E5 fill:#c8e6c9
    style A1 fill:#ffcdd2
    style A2 fill:#ffcdd2
    style A3 fill:#ffcdd2
```

---

### 5.2 Parcours conditionnel

**Usage** : Documenter la logique de branchement du formulaire.

```mermaid
flowchart TD
    Q1[Êtes-vous étudiant ?] -->|Oui| Q2A[Êtes-vous boursier ?]
    Q1 -->|Non| Q2B[Êtes-vous salarié ?]
    
    Q2A -->|Oui| Q3A[Échelon de bourse ?]
    Q2A -->|Non| Q3B[Revenus des parents ?]
    
    Q2B -->|Oui| Q3C[Salaire mensuel ?]
    Q2B -->|Non| Q3D[Êtes-vous au chômage ?]
    
    Q3A --> RESULT[Calcul résultat]
    Q3B --> RESULT
    Q3C --> RESULT
    Q3D --> RESULT
    
    style Q1 fill:#e3f2fd
    style RESULT fill:#c8e6c9
```

---

## 6. TEMPLATES RÉUTILISABLES

### 6.1 Template générique d'aide

Copier-coller ce template pour documenter une nouvelle aide :

```markdown
## [NOM DE L'AIDE]

### Références légales
- Article principal : [LIEN LÉGIFRANCE]
- Décret d'application : [LIEN]
- Circulaire : [LIEN]

### Arbre de décision

\`\`\`mermaid
flowchart TD
    START((Début)) --> C1{[CONDITION_1] ?}
    C1 -->|Oui| C2{[CONDITION_2] ?}
    C1 -->|Non| REJECT[❌ Non éligible]
    C2 -->|Oui| ELIGIBLE[✅ Éligible]
    C2 -->|Non| REJECT
\`\`\`

### Variables

| Variable | Type | Source | Période |
|----------|------|--------|---------|
| [var_1] | nombre | Saisie | N |
| [var_2] | booléen | Calculé | N-1 |

### Cas types de validation

| Cas | Situation | Résultat attendu | Validé par |
|-----|-----------|------------------|------------|
| 001 | [description] | Éligible, 150€ | [expert] |
| 002 | [description] | Non éligible | [expert] |
```

---

### 6.2 Checklist visuelle de conformité

```mermaid
flowchart LR
    subgraph "Texte"
        T1[✅ Source identifiée]
        T2[✅ Articles listés]
        T3[⚠️ Interprétations documentées]
    end
    
    subgraph "Code"
        C1[✅ Règles implémentées]
        C2[✅ Tests unitaires]
        C3[❌ Tests régression]
    end
    
    subgraph "Validation"
        V1[✅ Cas types créés]
        V2[⚠️ Expert a reviewé]
        V3[❌ En production]
    end
    
    T1 --> C1
    T2 --> C1
    T3 --> C1
    C1 --> V1
    C2 --> V1
    C3 --> V1
```

---

## 7. RESSOURCES COMPLÉMENTAIRES

### Outils recommandés

| Outil | Usage | Format |
|-------|-------|--------|
| **Mermaid** | Diagrammes versionnables | Code dans Markdown |
| **Excalidraw** | Schémas collaboratifs rapides | SVG/PNG |
| **Figma** | Maquettes UI, design system | Figma |
| **Whimsical** | Flowcharts, wireframes | Cloud |
| **draw.io** | Diagrammes techniques | XML/SVG |

### Intégrations

- **VitePress** : Support Mermaid natif avec plugin
- **GitHub** : Rendu Mermaid dans les Markdown
- **Notion** : Embed via code block
- **Confluence** : Plugin Mermaid

### Bonnes pratiques

1. **Versionner les diagrammes** : Préférer Mermaid (code) à des images
2. **Lier aux sources** : Ajouter des liens cliquables vers Légifrance
3. **Maintenir à jour** : Un diagramme obsolète est pire que pas de diagramme
4. **Simplifier** : Un diagramme doit clarifier, pas complexifier
5. **Tester le rendu** : Vérifier sur différents supports (web, PDF, print)

---

## Voir aussi

- [Patterns architecturaux](/02_ecosysteme/03_patterns)
- [Collaboration métier-produit](/02_ecosysteme/04_collaboration)
- [Modéliser une aide](/01_simulateurs/02_modeliser-une-aide)
