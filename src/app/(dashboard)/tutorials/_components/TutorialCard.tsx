import { CircleIcon, WandSparkles } from "lucide-react"

import Link from "next/link"
import ActionButtons from "./ActionButtons"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TypographyH3, TypographyH4, TypographyP, TypographySmall } from "@/components/typography"
import { TutorialsType } from "@/tutorials"
import { Badge } from "@/components/ui/badge"

function TutorialCard({ ...props }: TutorialsType) {
  console.log(props)
  return (
    <Card className=" hover:bg-muted">
      <Link href={`/tutorials/${props.slug}`} className="h-full flex flex-col">
        <CardHeader className="pb-0">
          <div className="space-y-3">
            <CardTitle className="flex items-center">
              <TypographyP>{props.title}</TypographyP>
            </CardTitle>
          </div>
          {/* <ActionButtons slug={props.slug} /> */}
        </CardHeader>
        <CardContent className="py-4">
          <CardDescription>{props.shortDescription}</CardDescription>
        </CardContent>
        <CardFooter className="mt-auto pt-0 flex justify-between">
          <div className="flex space-x-4 text-sm text-muted-foreground">
            {props.categories.map(category => (
              <div className="flex items-center" key={category}>
                <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                {category}
              </div>
            ))}
          </div>
          {props.interactive && (
            <Badge variant={"outline"} className="flex gap-x-2 text-muted-foreground">
              <TypographySmall className="font-normal">Interactive</TypographySmall>
              <WandSparkles size={16} />
            </Badge>
          )}
        </CardFooter>
      </Link>
    </Card>
  )
}

export default TutorialCard
