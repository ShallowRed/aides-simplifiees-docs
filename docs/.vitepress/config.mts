import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
// https://vitepress.dev/reference/site-config
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
      { text: 'Introduction', link: '/introduction' },
      { text: 'Simulateurs', link: '/simulateurs/' },
      { text: 'Glossaire', link: '/glossaire' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Présentation', link: '/introduction' },
          { text: 'À quoi ça sert ?', link: '/pourquoi' }
        ]
      },
      {
        text: 'Simulateurs',
        items: [
          { text: 'Vue d\'ensemble', link: '/simulateurs/' },
          { text: 'Modéliser une aide', link: '/simulateurs/modeliser-une-aide' },
          { text: 'Simulateur multi-aide', link: '/simulateurs/simulateur-multi-aide' },
          { text: 'Importance de la modélisation', link: '/simulateurs/importance-modelisation' },
          { text: 'Passer en code', link: '/simulateurs/passer-en-code' },
          { text: 'Tester et ajuster', link: '/simulateurs/tester-ajuster' },
          { text: 'Maintenir', link: '/simulateurs/maintenir' }
        ]
      },
      {
        text: 'Références',
        items: [
          { text: 'Glossaire', link: '/glossaire' },
          { text: 'Historique', link: '/historique' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/betagouv/aides-simplifiees' }
    ],

    footer: {
      message: 'Documentation sous licence ouverte',
      copyright: 'Copyright © 2025 Aides simplifiées - beta.gouv.fr'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/betagouv/aides-simplifiees-docs/edit/main/docs/:path',
      text: 'Modifier cette page sur GitHub'
    }
  },
  vite: {
    plugins: [MermaidPlugin()],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },
})
