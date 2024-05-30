'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { AuthTokenResponse } from '@supabase/supabase-js'
import { loginWithEmailAndPassword, signUpWithEmailAndPassword } from '../actions'
import { Button } from '@/components/custom/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/custom/password-input'
import { Card } from '@/components/ui/card'
import { Github } from 'lucide-react'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'

const FormSchema = z.object({
  email: z.string().min(1, { message: 'Please enter your email' }).email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Please enter your password' })
    .min(7, { message: 'Password must be at least 7 characters long' }),
})

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectTo') || '/'
  const supabase = useSupabaseBrowser()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  })

  const handleAuth = async (credentials: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const action = isSignUp ? signUpWithEmailAndPassword : loginWithEmailAndPassword
      const { error } = JSON.parse(await action(credentials)) as AuthTokenResponse

      if (error) {
        toast.error(
          isSignUp
            ? error.code === 'user_already_exists'
              ? 'User already exists'
              : 'Failed to create account'
            : 'Failed to sign in',
        )
      } else {
        toast.success(isSignUp ? 'Successfully created account 🎉' : 'Signed in')
        router.replace(redirectUrl)
      }
    })
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectUrl}`,
      },
    })
  }

  return (
    <div className="mx-auto flex justify-center items-center h-screen px-3">
      <Card className="p-6 max-w-full w-[500px]">
        <div className="flex flex-col space-y-2 text-left mb-4">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            {isSignUp ? 'Create Account' : 'Login'}
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <span className="underline cursor-pointer text-primary" onClick={() => setIsSignUp(false)}>
                  Login
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <span className="underline cursor-pointer text-primary" onClick={() => setIsSignUp(true)}>
                  Create Account
                </span>
              </>
            )}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAuth)} className="grid space-y-6">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isPending} type="submit">
              {isSignUp ? 'Create Account' : 'Login'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button onClick={signInWithGithub} variant="ghost" type="button" className="space-x-1 border border-input">
              <Github size={17} /> <span>GitHub</span>
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
