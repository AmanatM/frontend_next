import { FlaskConical, Terminal } from "lucide-react"
import { UserNav } from "./UserNav"
import Link from "next/link"
import { top_menu_links } from "@/config/top_bar_links"
import { ThemeSwitch } from "./theme-switch"
import { SearchBox } from "./SearchBox"
import { MobileMenu } from "./mobile-menu"
import { createClientServer } from "@/supabase-utils/supabase-server"
import { LogoIcon } from "@/app/icons/logo-icons"

export async function MenuTopBar() {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  const logoLink = user ? "/dashboard" : "/"

  return (
    <header className="h-14 sticky z-50 top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-3 md:px-8 flex h-full items-center">
        <div className="mr-0 md:mr-4 flex text-sm">
          <Link href={logoLink} className="mr-10 flex items-center space-x-4">
            <LogoIcon size={35} />
            <span className="font-bold text-base md:text-lg inline-block">WebCodersLab</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {top_menu_links.map((link, index) => (
              <Link key={index} href={link.url} className="transition-colors hover:text-foreground/60">
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-3 md:space-x-4">
          <SearchBox user={user} />
          <ThemeSwitch />
          <UserNav user={user} />
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  )
}
