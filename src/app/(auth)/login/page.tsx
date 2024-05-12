'use client'
import { Button } from '@/components/custom/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { useState, useTransition } from 'react'
import { PasswordInput } from '@/components/custom/password-input'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { loginWithEmailAndPassword, signUpWithEmailAndPassword } from '../actions'
import { AuthTokenResponse } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { UrlObject } from 'url'
import { Route } from 'next'

const FormSchema = z.object({
  email: z.string().min(1, { message: 'Please enter your email' }).email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectUrl = searchParams.get('redirectTo') || '/'

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'mweblays@gmail.com',
      password: '12345678',
    },
  })

  const handleAuth = async (credentials: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      if (isSignUp) {
        const { error } = JSON.parse(await signUpWithEmailAndPassword(credentials))
        if (error) {
          toast.error('Failed to create account')
        } else {
          toast.success('Successfully created account 🎉')
          router.replace(redirectUrl as Route)
        }
      } else {
        const { error } = JSON.parse(await loginWithEmailAndPassword(credentials)) as AuthTokenResponse
        if (error) {
          toast.error('Failed to sign in')
        } else {
          toast.success('Signed in')
          router.replace(redirectUrl as Route)
        }
      }
    })
  }

  return (
    <div className="mx-auto flex justify-center items-center h-dvh">
      {' '}
      {/* Adjusted h-lvh to h-screen for simplicity */}
      <Card className="p-6 max-w-full w-[500px]">
        <div className="flex flex-col space-y-2 text-left mb-4">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            {isSignUp ? 'Create Account' : 'Login'}
          </Link>
          <p className="text-sm text-muted-foreground">Enter your email and password below</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAuth)} className="grid space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Password</FormLabel>
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
          </form>
        </Form>
        {isSignUp ? (
          <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
            Already have account?{' '}
            <span className="underline cursor-pointer" onClick={() => setIsSignUp(false)}>
              Login
            </span>
          </p>
        ) : (
          <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <span className="underline cursor-pointer" onClick={() => setIsSignUp(true)}>
              Create Account
            </span>
          </p>
        )}
      </Card>
    </div>
  )
}
