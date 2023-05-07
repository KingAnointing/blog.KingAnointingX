module.exports = {
  title: "KingDaemonX",
  tagline:
    "Software Engineer 〣 Backend Developer 〣 Blockchain Developer",
  url: "https://kingdaemonx-blog.netlify.app",
  baseUrl: "/",
  trailingSlash: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/protpf.jpeg",
  organizationName: "KingDaemonX", // Usually your GitHub org/user name.
  projectName: "blog.KingDaemonX", // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: true,
      title: "Randoms from KingDaemonX",
      logo: {
        alt: "KingDaemonX",
        src: "img/protpf.jpeg",
        href: "https://kingdaemonx-blog.netlify.app",
        target: "_blank",
      },
      items: [
        { to: "/", label: "Blog", position: "left" },
        {
          to: "/docs/",
          activeBasePath: "docs",
          projectName: "blog.KingDaemonXX", // Usually your repo name.

          label: "Notes",
          position: "left",
        },
        {
          href: "https://kingdaemonx.netlify.app/about",
          label: "About",
          position: "right",
        },
        {
          href: "https://kingdaemonx.netlify.app/works",
          label: "Works",
          position: "right",
        },
        {
          href: "https://kingdameonx.netlify.app/talks",
          label: "Talks",
          position: "right",
        },
        {
          href: "https://drive.google.com/file/d/10zrULAABNNhXr0St00NG43L-RbrENfBn/view?usp=share_link",
          label: "Resume",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Connect",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/adetoye-anointing-155270235",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/KingDaemonX",
            },
            {
              label: "GitHub",
              href: "https://github.com/KingDaemonX",
            },
            {
              label: "Email",
              href: "mailto:apexchaos@duck.com",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog  Archive",
              href: "https://KingdaemonX-blog.netlify.app/archive",
            },
            {
              label: "Work",
              href: "https://KingdaemonX.netlify.app/works",
            },
            {
              label: "Resume",
              href: "https://drive.google.com/file/d/1yRQayLMwi1nwxB15x1vgdnwy8h4VQuRZ/view?usp=share_link",
            },
          ],
        },
      ],
      copyright: `Last updated on ${new Date().toDateString()}`,
    },
  },
  customFields: {
    // imgurl: 'https://KingDaemonXxme.mo.cloudinary.net',
    imgurl: "https://kingdaemonX.netlify.app.mo.cloudinary.net", //? : ask saintmalik what this is about
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        googleAnalytics: {
          trackingID: "UA-123518521-4",
          anonymizeIP: true, // Should IPs be anonymized?
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          disableVersioning: false,
          editCurrentVersion: false,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          blogTitle:
            "KingDaemonX Software Engineering X Blockchain Development Blog",
          blogDescription:
            "Blog For Software Et Blockchain Development, Open Source, Golang X Python, Software Optimization And More As Discovered !!",
          // showReadingTime: true,
          path: "./blog",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
