import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';

/**
 * @see https://vitepress.dev/reference/site-config
 */

export default defineConfig({
  title: "Aides simplifiées",
  description: "Documentation technique et méthodologique pour la modélisation et la simulation des aides publiques",
  lang: 'fr-FR',
  base: '/aides-simplifiees-docs/',
  markdown: {
    config(md) {
      md.use(MermaidMarkdown);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Le produit', link: '/00_meta/02_aides-simplifiées' },
      { text: 'Simulateurs', link: '/01_simulateurs/' },
      { text: 'Glossaire', link: '/99_annexe/glossaire' }
    ],

    sidebar: [
      {
        text: 'Contexte',
        items: [
          { text: 'Aides simplifiées', link: '/00_meta/02_aides-simplifiées' },
          { text: 'Enjeux Rules as Code', link: '/00_meta/01_enjeux-rules-as-code' }
        ]
      },
      {
        text: 'Guide des simulateurs',
        collapsed: false,
        items: [
          { text: 'Vue d\'ensemble', link: '/01_simulateurs/' },
          { text: 'Fondamentaux', link: '/01_simulateurs/01_fondamentaux' },
          { text: 'Modéliser une aide', link: '/01_simulateurs/02_modeliser-une-aide' },
          { text: 'Simulateur multi-aide', link: '/01_simulateurs/03_simulateur-multi-aide' },
          { text: 'Passer en code', link: '/01_simulateurs/03_passer-en-code' },
          { text: 'Tester et ajuster', link: '/01_simulateurs/05_tester-ajuster' },
          { text: 'Maintenir', link: '/01_simulateurs/06_maintenir' }
        ]
      },
      {
        text: 'Annexe',
        items: [
          { text: 'Glossaire', link: '/99_annexe/glossaire' },
          { text: 'Historique', link: '/99_annexe/historique' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shallowred/aides-simplifiees' }
    ],

    footer: {
      message: 'Documentation sous licence ouverte',
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/shallowred/aides-simplifiees-docs/edit/main/docs/:path',
      text: 'Modifier cette page sur GitHub'
    }
  },
  vite: {
    plugins: [MermaidPlugin()],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid', '@gouvfr/dsfr'],
    },
    assetsInclude: ['**/*.woff2', '**/*.woff'],
  },
})
