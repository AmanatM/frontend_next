'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'

const SavedCode = ({ questionId }: { questionId: string }) => {
  const supabase = useSupabaseBrowser()

  const {
    data: savedFiles,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['savedCode', questionId],
    queryFn: async () => {
      const data = await supabase
        .from('user_saved_coding_question_files')
        .select(`*, coding_question_files!inner(*)`)
        .eq('coding_question_files.question_id', questionId)
      return data
    },
  })
  if (isPending) return 'Loading...'
  if (isError) return 'Error'

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Saved Code</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SavedCode
