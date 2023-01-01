module.exports = {
  title: "KingAnointingX",
  tagline:
    "Software Engineer { Backend Developer} and Wannabe Blockchain Developer .",
  url: "https://kinganointing-blog.netlify.app",
  baseUrl: "/",
  trailingSlash: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/protpf.jpeg",
  organizationName: "KingAnointingX", // Usually your GitHub org/user name.
  projectName: "https://kinganointing-blog.netlify.app", // Usually your repo name.
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
          to: "./docs/",
          activeBasePath: "docs",
          label: "Notes",
          position: "left",
        },
        {
          href: "https://kinganointing-blog.netlify.app/about",
          position: "right",
        },
        {
          href: "https://kinganointing-blog.netlify.app/works",
          label: "Works",
          position: "right",
        },
        {
          href: "https://kinganointing-blog.netlify.app/talks",
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
              href: "https://twitter.com/KingAnointingX",
            },
            {
              label: "GitHub",
              href: "https://github.com/KingAnointing",
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
              href: "https://kinganointing-blog.netlify.app/archive",
            },
            {
              label: "Work",
              href: "https://kinganointing-blog.netlify.app/works",
            },
            {
              label: "Resume",
              href: "https://drive.google.com/file/d/10zrULAABNNhXr0St00NG43L-RbrENfBn/view?usp=share_link",
            },
          ],
        },
      ],
      copyright: `Last updated on ${new Date().toDateString()}`,
    },
  },
  customFields: {
    // imgurl: 'https://kinganointingxme.mo.cloudinary.net',
    imgurl: "https://kinganointing-blog.netlify.app.mo.cloudinary.net", //? : ask saintmalik what this is about
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
            "KingAnointing Software Engineering X Blockchain Development Blog",
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
