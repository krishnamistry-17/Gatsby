import { graphql, useStaticQuery } from "gatsby"

type SeoPops = {
  title?: string
  description?: string
}

type SeoQuery = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

export const useSiteMetadata = (): SeoPops => {
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
  return data.site.siteMetadata
}
