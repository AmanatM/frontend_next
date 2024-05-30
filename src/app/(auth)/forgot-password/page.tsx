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

const FormSchema = z.object({
  email: z.string().min(1, { message: 'Please enter your email' }).email({ message: 'Invalid email address' }),
})

export default function Login() {
  const [isPending, startTransition] = useTransition()
  const [emailSent, setEmailSent] = useState(false)
  const supabase = useSupabaseBrowser()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '' },
  })

  const handlePasswordReset = async (credentials: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(credentials.email)

      if (!error) {
        setEmailSent(true)
        toast.success('Password reset link sent. Please check your inbox')
      }
    })
  }

  if (emailSent) {
    return (
      <div className="mx-auto flex justify-center items-center h-full px-3">
        <Card className="p-6 max-w-full w-[500px]">
          <div className="flex flex-col space-y-4 text-left mb-4">
            <Mail className="mx-auto w-12 h-12 text-primary" />
            <p className="text-xl font-semibold tracking-tight text-center">
              An email containing the password reset instructions will be sent if an associated account exists
            </p>
            <Link className="text-center text-sm underline cursor-pointer text-primary" href="/login">
              Back to login
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto flex justify-center items-center h-full px-3">
      <Card className="p-6 max-w-full w-[500px]">
        <div className="flex flex-col space-y-2 text-left mb-4">
          <p className="text-2xl font-semibold tracking-tight text-center">Forgot Password</p>
          <p className="mt-4 text-sm text-muted-foreground text-center">Enter your new password below</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePasswordReset)} className="grid space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isPending} type="submit">
              Send reset link
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
