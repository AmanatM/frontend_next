'use client'
import { Button } from '@/components/custom/button'
import { ResizablePanelGroup } from '@/components/ui/resizable'
import {
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Lightbulb,
  PanelTop,
  RotateCcw,
  SquareChevronRight,
} from 'lucide-react'

import { useEffect, useState } from 'react'
import { TypographyH4, TypographyP } from '@/components/typography'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useHotkeys } from 'react-hotkeys-hook'
import { TabsContent } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint'
import { cn } from '@/lib/utils'
import { ResizablePanelTabs } from './_components/ResizablePanelTabs'
import { ResizeHandle } from './_components/ResizableHandleCustom'
import { BottomToolbar } from './_components/BottomToolBar'
import { ResizablePanelEditor } from './_components/ResizablePanelEditor'
import { MarkdownRenderer } from './_components/markdown'

import { getQuestionById } from './_api/useQuestionsById'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { QuestionFile } from '@/supabase-utils/types'

const descriptionTabs = [
  {
    value: 'description',
    label: 'Description',
    icon: <FileText size={15} />,
  },
  {
    value: 'solution',
    label: 'Solution',
    icon: <Lightbulb size={15} />,
  },
  {
    value: 'saved_code',
    label: 'Saved Code',
    icon: <Database size={14} />,
  },
]
const browserTabs = [
  {
    value: 'browser',
    label: 'Browser',
    icon: <PanelTop size={15} />,
  },
  {
    value: 'console',
    label: 'Console',
    icon: <SquareChevronRight size={15} />,
  },
]

export default function CodingQuestion({ params }: { params: { questionId: string } }) {
  const { toast } = useToast()
  const supabase = useSupabaseBrowser()
  const { isMobileBreakpoint } = useTailwindBreakpoint()

  const { data: coding_question, isLoading, isError } = useQuery(getQuestionById(supabase, params.questionId))

  const [files, setFiles] = useState<QuestionFile[]>([])
  const [currentFile, setCurrentFile] = useState<string | null>(null)

  const [iframeContent, setIframeContent] = useState('')
  const [iframeKey, setIframeKey] = useState(0) // Key to force iframe rerender

  useEffect(() => {
    if (coding_question && coding_question.coding_question_files) {
      setFiles(coding_question.coding_question_files)
      // Optionally, set the current file to the first file if it exists
      setCurrentFile(coding_question.coding_question_files[0]?.name || null)
    }
  }, [coding_question])

  const updateFileContent = (newValue: string) => {
    setFiles(prevFiles => {
      return prevFiles?.map(file => {
        if (file.name === currentFile) {
          return { ...file, content: newValue }
        }
        return file
      })
    })
  }

  const handleSaveCode = () => {
    // Assuming each file in `files` has an `id` property
    // const currentFileObject = files?.find(file => file.name === currentFile)
    // if (currentFileObject && currentFileObject.id) {
    //   updateCodeFileMutation(
    //     {
    //       codeFileId: currentFileObject.id,
    //       updatedCodeFile: currentFileObject.content,
    //     },
    //     {
    //       onSuccess: () => {
    //         toast({
    //           title: 'Saved to the cloud!',
    //         })
    //       },
    //       onError: error => {
    //         toast({
    //           title: 'Error saving file',
    //           description: error.message,
    //           variant: 'destructive',
    //         })
    //       },
    //     },
    //   )
    // }
  }

  useEffect(() => {
    const html = files?.find(file => file.name === 'index.html')?.content || ''
    const css = files?.find(file => file.name === 'style.css')?.content || ''
    const js = files?.find(file => file.name === 'script.js')?.content || ''

    const combinedContent = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `
    setIframeContent(combinedContent)
  }, [files])

  const handleBrowserReload = () => {
    // Trigger iframe rerender
    setIframeKey(prevKey => prevKey + 1)
  }

  // Save code shortcut(cmd+s)
  useHotkeys(
    'meta+s',
    event => {
      event.preventDefault()
      // handleSaveCode()
    },
    { enableOnFormTags: true },
  )

  function handleResetCode() {
    setFiles(coding_question?.coding_question_files || [])
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !coding_question) {
    return <div>Error</div>
  }

  return (
    <main
      id="content"
      className={cn('flex size-full pt-3 px-3 overflow-scroll', isMobileBreakpoint ? 'flex-row' : 'flex-col')}
    >
      <AlertDialog>
        <ResizablePanelGroup direction={isMobileBreakpoint ? 'vertical' : 'horizontal'} className="relative">
          {/* Description */}
          <ResizablePanelTabs defaultSize={30} minSize={15} defaultValue="description" tabs={descriptionTabs}>
            <TabsContent value="description" className="p-4 space-y-4 justify-center">
              <TypographyH4>{coding_question.title}</TypographyH4>
              <article className={'prose dark:prose-invert prose-pre:p-0'}>
                <MarkdownRenderer>{coding_question.description}</MarkdownRenderer>
              </article>
            </TabsContent>
            <TabsContent value="solution" className="p-4">
              <TypographyH4>Solution</TypographyH4>
              <TypographyP>{coding_question.solution}</TypographyP>
            </TabsContent>
            <TabsContent value="saved_code" className="p-4">
              <TypographyH4>Saved Code</TypographyH4>
            </TabsContent>
          </ResizablePanelTabs>

          <ResizeHandle />

          {/* Editor */}

          <ResizablePanelEditor
            files={files}
            currentFile={currentFile || ''}
            setCurrentFile={setCurrentFile}
            updateFileContent={updateFileContent}
            minSize={15}
            defaultSize={40}
          />
          <ResizeHandle />

          {/* Browser */}

          <ResizablePanelTabs defaultSize={30} minSize={15} defaultValue="browser" tabs={browserTabs}>
            <TabsContent value="browser" className="size-full flex flex-col mt-0">
              <div className="flex shrink items-center  bg-secondary px-2">
                <Button variant={'ghost'} size={'icon'} disabled>
                  <ChevronLeft size={15} />
                </Button>
                <Button variant={'ghost'} size={'icon'}>
                  <ChevronRight size={15} />
                </Button>
                <Button variant={'ghost'} size={'icon'} onClick={handleBrowserReload}>
                  <RotateCcw size={14} />
                </Button>
                <Input
                  type="text"
                  placeholder=""
                  value={'index.html'}
                  disabled
                  className="h-6 rounded-full border-border"
                />
              </div>
              <iframe
                className="flex grow bg-white"
                key={iframeKey}
                srcDoc={iframeContent}
                title="Preview"
                sandbox="allow-scripts"
              ></iframe>
            </TabsContent>
            <TabsContent value="console">
              <TypographyH4>Console</TypographyH4>
            </TabsContent>
          </ResizablePanelTabs>
        </ResizablePanelGroup>

        <BottomToolbar handleSaveCode={handleSaveCode} />

        {/* Reset code alert dialog */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset code?</AlertDialogTitle>
            <AlertDialogDescription>Existing code will be replaced with the initial code.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetCode}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
