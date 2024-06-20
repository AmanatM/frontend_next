import { LogoIcon } from "@/app/icons/logo-icons"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-muted p-6 md:py-12">
      <div className="container flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Link href="#" prefetch={false}>
            <LogoIcon />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium underline-offset-4 hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm font-medium underline-offset-4 hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm font-medium underline-offset-4 hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
