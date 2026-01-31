import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'BasedLink',
  tagline: 'The Viral Onchain Content Engine powered by Verifiable AI',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.auto-linkid.com',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'Nicholandn22', // Usually your GitHub org/user name.
  projectName: 'docsBasedIn', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/Auto-Linkid',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  clientModules: [require.resolve('./src/client-modules/coming-soon.ts')],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'BasedLink',
      logo: {
        alt: 'BasedLink Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/Auto-Linkid',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/',
            },
            {
              label: 'Quick Start',
              to: '/docs/guides/quick-start',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: '#coming-soon',
            },
            {
              label: 'Twitter',
              href: '#coming-soon',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Auto-Linkid',
            },
          ],
        },
      ],
      copyright: `Copyright © Rp. {new Date().getFullYear()} BasedLink. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
