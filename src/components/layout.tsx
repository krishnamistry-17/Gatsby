import * as React from "react"
import "./layout.css"
import Header from "./header"

type LayoutProps = {
  children: React.ReactNode
  siteTitle?: string
}

export default function Layout({ children, siteTitle }: LayoutProps) {
  return (
    <>
      <Header siteTitle={siteTitle} />
      <main style={{ margin: "0 auto", padding: "1rem", maxWidth: 960 }}>
        {children}
      </main>
    </>
  )
}
