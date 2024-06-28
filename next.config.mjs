import remarkGfm from "remark-gfm"
import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: ["dmoybqscixrzkyjnhtrj.supabase.co"],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
