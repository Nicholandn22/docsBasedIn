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
            'https://github.com/Nicholandn22/docsBasedIn/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/Nicholandn22/docsBasedIn/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

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
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/Nicholandn22/docsBasedIn',
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
              to: '/docs/intro',
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
              href: 'https://discord.gg/auto-linkid',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/auto_linkid',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Nicholandn22/docsBasedIn',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BasedLink. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
