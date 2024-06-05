import { CircleIcon, WandSparkles } from "lucide-react"

import Link from "next/link"
import ActionButtons from "./ActionButtons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TypographyH3, TypographyH4, TypographyP, TypographySmall } from "@/components/typography"
import { TutorialsType } from "@/tutorials"
import { Badge } from "@/components/ui/badge"

function TutorialCard({ ...props }: TutorialsType) {
  console.log(props)
  return (
    <Link href={`/tutorials/${props.slug}`}>
      <Card>
        <CardHeader className="grid grid-cols-[1fr_40px] items-start gap-4 space-y-0">
          <div className="space-y-3">
            <CardTitle className="flex items-center">
              <TypographyP>{props.title}</TypographyP>
              {props.interactive && (
                <Badge className="flex gap-x-2 ml-auto">
                  <TypographySmall>Interactive</TypographySmall>
                  <WandSparkles size={16} />
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{props.shortDescription}</CardDescription>
          </div>
          <ActionButtons slug={props.slug} />
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            {props.categories.map(category => (
              <div className="flex items-center" key={category}>
                <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                {category}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TutorialCard
