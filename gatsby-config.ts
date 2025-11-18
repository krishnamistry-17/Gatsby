//gatsby-config.ts
export default {
  siteMetadata: {
    //define the site metadata
    title: "My Gatsby Site",
    description: "A simple Gatsby site",
    author: "John Doe",
  },
  plugins: [
    "gatsby-plugin-typescript", //ts support
    "gatsby-plugin-image", //image support
    "gatsby-plugin-sharp", //image optimization
    "gatsby-transformer-sharp", //image transformation
    "gatsby-plugin-postcss", //tailwind/postcss
    {
      resolve: "gatsby-plugin-mdx", //mdx support
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images", //image support in markdown/mdx
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/posts`,
      },
    },
  ],
}
