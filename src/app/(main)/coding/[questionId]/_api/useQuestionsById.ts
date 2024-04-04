import {  TypedSupabaseClient } from "@/supabase-utils/types";


export function getQuestionById (client: TypedSupabaseClient, questionId: string){
  return client
    .from('coding_questions')
    .select(
      ` *,
      coding_question_files(*)
    `,
    )
    .eq('id', questionId) // Use .eq for exact match instead of .match
    .throwOnError()
    .single()
}

// export function useQuestionsById(questionId: string) {
//   const client = useSupabaseBrowser()
//   const queryKey = ['questions', questionId]

//   const queryFn = async () => { 
//     const {data, error } =  await client.from('coding_questions')
    // .select(
    //   ` *,
    //   coding_question_files(*)
    // `,
    // )
    // .eq('id', questionId) // Use .eq for exact match instead of .match
    // .single()

//     if (error) throw new Error(error.message)
//     return {data, error }
//   }

//   return useQuery({queryKey, queryFn})
// }



// function useQuestionById(questionId: string) {
//   const client = useSupabaseBrowser()
//   const queryKey = ['questions', questionId]

//   const queryFn = async () => { 
//     const { data, error } = await client
//       .from<CodingQuestion>('coding_questions')
//       .select('*')
//       .eq('id', questionId)
//       .single()
//     if (error) throw new Error(error.message)
//     return data
//   }

// }

