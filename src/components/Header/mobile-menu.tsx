"use client"
import { side_nav_links } from "@/config/side_nav_links"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button, buttonVariants } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useState } from "react"
import Link from "next/link"
import { User } from "@supabase/supabase-js"
import { usePathname } from "next/navigation"
import { logout } from "@/app/(auth)/actions"
import { toast } from "sonner"

export function MobileMenu({ user }: { user: User | null }) {
  const [navOpened, setNavOpened] = useState(false)
  const pathname = usePathname()

  const toggleNav = () => {
    setNavOpened(prev => !prev)
  }

  const handleLogout = async () => {
    setNavOpened(false)
    toast.promise(logout(), {
      loading: "Logging out...",
      success: data => {
        return `Signed out successfully`
      },
      error: "Something went wrong",
    })
  }

  return (
    <Sheet open={navOpened} onOpenChange={toggleNav}>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full md:hidden"
          variant="ghost"
          aria-controls="main-menu"
          aria-expanded={navOpened}
          aria-label="Toggle main menu"
        >
          <Menu size={25} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between" id="main-menu">
        <div className="flex flex-row flex-wrap pt-4 space-y-2">
          {side_nav_links.map((link, index) => (
            <Link
              key={index}
              href={link.url} // Convert UrlObject to string
              onClick={toggleNav}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "w-full justify-start px-2",
                link.private && !user && "hidden",
              )}
            >
              <link.icon className="mr-2 h-5 w-5" />

              {link.title}
            </Link>
          ))}
        </div>
        {!user ? (
          <Button asChild variant="default" className={"flex md:hidden"} onClick={() => setNavOpened(false)}>
            <Link href={`/login?redirectTo=${pathname}`}>Sign in / up</Link>
          </Button>
        ) : (
          <Button variant="default" className={"flex md:hidden"} onClick={handleLogout}>
            Logout
          </Button>
        )}
      </SheetContent>
    </Sheet>
  )
}
