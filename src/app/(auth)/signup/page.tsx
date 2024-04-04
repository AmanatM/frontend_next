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

const FormSchema = z
  .object({
    email: z.string().min(1, { message: 'Please enter your email' }).email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(7, {
        message: 'Password must be at least 7 characters long',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'mweblays@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
    },
  })

  const handleSignUp = async (credentials: z.infer<typeof FormSchema>) => {
    setIsLoading(true)

    console.log('handle login')
  }

  return (
    <div className="mx-auto flex justify-center items-center h-lvh">
      <Card className="p-6 max-w-full w-[500px]">
        <div className="flex flex-col space-y-2 text-left">
          <Link href="/">
            <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
          </Link>
          <p className="text-sm text-muted-foreground">Enter your email and password below</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUp)} className="grid space-y-6">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isLoading} type="submit" className="mt-2">
              Sign Up
            </Button>
          </form>
        </Form>
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Already have account?{' '}
          <Link className={'underline'} href="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  )
}
