'use client'
import { Button } from '@/components/custom/button'
import { TypographyH4 } from '@/components/typography'
import { QuestionFile, SavedCodingQuestionFiles } from '@/supabase-utils/types'
import { useSandpack } from '@codesandbox/sandpack-react'
import React from 'react'
import { toast } from 'sonner'

function SolutionTab({
  originalFiles,
  setIsSolution,
}: {
  originalFiles: QuestionFile[]
  setIsSolution: (value: boolean) => void
}) {
  const sandpack = useSandpack()

  const handleShowSolution = () => {
    if (!originalFiles) return

    originalFiles.map(file => {
      if (file.solution_code === null) return

      sandpack.sandpack.addFile(file.path || '', file.solution_code || '')
    })
    setIsSolution(true)
  }

  return (
    <div className="flex justify-between">
      <TypographyH4>Solution</TypographyH4>
      <Button variant={'secondary'} size={'sm'} onClick={handleShowSolution}>
        Show Solution
      </Button>
    </div>
  )
}

export default SolutionTab
