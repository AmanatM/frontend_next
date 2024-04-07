import { createClientServer } from '@/supabase-utils/supabase-server'

export default async function TutorialRoute({ params }: { params: { id: string } }) {
  const supabase = await createClientServer()

  const { data: tutorial } = await supabase.from('tutorials').select().single()

  return (
    <div>
      <h1>Tutorial {params.id}</h1>
      <h1>{tutorial?.title}</h1>
    </div>
  )
}
