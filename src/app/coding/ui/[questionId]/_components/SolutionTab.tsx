'use client'
import { Button } from '@/components/custom/button'
import { TypographyH4 } from '@/components/typography'
import { QuestionFile_UI, SavedCodingQuestionFiles } from '@/supabase-utils/types'
import { useSandpack } from '@codesandbox/sandpack-react'
import React from 'react'
import { toast } from 'sonner'

function SolutionTab({
  originalFiles,
  setIsSolution,
  isSolution,
}: {
  originalFiles: QuestionFile_UI[]
  setIsSolution: React.Dispatch<React.SetStateAction<boolean>>
  isSolution: boolean
}) {
  const { sandpack } = useSandpack()

  const toggleSolution = () => {
    if (!originalFiles) return

    sandpack.resetAllFiles()

    originalFiles.map(file => {
      if (file.solution_code === null) return

      sandpack.addFile(file.path, file.solution_code)
    })
    setIsSolution(prev => !prev)
  }

  return (
    <div className="flex justify-between">
      <TypographyH4>Solution</TypographyH4>
      <Button variant={'secondary'} size={'sm'} onClick={toggleSolution}>
        {isSolution ? 'Reset Code' : 'Show Solution'}
      </Button>
    </div>
  )
}

export default SolutionTab
