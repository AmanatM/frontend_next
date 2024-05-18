import { notFound } from 'next/navigation'
import { formatDate, getBlogPosts } from '@/lib/tutorials'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function Blog({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find(post => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="px-4 md:px-6 lg:px-14 py-6">
      <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(post.metadata.publishedAt)}</p>
      </div>
      <article className={'prose dark:prose-invert prose-pre:p-0'}>
        <MDXRemote source={post.content} />
      </article>
    </section>
  )
}
