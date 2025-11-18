import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

type SeoProps = { title?: string; description?: string }

type SeoQuery = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

export default function Seo({ title, description }: SeoProps) {
  const data = useStaticQuery<SeoQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  const defaultTitle = data.site.siteMetadata.title
  const defaultDesc = data.site.siteMetadata.description
  const metaTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
  const metaDesc = description || defaultDesc

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
    </>
  )
}
