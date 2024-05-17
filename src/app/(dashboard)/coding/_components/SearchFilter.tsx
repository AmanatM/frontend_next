'use client'
import { TypographyMuted } from '@/components/typography'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { SquareChevronRight, PanelTop, Search, List } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

const SearchFilter = () => {
  const router = useRouter()
  const params = useSearchParams()
  const type = params.get('type')

  const typeFilter = useMemo(() => {
    if (type) {
      return type
    }
    return 'all'
  }, [type])

  const setFilter = (type: string) => {
    if (type) {
      router.push(`?type=${type}`)
    }

    if (!type) {
      router.push('/coding')
    }
  }

  return (
    <div className="space-y-3 flex flex-col">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row space-x-3 ">
        <div className="grow bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </div>
        <ToggleGroup value={typeFilter} type="single" variant="outline" defaultValue={typeFilter}>
          <ToggleGroupItem onClick={() => setFilter('')} value="all" className="space-x-2">
            <List size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">All</TypographyMuted>
          </ToggleGroupItem>
          <ToggleGroupItem onClick={() => setFilter('javascript')} value="javascript" className="space-x-2">
            <SquareChevronRight size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">Coding</TypographyMuted>
          </ToggleGroupItem>
          <ToggleGroupItem onClick={() => setFilter('user_interface')} value="user_interface" className="space-x-2">
            <PanelTop size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">User Interface</TypographyMuted>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

export default SearchFilter
