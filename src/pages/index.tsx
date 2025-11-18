import * as React from "react"
import { Link, type HeadFC } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function IndexPage() {
  return (
    <Layout siteTitle="My Gatsby Site">
      <h1 className="text-2xl font-bold text-red-500">
        Hello from Gatsby + TypeScript
      </h1>
      <p>This is a minimal demo page using a typed Layout and Seo.</p>
      <p>
        <Link to="/about">Go to About →</Link>
      </p>
    </Layout>
  )
}

export const Head: HeadFC = () => (
  <Seo title="Home" description="Welcome to the demo Gatsby TypeScript site" />
)
