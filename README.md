# Aides Simplifiées - Documentation

Documentation technique et méthodologique pour la modélisation et la simulation des aides publiques.

## 🚀 Déploiement automatique sur GitHub Pages

Ce projet est configuré pour un déploiement automatique sur GitHub Pages via GitHub Actions.

### Configuration

- **GitHub Actions Workflow**: `.github/workflows/deploy.yml`
- **URL de base**: `/aides-simplifiees-docs/` (configurée dans `docs/.vitepress/config.mts`)
- **Sortie de build**: `docs/.vitepress/dist/`

### Processus de déploiement

1. **Déclenchement automatique** : À chaque push sur la branche `main`
2. **Build** : Installation des dépendances avec pnpm et build VitePress
3. **Déploiement** : Publication automatique sur GitHub Pages

### Première configuration (à faire une seule fois)

1. Aller dans les paramètres de votre repository GitHub
2. Section "Pages" dans le menu latéral
3. Sous "Source", sélectionner "GitHub Actions"
4. Le workflow se déclenchera automatiquement au prochain push

### URL du site déployé

Une fois configuré, votre documentation sera accessible à :
`https://[votre-username].github.io/aides-simplifiees-docs/`

## 🛠 Développement local

### Prérequis

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Serveur de développement

```bash
pnpm run docs:dev
```

Le site sera accessible sur `http://localhost:5173`

### Build local

```bash
pnpm run docs:build
```

### Prévisualisation du build

```bash
pnpm run docs:preview
```

## 📁 Structure du projet

```
├── docs/                          # Documentation source
│   ├── .vitepress/
│   │   ├── config.mts             # Configuration VitePress
│   │   └── dist/                  # Build output (ignoré par Git)
│   ├── simulateurs/               # Section simulateurs
│   ├── glossaire.md              # Glossaire
│   ├── historique.md             # Historique
│   ├── index.md                  # Page d'accueil
│   ├── introduction.md           # Introduction
│   └── pourquoi.md               # À quoi ça sert ?
├── .github/workflows/deploy.yml  # Workflow GitHub Actions
├── package.json                  # Configuration npm/pnpm
└── pnpm-lock.yaml               # Lock file pnpm
```

## 🎨 Fonctionnalités

- **VitePress** : Générateur de site statique moderne
- **Mermaid** : Diagrammes intégrés
- **Recherche locale** : Recherche dans la documentation
- **Mode sombre** : Basculement automatique/manuel
- **Responsive** : Adapté mobile/desktop

## 📝 Contribution

1. Modifier les fichiers Markdown dans le dossier `docs/`
2. Tester localement avec `pnpm run docs:dev`
3. Commiter et pusher sur `main`
4. Le déploiement se fait automatiquement

## 🔗 Liens utiles

- [Documentation VitePress](https://vitepress.dev/)
- [GitHub Pages](https://pages.github.com/)
- [Repository source](https://github.com/betagouv/aides-simplifiees-docs)
