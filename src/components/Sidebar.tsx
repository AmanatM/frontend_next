'use client'
import { cn } from '@/lib/utils'
import { buttonVariants } from './custom/button'
import Link from 'next/link'
import { side_nav_links } from '@/config/side_nav_links'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  className?: string
}

function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  return (
    <aside
      className={cn('hidden md:flex shrink-0 md:w-64 pt-4 border-r  sticky top-14 h-[calc(100vh-3.5rem)]', className)}
    >
      <div className="relative flex h-full w-full flex-col">
        {/* Navigation links */}
        <div className="border-b md:border-none bg-background transition-[max-height,padding] duration-300 overflow-auto">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>

          <nav className="grid gap-1 px-2">
            {side_nav_links.map((link, index) => {
              const isActive = pathname === link.url

              return (
                <Link
                  key={index}
                  href={link.url}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'lg' }),
                    'justify-start px-2',
                    isActive && 'bg-muted hover:bg-muted',
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />

                  {link.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
