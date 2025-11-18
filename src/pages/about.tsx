import * as React from "react"
import { Link, type HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function AboutPage() {
  return (
    <Layout>
      <h1>About</h1>
      <p>This page is a small demo built with Gatsby and TypeScript.</p>
      <p>
        <Link to="/">← Back to Home</Link>
      </p>
    </Layout>
  )
}

export const Head: HeadFC = () => (
  <Seo title="About" description="About this demo" />
)
