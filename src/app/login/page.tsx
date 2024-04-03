'use client'
import { Button } from '@/components/custom/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { PasswordInput } from '@/components/custom/password-input'
import Link from 'next/link'

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
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'mweblays@gmail.com',
      password: '12345678',
    },
  })

  const handleSignIn = async (credentials: z.infer<typeof FormSchema>) => {
    setIsLoading(true)

    console.log('handle login')
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
            <Button loading={isLoading} type="submit">
              Login
            </Button>
          </form>
        </Form>
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account? <Link href="/signup">Create Account</Link>
        </p>
      </Card>
    </div>
  )
}
