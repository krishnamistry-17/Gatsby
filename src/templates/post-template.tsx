// src/templates/post-template.tsx (your single blog post page
import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

export default function PostTemplate({ data, children }: any) {
  console.log("data", data)
  const { title, date, featured } = data.mdx.frontmatter
  const { excerpt } = data.mdx
  return (
    <Layout siteTitle="My Gatsby Site">
      <article>
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-4 shadow-xs max-w-[450px]">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500">published on {date}</p>
          <GatsbyImage
            image={getImage(featured) as IGatsbyImageData}
            alt={title}
            className="rounded-lg shadow w-full h-auto max-w-[300px]"
          />
          <p className="text-gray-500 py-2">{excerpt}</p>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PostById($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        featured {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 1000, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
