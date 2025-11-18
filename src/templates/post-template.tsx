// src/templates/post-template.tsx
import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function PostTemplate({ data, children }: any) {
  const { title, date, featured } = data.mdx.frontmatter
  return (
    <Layout siteTitle="My Gatsby Site">
      <article>
        <h1>{title}</h1>
        <p>{date}</p>
        {featured?.publicURL ? (
          <img
            src={featured.publicURL}
            alt={title}
            style={{ maxWidth: "100%" }}
          />
        ) : null}
        <div>{children}</div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PostById($id: String!) {
    mdx(id: { eq: $id }) {
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
