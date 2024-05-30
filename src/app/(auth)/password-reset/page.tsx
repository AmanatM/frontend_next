'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/custom/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { toast } from 'sonner'
import { AuthError } from '@supabase/supabase-js'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { Mail } from 'lucide-react'
import { PasswordInput } from '@/components/custom/password-input'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'Please enter your password' })
    .min(7, { message: 'Password must be at least 7 characters long' }),
})

export default function PasswordReset() {
  const [isPending, startTransition] = useTransition()
  const [emailSent, setEmailSent] = useState(false)
  const supabase = useSupabaseBrowser()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { password: '' },
  })

  const handlePasswordReset = async (credentials: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const { data, error } = await supabase.auth.updateUser({
        password: credentials.password,
      })

      if (!error) {
        setEmailSent(true)
        toast.success('New password set')
        router.replace('/')

        return
      }

      toast.error(error?.message ?? 'An error occurred')
      console.log({ data, error })
    })
  }

  return (
    <div className="mx-auto flex justify-center items-center h-full px-3">
      <Card className="p-6 max-w-full w-[500px]">
        <div className="flex flex-col space-y-2 text-left mb-4">
          <p className="text-2xl font-semibold tracking-tight text-center">Password Reset</p>
          <p className="mt-4 text-sm text-muted-foreground text-center">Enter your new password below</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePasswordReset)} className="grid space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="New Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isPending} type="submit">
              Reset Password & Login
            </Button>
            <Link className="text-center text-sm underline cursor-pointer text-primary" href="/login">
              Back to login
            </Link>
          </form>
        </Form>
      </Card>
    </div>
  )
}
