'use client'
import { Button } from '@/components/custom/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { useTransition } from 'react'
import { PasswordInput } from '@/components/custom/password-input'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'
import { redirect, useRouter } from 'next/navigation'
import { loginWithEmailAndPassword } from '../actions'
import { AuthTokenResponse } from '@supabase/supabase-js'

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
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'mweblays@gmail.com',
      password: '12345678',
    },
  })

  function handleSignIn(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { error } = JSON.parse(await loginWithEmailAndPassword(data)) as AuthTokenResponse

      if (error) {
        toast({
          title: 'Failed to login',
          variant: 'destructive',
          description: error.message,
        })
      } else {
        toast({
          title: 'Successfully login 🎉',
        })
        redirect('/')
      }
    })
  }

  return (
    <div className="mx-auto flex justify-center items-center h-screen">
      {' '}
      {/* Adjusted h-lvh to h-screen for simplicity */}
      <Card className="p-6 max-w-full w-[500px]">
        <div className="flex flex-col space-y-2 text-left">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            Login{/* Adjusted usage of Link */}
          </Link>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below <br />
            to log into your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)} className="grid space-y-6">
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
              Login
            </Button>
          </form>
        </Form>
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link className="underline" href="/signup">
            Create Account
          </Link>
        </p>
      </Card>
    </div>
  )
}
