import * as React from "react"
import { Link } from "gatsby"

type HeaderProps = {
  siteTitle?: string
}

export default function Header({ siteTitle = "My Gatsby Site" }: HeaderProps) {
  return (
    <header style={{ borderBottom: "1px solid #eee", marginBottom: "1rem" }}>
      <div
        style={{
          margin: "0 auto",
          maxWidth: 960,
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <strong>{siteTitle}</strong>
        </Link>
        <nav style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
