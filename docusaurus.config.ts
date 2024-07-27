import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

require('dotenv').config();

const config: Config = {
  title: process.env.TITLE,
  tagline: 'Payment Aggronauts: Navigating the Financial Galaxy with Ease and Fun!',
  favicon: 'img/favicon.ico',
  plugins: [
    [
    "docusaurus-plugin-dotenv",
      {
        path: "./.env", // The path to your environment variables.
        systemvars: true, // Set to true if you would rather load all system variables as well (useful for CI purposes)
      },
    ]
  ],
  // Set the production url of your site here
  url: process.env.DOCUMENTATION_BASE_URL,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

//   // GitHub pages deployment config.
//   // If you aren't using GitHub pages, you don't need these.
//   organizationName: 'facebook', // Usually your GitHub org/user name.
//   projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
//   i18n: {
//     defaultLocale: 'en',
//   },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/gost-fintech/docs-api/tree/main/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/blog/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Finscender API',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        
        {to: '/blog', label: 'Blog', position: 'left'},
        {
            type: 'docsVersionDropdown',
            position: 'right'
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
              label: 'Documentation',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // }
            
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Finscender - Ascender's FinTech Documentation Platform`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
