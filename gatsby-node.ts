const path = require("path")

exports.createPages = async ({
  graphql,
  actions,
}: {
  graphql: any
  actions: any
}) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  const posts = result.data.allMdx.nodes

  //calculate the number of pages
  const postPerPage = 3
  const numberOfPages = Math.ceil(posts.length / postPerPage)

  //create pages for post
  Array.from({ length: numberOfPages }).forEach((_, i) => {
    const pagePath = i === 0 ? `/blog/` : `/blog/${i + 1}`
    createPage({
      path: pagePath,
      component: path.resolve("./src/templates/blog-list-template.tsx"),
      context: {
        limit: postPerPage,
        skip: i * postPerPage,
        numberOfPages,
        currentPage: i + 1,
      },
    })
  })

  result.data.allMdx.nodes.forEach((node: any) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/post-template.tsx`),
      context: { id: node.id },
    })
  })
}
