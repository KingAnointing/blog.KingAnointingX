module.exports = {
  title: 'KingAnointingX',
  tagline: 'Software Engineer { Backend Developer} and Aspiring Blockchain Developer .',
  url: '', // todo : fill with url after making the first push
  // url: 'https://blog.kinganointingx.me',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/protpf.jpeg',
  organizationName: 'KingAnointing', // Usually your GitHub org/user name.
  projectName: 'blog.kinganointingx.me', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: true,
      title: "Ramblings from KingAnointing",
      logo: {
        alt: "KingAnointingX",
        src: "img/protpf.jpeg",
        href: "https://",
        target: "_blank",
      },
      items: [
        { to: "/", label: "Blog", position: "left" },
        {
          to: "/docs/",
          activeBasePath: "docs",
          label: "Notes",
          position: "left",
        },
        {
          href: '', // todo : fill out after first push
          // href: 'https://KingAnointingx.me/about', 
          label: 'About',
          position: 'right',
        },
        {
          href: '', // todo : fill out after first push
          // href: 'https://kinganointingx.me/works', 
          label: 'Works',
          position: 'right',
        },
        {
          href: '', // todo : fill out after first push
          // href: 'https://kinganointingx.me/talks', 
          label: 'Talks',
          position: 'right',
        },
        {
          href: 'https://drive.google.com/file/d/10zrULAABNNhXr0St00NG43L-RbrENfBn/view?usp=share_link',
          label: 'Resume',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Connect',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/KingAnointingX',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/KingAnointing',
            },
            {
              label: 'Email',
              href: 'mailto:apexchaos@duck.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog  Archive',
              // href: 'https://blog.kinganointingx.me/archive',
            },
            {
              label: 'Work',
              // href: 'https://kinganointingx.me/works',
            },
            {
              label: 'Resume',
              href: 'https://drive.google.com/file/d/10zrULAABNNhXr0St00NG43L-RbrENfBn/view?usp=share_link',
            },
          ],
        },
      ],
      copyright: `Last updated on ${new Date().toDateString()}`,
    },
  },
  customFields: {
    // imgurl: 'https://kinganointingxme.mo.cloudinary.net',
    imgurl: '', //? : ask saintmalik what this is about
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        googleAnalytics: {
          trackingID: 'UA-123518521-4',
          anonymizeIP: true, // Should IPs be anonymized?
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          disableVersioning: false,
          editCurrentVersion: false,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          blogTitle: 'KingAnointing Software Engineering X Blockchain Development Blog',
          blogDescription: 'Blog For Software Et Blockchain Development, Open Source, Golang X Solidity, Software Optimization And More As Discovered !!',
          // showReadingTime: true,
          path: "./blog",
          routeBasePath: "/"
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};