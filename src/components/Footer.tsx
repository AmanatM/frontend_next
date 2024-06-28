import Link from "next/link"
import { LogoIcon } from "@/icons/logo-icons"
import { top_menu_links } from "@/config/top_bar_links"
import { ThemeSwitcherSlider } from "./Header/theme-switch"

export async function Footer() {
  return (
    <footer className="border-t border-border py-16 text-muted-foreground">
      <div className="container mx-auto grid grid-cols-2 grid-rows-[auto_auto_auto] place-items-start items-center gap-y-7 px-6 sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-2 sm:gap-x-3 sm:gap-y-16">
        <Link aria-label="Homepage" href="/">
          <LogoIcon />
        </Link>
        <nav className="col-start-1 row-start-2 flex flex-col gap-x-2 gap-y-3 self-center sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:flex-row sm:items-center sm:place-self-center md:gap-x-4 lg:gap-x-8">
          {top_menu_links.map(({ title, url }) => (
            <Link
              key={title}
              className="dark:text-dark-text-secondary dark:hover:text-dark-text-primary px-2 font-light tracking-tight"
              href={url ?? "#"}
            >
              {title}
            </Link>
          ))}
        </nav>
        <div className="col-start-2 row-start-1 flex items-center gap-3 self-center justify-self-end sm:col-span-1 sm:col-start-3 sm:row-start-1">
          <p className="hidden sm:block">Appearance</p>

          <ThemeSwitcherSlider />
        </div>

        <p className="col-span-2 text-pretty text-sm sm:col-span-1">WebCodersLab © 2024 . All rights reserved.</p>
      </div>
    </footer>
  )
}
