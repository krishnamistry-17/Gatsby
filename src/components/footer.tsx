import * as React from "react"

type FooterProps = {
  siteTitle?: string
}

export default function Footer({ siteTitle = "My Gatsby Site" }: FooterProps) {
  return (
    <footer style={{ borderTop: "1px solid #eee", marginTop: "1rem" }}>
      <p className="text-center text-sm text-gray-500 py-2">
        @ {new Date().getFullYear()}
        {siteTitle}. All rights reserved.
      </p>
    </footer>
  )
}
