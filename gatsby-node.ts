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

  result.data.allMdx.nodes.forEach((node: any) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/post-template.tsx`),
      context: { id: node.id },
    })
  })
}
