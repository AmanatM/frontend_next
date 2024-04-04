'use client'
import { Menu, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserNav } from './UserNav'
import { useState } from 'react'
import { Button, buttonVariants } from './custom/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Link from 'next/link'
import { top_menu_links } from '@/config/top_bar_links'
import { side_nav_links } from '@/config/side_nav_links'
import { ThemeSwitch } from './theme-switch'
import { SearchBox } from './SearchBox'

export function MenuTopBar() {
  const [navOpened, setNavOpened] = useState(false)

  const toggleNav = () => {
    setNavOpened(prev => !prev)
  }

  return (
    <header className="h-14 fixed z-50 top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <UserNav />

          {/* Mobile menu */}
          <Sheet open={navOpened} onOpenChange={toggleNav}>
            <SheetTrigger asChild>
              <Button size={'icon'} className="rounded-full md:hidden" variant="ghost">
                <Menu size={25} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-row flex-wrap pt-4 space-y-2">
                {side_nav_links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    onClick={toggleNav}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'w-full justify-start px-2')}
                  >
                    <link.icon className="mr-2 h-5 w-5" />

                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
