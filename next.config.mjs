import remarkGfm from "remark-gfm"
import createMDX from "@next/mdx"
import rehypeHighlight from "rehype-highlight"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Add image domain configuration
  images: {
    domains: ["dmoybqscixrzkyjnhtrj.supabase.co"], // Replace with your actual Supabase storage domain
  },
  // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig)
