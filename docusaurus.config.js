// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const DefaultLocale = "en";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "dora-rs",
  tagline: "🚙🤖💻 Making robotic applications fast and simple!",
  favicon: "img/favicon.ico",
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  // Set the production url of your site here
  url: "https://dora.carsmos.ai",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "dora-rs", // Usually your GitHub org/user name.
  projectName: "dora", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-CN"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return sidebarItems.filter(
              (item) =>
                // This makes sure that the landing pages are not duplicated in the sidebars
                item.id !== "guides/readme" &&
                item.id !== "references/readme" &&
                item.id !== "showcase/readme"
            );
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            // Link to Crowdin for French docs
            if (locale !== DefaultLocale) {
              return `https://crowdin.com/dora-rs/${locale}`;
            }
            // Link to GitHub for English docs
            return `https://github.com/dora-rs/dora-rs.github.io/edit/main/${versionDocsDirPath}/${docPath}`;
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "dora-rs",
        //logo: {
        //alt: "My Site Logo",
        //src: "img/logo.svg",
        //},
        items: [
          {
            type: "docSidebar",
            sidebarId: "guides",
            position: "left",
            label: "Guides",
            to: "",
          },
          {
            label: "API",
            items: [
              {
                type: "doc",
                docId: "api/python-api",
                label: "Python",
              },
              {
                label: "Rust (via Docs.rs)",
                href: "https://docs.rs/dora-node-api/latest/dora_node_api/",
                target: "_self",
              },
              {
                type: "doc",
                docId: "api/c-api",
                label: "C",
              },
              {
                type: "doc",
                docId: "api/dataflow-config",
                label: "Configuration",
              },
              {
                type: "doc",
                docId: "api/cli",
                label: "CLI",
              },
            ],
          },
          //{
          //type: "docSidebar",
          //sidebarId: "showcase",
          //position: "left",
          //label: "Showcase",
          //},
          {
            type: "docSidebar",
            sidebarId: "nodes_operators",
            label: "Nodes and Operators",
            position: "left",
          },
          //{
          //type: "docSidebar",
          //sidebarId: "operators",
          //position: "left",
          //label: "Nodes and Operators",
          //},
          {
            to: "docs/community",
            position: "left",
            label: "Community",
          },
          // { to: "/blog", label: "About", position: "left" },
          {
            href: "https://github.com/dora-rs/dora",
            label: "GitHub",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                to: "https://crowdin.com/project/dora-rs",
                label: "Help us translate",
              },
            ],
          },
          //{
          //type: "docsVersionDropdown",
          //position: "right",
          //className: "navbarIcon versionIcon",
          //dropdownItemsBefore: [
          //{
          //type: "html",
          //value: "<b>Stable</b>",
          //},
          //],
          //dropdownActiveClassDisabled: true,
          //},
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Repository",
            items: [
              {
                label: "dora-rs",
                href: "https://github.com/dora-rs/dora",
              },
              {
                label: "dora-drives",
                href: "https://github.com/dora-rs/dora-drives",
              },
            ],
          },
          {
            title: "Terms and policies",
            items: [
              {
                label: "License",
                href: "https://github.com/dora-rs/dora/blob/main/LICENSE",
              },
              {
                label: "Privacy policy",
                to: "docs/footers/privacy-policy",
              },
            ],
          },
          {
            title: "Contact",
            items: [
              {
                label: "Github Discussions",
                href: "https://github.com/orgs/dora-rs/discussions"
              }
            ]
          }
          //    {
          //    title: "Community",
          //    items: [
          //    {
          //    label: "Stack Overflow",
          //    href: "https://stackoverflow.com/questions/tagged/docusaurus",
          //    },
          //    {
          //    label: "Discord",
          //    href: "https://discordapp.com/invite/docusaurus",
          //    },
          //    {
          //    label: "Twitter",
          //    href: "https://twitter.com/docusaurus",
          //    },
          //    ],
          //    },
          //{
          //title: "More",
          //items: [
          //{
          //label: "Blog",
          //to: "/blog",
          //},
          //{
          //label: "GitHub",
          //href: "https://github.com/facebook/docusaurus",
          //},
          //    ],
          //  },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} dora-rs.`,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "ZNAO6JQMLV",

        // Public API key: it is safe to commit it
        apiKey: "fbd9b5b34463d9152f1099f8b5b56dd3",

        indexName: "dora-carsmos",
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
