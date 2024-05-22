'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { User } from '@supabase/auth-js'
import { TypographyH4 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { FileWarning, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useSandpack } from '@codesandbox/sandpack-react'
import { useEffect } from 'react'
import { useGetSavedFiles } from '@/app/coding/_hooks/useGetSavedFiles'
import { useDeleteSavedFiles } from '@/app/coding/_hooks/useDeleteSavedFiles'

const SavedCode = ({ questionId, user }: { questionId: string; user: User | null }) => {
  const supabase = useSupabaseBrowser()
  const queryClient = useQueryClient()

  const { data: savedFiles, isSuccess } = useGetSavedFiles({ questionId, user })

  const { mutate: deleteSavedFiles } = useDeleteSavedFiles()

  useEffect(() => {
    if (isSuccess && savedFiles && savedFiles.length > 0) {
      toast.info('Saved code detected', {
        action: {
          label: 'Load Code',
          onClick: () => {
            if (!savedFiles) return

            savedFiles.map(file => {
              sandpack.sandpack.addFile(file.path || '', file.content || '')
            })
          },
        },
      })
    }
  }, [isSuccess])

  const handleDeleteFiles = () => {
    const idsToDelete = savedFiles?.map(file => file.file_id)
    deleteSavedFiles(
      { idsToDelete },
      {
        onSuccess: () => {
          toast.success('Code deleted successfully')
          queryClient.invalidateQueries({
            queryKey: ['savedCode', questionId, user?.id],
          })
        },
        onError: error => {
          toast.error('Error deleting code')
        },
      },
    )
  }

  const sandpack = useSandpack()
  const handleLoadCode = () => {
    if (!savedFiles) return

    savedFiles.map(file => {
      sandpack.sandpack.addFile(file.path || '', file.content || '')
    })

    toast.success('Code loaded successfully', {
      action: {
        label: 'Reset Code',
        onClick: () => sandpack.sandpack.resetAllFiles(),
      },
    })
  }

  if (!user)
    return (
      <div className="text-center space-y-5 flex flex-col self-center mx-auto w-full">
        <LogIn className="mx-auto" size={30} />
        <TypographyH4>Sign in to save code</TypographyH4>
      </div>
    )

  if (!savedFiles || savedFiles.length === 0) {
    return (
      <div className="text-center space-y-5 flex flex-col self-center mx-auto w-full">
        <FileWarning className="mx-auto" size={30} />
        <TypographyH4>No saved code</TypographyH4>
      </div>
    )
  }
  const last_updated = savedFiles[0].updated_at !== null ? savedFiles[0].updated_at : savedFiles[0].created_at
  return (
    <div className="size-full">
      <TypographyH4 className="mb-4">Saved Code</TypographyH4>

      <Card>
        <CardHeader>
          <CardTitle className="bold text-lg">Your saved code</CardTitle>
          <CardDescription>{new Date(last_updated).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-x-3">
          <Button variant={'default'} size={'sm'} onClick={handleLoadCode}>
            Load code
          </Button>
          <Button variant={'destructive'} size={'sm'} onClick={handleDeleteFiles}>
            Delete code
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SavedCode
