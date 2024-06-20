"use client"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./custom/button"
import Link from "next/link"
import { side_nav_links } from "@/config/side_nav_links"
import { usePathname } from "next/navigation"
import { UrlObject } from "url"
import { User } from "@supabase/supabase-js"

interface SidebarProps {
  className?: string
  user: User | null
}

function Sidebar({ className, user }: SidebarProps) {
  const pathname = usePathname()
  const is_logged_in = user !== null

  return (
    <aside
      className={cn("sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 border-r pt-4 md:flex md:w-64", className)}
    >
      <div className="relative flex h-full w-full flex-col">
        {/* Navigation links */}
        <div className="overflow-auto border-b bg-background transition-[max-height,padding] duration-300 md:border-none">
          {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboard</h2> */}

          <nav className="grid gap-1 px-2">
            {side_nav_links.map((link, index) => {
              const isActive = (link.url as UrlObject).pathname === pathname

              return (
                <Link
                  key={index}
                  href={link.url}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "justify-start px-2",
                    isActive && "bg-muted hover:bg-muted",
                    link.private && !is_logged_in && "hidden",
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
