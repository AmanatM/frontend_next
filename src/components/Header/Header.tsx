import { Terminal } from 'lucide-react'
import { UserNav } from './UserNav'
import Link from 'next/link'
import { top_menu_links } from '@/config/top_bar_links'
import { ThemeSwitch } from './theme-switch'
import { SearchBox } from './SearchBox'
import { MobileMenu } from './mobile-menu'
import { createClientServer } from '@/supabase-utils/supabase-server'

export async function MenuTopBar() {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  return (
    <header className="h-14 sticky z-50 top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-8 flex h-full max-w-screen-2xl items-center">
        <div className="mr-4 flex text-sm">
          <Link href="/" className="mr-10 flex items-center space-x-2">
            <Terminal className="h-6 w-6" />
            <span className="font-bold text-lg inline-block">Front</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {top_menu_links.map((link, index) => (
              <Link key={index} href={link.url} className="transition-colors hover:text-foreground/60">
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <SearchBox />
          <ThemeSwitch />
          <UserNav user={user} />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
