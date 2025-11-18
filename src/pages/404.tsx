import * as React from "react"
import { Link, type HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function NotFoundPage() {
  return (
    <Layout>
      <h1>Page not found</h1>
      <p>Sorry — we couldn’t find what you were looking for.</p>
      <p>
        <Link to="/">Go home</Link>
      </p>
    </Layout>
  )
}

export const Head: HeadFC = () => <Seo title="404: Not found" />
