import { readdir } from "fs/promises"

export const categories = ["CSS"] as const
export type Category = (typeof categories)[number]

export interface TutorialsType {
  slug: string
  title: string
  publishDate: string
  categories: Category[]
  interactive: boolean
  shortDescription: string
}

export const postsPerPage = 3 as const

export async function getPosts(): Promise<TutorialsType[]> {
  // Retreive slugs from post routes
  const slugs = (await readdir(process.cwd() + "/src/app/tutorials", { withFileTypes: true })).filter(dirent =>
    dirent.isDirectory(),
  )
  console.log(process.cwd())
  console.log("sdfjsldkfjlsd")

  // Retreive metadata from MDX files
  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`./app/tutorials/${name}/page.mdx`)
      return { slug: name, ...metadata }
    }),
  )

  // Sort posts from newest to oldest
  posts.sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate))

  return posts
}

export async function getPostsByCategory({ category }: { category: Category }): Promise<TutorialsType[]> {
  const allPosts = await getPosts()

  // Filter posts by specified category
  const posts = allPosts.filter(post => post.categories.indexOf(category) !== -1)

  return posts
}

export async function getPaginatedPosts({
  page,
  limit,
}: {
  page: number
  limit: number
}): Promise<{ posts: TutorialsType[]; total: number }> {
  const allPosts = await getPosts()

  // Get a subset of posts pased on page and limit
  const paginatedPosts = allPosts.slice((page - 1) * limit, page * limit)

  return {
    posts: paginatedPosts,
    total: allPosts.length,
  }
}

export async function getPaginatedPostsByCategory({
  page,
  limit,
  category,
}: {
  page: number
  limit: number
  category: Category
}): Promise<{ posts: TutorialsType[]; total: number }> {
  const allCategoryPosts = await getPostsByCategory({ category })

  // Get a subset of posts pased on page and limit
  const paginatedCategoryPosts = allCategoryPosts.slice((page - 1) * limit, page * limit)

  return {
    posts: paginatedCategoryPosts,
    total: allCategoryPosts.length,
  }
}
