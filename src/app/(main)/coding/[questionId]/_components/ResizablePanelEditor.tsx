'use client'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import { Editor } from '@monaco-editor/react'
import { useTheme } from 'next-themes'

import { QuestionFile } from '@/supabase-utils/types'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TypographySmall } from '@/components/typography'
import { cn } from '@/lib/utils'
import { Ellipsis, Hash, Maximize, Minimize, PanelLeftClose, RotateCcw } from 'lucide-react'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ResizablePanel } from '@/components/ui/resizable'
import { useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint'

type EditorCardProps = {
  files: QuestionFile[] | undefined
  currentFile: string | null
  setCurrentFile: (value: string) => void
  updateFileContent: (value: string) => void
  minSize?: number
  defaultSize?: number
}

export function ResizablePanelEditor({
  files,
  currentFile,
  setCurrentFile,
  updateFileContent,
  minSize,
  defaultSize,
}: EditorCardProps) {
  const { theme } = useTheme()
  const { isMobileBreakpoint } = useTailwindBreakpoint()

  const [isFullScreen, setIsFullScreen] = useState(false)

  return (
    <ResizablePanel
      minSize={minSize}
      defaultSize={defaultSize}
      className={cn(
        'inset-0',
        isMobileBreakpoint ? '!overflow-visible !flex-none' : '',
        isFullScreen ? 'absolute z-20 ' : '',
      )}
    >
      <Card className="h-full overflow-clip relative flex flex-col">
        <div className="h-12 flex items-center justify-between py-0 px-2 ">
          <ScrollArea className="whitespace-nowrap">
            {files?.map(file => (
              <Button
                variant={'ghost'}
                key={file.id}
                className={cn('space-x-2 hover:bg-inherit', currentFile !== file.name && 'text-muted-foreground')}
                onClick={() => setCurrentFile(file.name)}
              >
                <Hash size={15} />
                <TypographySmall className="font-normal">{file.name}</TypographySmall>
              </Button>
            ))}
            <ScrollBar orientation="horizontal" className="h-1.5" />
          </ScrollArea>

          <div className="flex flex-none space-x-1">
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <RotateCcw size={17} />
              </Button>
            </AlertDialogTrigger>
            <DropdownMenu>
              {!isFullScreen ? (
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Ellipsis size={17} />
                  </Button>
                </DropdownMenuTrigger>
              ) : (
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsFullScreen(false)}>
                  <Minimize size={17} />
                </Button>
              )}
              <DropdownMenuContent align="end" forceMount>
                <DropdownMenuItem className="space-x-2" onClick={() => setIsFullScreen(true)}>
                  <Maximize size={17} />
                  <div>Full Screen</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="space-x-2">
                  <PanelLeftClose size={17} />
                  <div>Collapse</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="h-full">
          <Editor
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            options={{
              minimap: { enabled: false },
              fontFamily: 'Menlo, Monaco, "Courier New", monospace',
              scrollBeyondLastLine: true,
              fixedOverflowWidgets: true,
              tabSize: 2,
            }}
            language={files?.find(file => file.name === currentFile)?.language || ''}
            value={files?.find(file => file.name === currentFile)?.content || ''}
            path={files?.find(file => file.name === currentFile)?.name || ''}
            onChange={(value: string | undefined) => updateFileContent(value || '')}
          />
        </div>
      </Card>
    </ResizablePanel>
  )
}
