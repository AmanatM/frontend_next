import { AlignHorizontalSpaceAround, WandSparkles } from 'lucide-react'
import { TypographyMuted } from '../../../../components/typography'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card'
import { Badge } from '../../../../components/ui/badge'
import { Tutorial } from '@/mockData/mock_tutorials'
import Link from 'next/link'

function TutorialCard({ description, title, interactive, id, tags }: Tutorial) {
  return (
    <Link href={`/tutorials/${id}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-xl overflow-hidden">
              <AlignHorizontalSpaceAround className="w-full h-full" />
            </div>
            <div className="grid gap-0.5">
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            {interactive && (
              <div className="flex items-center space-x-1">
                <WandSparkles className="w-4 h-4 text-muted-foreground" />
                <TypographyMuted>Interactive</TypographyMuted>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TutorialCard
