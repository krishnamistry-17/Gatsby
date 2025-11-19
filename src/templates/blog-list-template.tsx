// src/templates/blog-list-template.tsx pagnation template
import * as React from "react"
import { HeadFC, Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { useSiteMetadata } from "hooks/useSiteMetadata"
import Seo from "components/seo"

// export const Head: HeadFC = () => {
//   const { title, description } = useSiteMetadata()
//   return <Seo title={`${title} Blog`} description={description} />
// }

interface Post {
  id: string
  title: string
  excerpt: string
  absolutePath: string
  frontmatter: {
    slug: string
    title: string
    date: string
    featured: {
      childImageSharp: {
        gatsbyImageData: {
          width: number
          height: number
        }
      }
      publicURL: string
    }
  }
}

const BlogListTemplate: React.FC<{ data: any; pageContext: any }> = ({
  data,
  pageContext,
}) => {
  const posts = data.allMdx.nodes

  const { currentPage, numberOfPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const prevPage = currentPage - 1 > 1 ? `/blog/${currentPage - 1}` : "/blog/"
  const nextPage = `/blog/${currentPage + 1}`

  const initialPosts: Post[] = posts.map((post: any) => ({
    id: post.id,
    title: post.frontmatter.title,
    excerpt: post.excerpt,
    absolutePath: (post.parent && post.parent.absolutePath) || "",
    frontmatter: post.frontmatter,
  }))

  const [postsState, setPostsState] = React.useState<Post[]>(initialPosts)

  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [newTitle, setNewTitle] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)

  const handleEdit = (id: string) => {
    console.log("id", id)
    const postsFind = postsState.find(p => p.id === id)
    console.log("postsFind", postsFind)
    if (postsFind) {
      setEditingId(id)
      setNewTitle(postsFind.title)
    }
  }

  const handleSave = async () => {
    if (!editingId) return
    const postToUpdate = postsState.find(p => p.id === editingId)
    if (!postToUpdate) return
    try {
      setIsSaving(true)
      await fetch("/api/update-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          absolutePath: postToUpdate.absolutePath,
          updates: { title: newTitle },
        }),
      })
      setPostsState(prev =>
        prev.map(p =>
          p.id === editingId
            ? {
                ...p,
                title: newTitle,
                frontmatter: { ...p.frontmatter, title: newTitle },
              }
            : p
        )
      )
    } catch (e) {
      console.error("Failed to save", e)
      alert("Failed to save changes")
    } finally {
      setIsSaving(false)
      setEditingId(null)
      setNewTitle("")
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setNewTitle("")
  }
  const handleDelete = async (id: string) => {
    const postToDelte = postsState.find(p => p.id === id)
    if (!postToDelte) return
    setPostsState(prev => prev.filter(p => p.id !== id))
  }

  return (
    <Layout siteTitle="My Gatsby Site">
      <h1 className="text-3xl font-bold py-4">Blog</h1>

      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
        {postsState.map((post: any) => {
          console.log("post", post)
          const image = getImage(post.frontmatter.featured)
          return (
            <div
              key={post.frontmatter.slug}
              className=" flex flex-col justify-between p-4 border rounded-sm border-gray-200 shadow-xs min-h-[300px]"
            >
              <Link to={`/blog/${post.frontmatter.slug}`} className="my-2">
                {image ? (
                  <GatsbyImage
                    image={image}
                    alt={post.title}
                    className="rounded-lg shadow"
                  />
                ) : post.frontmatter.featured?.publicURL ? (
                  <img
                    src={post.frontmatter.featured.publicURL}
                    alt={post.title}
                    className="rounded-lg shadow w-full h-auto"
                  />
                ) : null}
              </Link>

              {editingId === post.id ? (
                <div className="my-2 flex items-center gap-2 w-full ">
                  <input
                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-0"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                  />
                </div>
              ) : (
                <h2 className="text-xl font-semibold mt-2">
                  <Link to={`/blog/${post.frontmatter.slug}`}>
                    {post.title}
                  </Link>
                </h2>
              )}
              <p className="text-gray-500">{post.frontmatter.date}</p>
              {post.excerpt ? (
                <p className="my-2 text-gray-700">{post.excerpt}</p>
              ) : null}
              <div className="sm:flex mt-auto justify-between gap-2 self-start">
                <Link
                  to={`/blog/${post.frontmatter.slug}`}
                  className="border border-gray-200 rounded-md px-4 py-2"
                >
                  Read more →
                </Link>
                {editingId === post.id ? (
                  <div className="sm:flex gap-2">
                    <button
                      className="border border-gray-200 rounded-md px-4 py-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="border border-gray-200 rounded-md px-4 py-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="border border-gray-200 rounded-md px-4 py-2"
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="border border-gray-200 rounded-md px-4 py-2"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 mt-10">
        {!isFirst && (
          <Link to={prevPage} className="px-4 py-2 bg-gray-200 rounded">
            ← Previous
          </Link>
        )}

        {!isLast && (
          <Link to={nextPage} className="px-4 py-2 bg-gray-200 rounded">
            Next →
          </Link>
        )}
      </div>
    </Layout>
  )
}

export default BlogListTemplate

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMdx(sort: { frontmatter: { date: ASC } }, limit: $limit, skip: $skip) {
      nodes {
        id
        parent {
          ... on File {
            absolutePath
          }
        }
        excerpt(pruneLength: 160)
        frontmatter {
          title
          slug
          date(formatString: "MMM DD, YYYY")
          featured {
            childImageSharp {
              gatsbyImageData(
                width: 400
                height: 250
                placeholder: DOMINANT_COLOR
              )
            }
            publicURL
          }
        }
      }
    }
  }
`
