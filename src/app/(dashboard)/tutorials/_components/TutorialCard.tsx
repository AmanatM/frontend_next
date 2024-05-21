import { CircleIcon } from 'lucide-react'

import Link from 'next/link'
import ActionButtons from './ActionButtons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TypographyH3, TypographyH4, TypographyP } from '@/components/typography'

function TutorialCard({ ...props }) {
  return (
    <Link href={`/tutorials/${props.slug}`}>
      <Card>
        <CardHeader className="grid grid-cols-[1fr_40px] items-start gap-4 space-y-0">
          <div className="space-y-3">
            <CardTitle>
              <TypographyP>{props.metadata.title}</TypographyP>
            </CardTitle>
            <CardDescription>{props.metadata.summary}</CardDescription>
          </div>
          <ActionButtons slug={props.slug} />
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              CSS
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TutorialCard
