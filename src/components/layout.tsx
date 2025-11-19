import * as React from "react"
import "./layout.css"
import Header from "./header"
import Footer from "./footer"

type LayoutProps = {
  children: React.ReactNode
  siteTitle?: string
}

export default function Layout({ children, siteTitle }: LayoutProps) {
  return (
    <>
      <Header siteTitle={siteTitle} />
      <main style={{ margin: "0 auto", padding: "1rem", maxWidth: 1260 }}>
        {children}
      </main>
      <Footer siteTitle={siteTitle || "My Gatsby Site"} />
    </>
  )
}
