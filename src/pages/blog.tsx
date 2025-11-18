import Layout from "../components/layout"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"

export default function BlogPage() {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            slug
            featured {
              childImageSharp {
                gatsbyImageData(width: 400, placeholder: BLURRED)
              }
              publicURL
            }
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  `)

  const posts = data.allMdx.nodes
  return (
    <Layout siteTitle="My Gatsby Site">
      <h1 className="text-2xl font-bold">Blog Page</h1>
      <div>
        {posts.map((node: any) => {
          console.log("node", node)
          const normalize = (s: string) =>
            String(s || "").replace(/^\/+|\/+$/g, "")
          const slug = normalize(node.frontmatter.slug || "")
          const href = `/blog/${slug}`
          const image = getImage(node.frontmatter.featured)
          const postStatus = "Published"
          return (
            <div
              className="border border-gray-300 rounded-md p-4 mb-4"
              key={node.id}
            >
              <h2 className="text-lg font-bold mb-2">
                <Link to={href} className="no-underline">
                  {node.frontmatter.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-2">
                {`${postStatus} on ${node.frontmatter.date}`}
              </p>
              {image ? (
                <Link to={href}>
                  <GatsbyImage
                    image={image}
                    alt={node.frontmatter.title}
                    className="mb-4"
                  />
                </Link>
              ) : node.frontmatter.featured?.publicURL ? (
                <Link to={href}>
                  <img
                    src={node.frontmatter.featured.publicURL}
                    alt={node.frontmatter.title}
                    className="mb-4 w-full h-auto"
                  />
                </Link>
              ) : null}
              <p className="mb-0">{node.excerpt}</p>
              <Link to={href} className="text-blue-600 hover:underline">
                Read more →
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
