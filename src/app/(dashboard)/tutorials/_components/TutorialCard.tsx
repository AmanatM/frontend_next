import { CircleIcon, EllipsisVertical, PlusIcon, StarIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function TutorialCard({ ...props }) {
  return (
    <Link href={`/tutorials/${props.slug}`}>
      <Card>
        <CardHeader className="grid grid-cols-[1fr_40px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle>{props.metadata.title}</CardTitle>
            <CardDescription>{props.metadata.summary}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-2 shadow-none  space-x-1 rounded-md text-secondary-foreground">
                <EllipsisVertical className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-5} className="w-[200px]" forceMount>
              <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Future Ideas</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" /> Create List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              CSS
            </div>
            <div className="flex items-center">
              <StarIcon className="mr-1 h-3 w-3" />
              20k
            </div>
            <div>{props.metadata.publishedAt}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TutorialCard
