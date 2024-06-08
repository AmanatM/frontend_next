"use client"
import { TypographyMuted } from "@/components/typography"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SquareChevronRight, PanelTop, Search, List } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

const SearchFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sp = new URLSearchParams(searchParams)

  const type = sp.get("type") ?? "all"
  const searchValue = sp.get("search") ?? ""

  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      sp.delete("search")
    } else {
      sp.set("search", value)
    }
    window.history.replaceState(null, "", `${pathname}?${sp.toString()}`)
  }

  const handleTypeFilter = (value: string) => {
    if (value === "all" || value.trim() === "") {
      sp.delete("type")
    } else {
      sp.set("type", value)
    }
    window.history.replaceState(null, "", `${pathname}?${sp.toString()}`)
  }

  return (
    <div className="space-y-3 flex flex-col">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row space-x-3 ">
        <div className="grow bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8"
              onChange={e => handleSearch(e.target.value)}
              defaultValue={searchValue || ""}
              autoComplete="off"
            />
          </div>
        </div>
        <ToggleGroup
          value={type}
          type="single"
          variant="outline"
          defaultValue={type}
          onValueChange={value => handleTypeFilter(value)}
        >
          <ToggleGroupItem value="all" className="space-x-2">
            <List size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">All</TypographyMuted>
          </ToggleGroupItem>
          <ToggleGroupItem value="javascript" className="space-x-2">
            <SquareChevronRight size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">Coding</TypographyMuted>
          </ToggleGroupItem>
          <ToggleGroupItem value="user_interface" className="space-x-2">
            <PanelTop size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">User Interface</TypographyMuted>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

export default SearchFilter
