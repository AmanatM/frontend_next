'use client'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BookmarkPlus, EllipsisVertical, Link, Share } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function ActionButtons({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false)

  const handleBookmark = async () => {
    setOpen(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href + '/' + slug)
      toast.success('Copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy to clipboard.')
    }
    setOpen(false)
  }

  return (
    <DropdownMenu onOpenChange={e => setOpen(prev => !prev)} open={open}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2 shadow-none space-x-1 rounded-md text-secondary-foreground">
          <EllipsisVertical className="h-4 w-4 text-secondary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={-5} className="w-[200px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={e => {
            e.preventDefault()
            handleBookmark()
          }}
        >
          <BookmarkPlus className="mr-2 h-4 w-4" /> Bookmark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={e => {
            e.preventDefault()
            handleCopyLink()
          }}
        >
          <Link className="mr-2 h-4 w-4" /> Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionButtons
