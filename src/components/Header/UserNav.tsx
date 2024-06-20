"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, HomeIcon, UserRound } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { logout } from "@/app/(auth)/actions"
import { User } from "@supabase/supabase-js"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TypographyMuted } from "../typography"

export function UserNav({ user }: { user: User | null }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: data => {
        return `Signed out successfully`
      },
      error: "Something went wrong",
    })
  }

  // const redirectToLogin = () => {
  //   router.push(`/login?redirectTo=${pathname}`)
  // }

  if (!user)
    return (
      <Button asChild variant="ghost" className={"hidden md:flex"}>
        <Link href={`/login?redirectTo=${pathname}`}>Sign in / up</Link>
      </Button>
    )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"} className="relative rounded-full" aria-label="Profile">
          <Avatar className="h-9 w-9">
            <AvatarImage alt="Avatar" />
            <AvatarFallback>
              <UserRound className="text-muted-foreground" size={18} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <TypographyMuted className="text-sm font-light leading-none">{user.email}</TypographyMuted>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/profile">Appearance</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={"/"}>
              Home page
              <Home className="ml-auto opacity-60" size={16} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
