"use client"

import { Input } from "@/components/ui/input"
import { Search, XIcon } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import { frameworksFilterValues, questionTypeFilterValues } from "../_utils/filterData"
import { MultiSelect } from "./multi-select"
import { ToggleSelect } from "./toggle-select"
import { Button } from "@/components/ui/button"

const SearchFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sp = new URLSearchParams(searchParams)

  const type = sp.get("type") ?? ""
  const searchValue = sp.get("search") ?? ""

  const filtersActive = type.trim() !== "" || searchValue.trim() !== ""

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])

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

  const handleResetAllFilters = () => {
    sp.delete("search")
    sp.delete("type")
    sp.delete("framework")
    window.history.replaceState(null, "", `${pathname}?${sp.toString()}`)
  }
  return (
    <div className="space-y-3 flex flex-col">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row gap-x-3">
        <div className="md:w-[250px] md:min-w-[250px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8"
              onChange={e => handleSearch(e.target.value)}
              value={searchValue || ""}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="flex gap-x-4">
          <MultiSelect
            options={frameworksFilterValues}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Framework"
            searchBar={true}
            variant="inverted"
            maxCount={1}
          />

          <ToggleSelect
            options={questionTypeFilterValues}
            onValueChange={handleTypeFilter}
            defaultValue={type}
            placeholder="Type"
            variant="inverted"
            selectedValue=""
          />

          {filtersActive && (
            <Button className="h-9 " variant={"ghost"} onClick={handleResetAllFilters}>
              Reset
              <XIcon className="h-4 w-4 ml-2" />
            </Button>
          )}

          {/* <ToggleGroup
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
          </ToggleGroup> */}
        </div>
      </div>
    </div>
  )
}

export default SearchFilter
