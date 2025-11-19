import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import fs from "fs"
import path from "path"

type UpdateBody = {
  absolutePath?: string
  updates?: {
    title?: string
  }
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" })
    return
  }

  try {
    const body = (req.body || {}) as UpdateBody
    const absolutePath = body.absolutePath
    const newTitle = body.updates?.title

    if (!absolutePath || typeof absolutePath !== "string") {
      res.status(400).json({ error: "absolutePath is required" })
      return
    }

    if (!newTitle || typeof newTitle !== "string") {
      res.status(400).json({ error: "updates.title is required" })
      return
    }

    // Very basic safety checks: limit edits to project /posts directory and .mdx files
    if (
      !absolutePath.endsWith(".mdx") ||
      !absolutePath.includes(`${path.sep}posts${path.sep}`)
    ) {
      res.status(400).json({ error: "Editing this path is not allowed" })
      return
    }

    // Read file
    const original = await fs.promises.readFile(absolutePath, "utf8")

    // Find frontmatter block
    const fmStart = original.indexOf("---")
    if (fmStart !== 0) {
      res.status(400).json({ error: "Frontmatter not found" })
      return
    }
    const fmEnd = original.indexOf("\n---", 3)
    if (fmEnd === -1) {
      res.status(400).json({ error: "Frontmatter closing delimiter not found" })
      return
    }

    const fmBlock = original.slice(0, fmEnd + 4) // include closing '---\n'
    const content = original.slice(fmEnd + 4)

    // Update title in frontmatter block using a simple line-based transform
    const lines = fmBlock.split("\n")
    let found = false
    const updatedLines = lines.map((line, idx) => {
      if (idx === 0) return line // '---'
      if (line.trim().startsWith("---")) return line // closing
      if (line.trim().startsWith("title:")) {
        found = true
        return `title: "${newTitle}"`
      }
      return line
    })
    if (!found) {
      // insert before closing delimiter
      const insertIdx = updatedLines.findIndex(l => l.trim() === "---")
      updatedLines.splice(insertIdx, 0, `title: "${newTitle}"`)
    }

    const updated = `${updatedLines.join("\n")}${content}`
    await fs.promises.writeFile(absolutePath, updated, "utf8")

    res.status(200).json({ ok: true })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
