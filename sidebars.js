
// module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  module.exports = {
    docs: [
      {
        type: "doc",
        id: "intro",
      },
      {
        type: "category",
        label: "Solutions to Bugs from Day to Day Activities",
        items: [
          "debug-crontab-tasks",
          "fix-docusaurus-solutions",
          "converting-images-to-webp",
          "setting-up-ghost-blog-on-linode",
          "osint",
          "vps-workspace-accessibility",
          "bulk-typo-fixing",
          "subdomain-checks",
          "vps-issues",
          "hackthebox-invite",
          "wameir",
          "ifihadinvested",
        ],
      },
      {
        type: "category",
        label: "Learning GoLang",
        items: [
          "variables-in-golang",
          "arrays-in-golang",
        ],
      },
      {
        type: "category",
        label: "Could Help You",
        items: [
          "custom-mails",
        ],
      },
    ],
  };