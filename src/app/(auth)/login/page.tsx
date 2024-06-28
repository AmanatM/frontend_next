"use client"

import { Suspense, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { AuthResponse, AuthTokenResponse } from "@supabase/supabase-js"
import { loginWithEmailAndPassword, signUpWithEmailAndPassword } from "../actions"
import { Button } from "@/components/custom/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/custom/password-input"
import { Card } from "@/components/ui/card"
import { Apple, Github } from "lucide-react"
import useSupabaseBrowser from "@/supabase-utils/supabase-client"
import { AppleLogo } from "@/icons/custom-icons"

const FormSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" }).email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Please enter your password" })
    .min(7, { message: "Password must be at least 7 characters long" }),
})

function LoginComponent() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirectTo") || "/"
  const filteredRedirectUrl = redirectUrl.startsWith("/auth") ? "/" : redirectUrl
  const supabase = useSupabaseBrowser()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  })

  const handleSignUp = async (credentials: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const { data, error } = JSON.parse(
        await signUpWithEmailAndPassword({
          email: credentials.email,
          password: credentials.password,
          redirectURL: redirectUrl,
        }),
      ) as AuthResponse

      if (error) {
        toast.error(error?.code === "user_already_exists" ? "User already exists" : "Failed to create account")
      } else {
        router.replace(`/auth/email-verification?email=${credentials.email}`)
      }
    })
  }

  const handleSignIn = async (credentials: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const { error } = JSON.parse(await loginWithEmailAndPassword(credentials)) as AuthTokenResponse

      if (error) {
        toast.error("Failed to sign in")
      } else {
        toast.success("Signed in")
        router.replace(filteredRedirectUrl)
      }
    })
  }

  const handleSubmit = async (credentials: z.infer<typeof FormSchema>) => {
    if (isSignUp) {
      await handleSignUp(credentials)
    } else {
      await handleSignIn(credentials)
    }
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${filteredRedirectUrl}`,
      },
    })
  }

  async function signInWithApple() {
    await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${filteredRedirectUrl}`,
      },
    })
  }

  return (
    <div className="mx-auto flex h-full items-center justify-center px-3">
      <Card className="w-[500px] max-w-full p-6">
        <div className="mb-4 flex flex-col space-y-2 text-left">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            {isSignUp ? "Create Account" : "Login"}
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <span className="cursor-pointer text-primary underline" onClick={() => setIsSignUp(false)}>
                  Login
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <span className="cursor-pointer text-primary underline" onClick={() => setIsSignUp(true)}>
                  Create Account
                </span>
              </>
            )}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} autoComplete="email" />
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
                    <PasswordInput
                      placeholder="Password"
                      {...field}
                      autoComplete={isSignUp ? "new-password" : "current-password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isSignUp && (
              <Link className="cursor-pointer text-left text-sm text-primary underline" href="/auth/forgot-password">
                Forgot password?
              </Link>
            )}
            <Button loading={isPending} type="submit">
              {isSignUp ? "Create Account" : "Login"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={signInWithGithub}
                variant="ghost"
                type="button"
                className="space-x-1 border border-input"
              >
                <Github size={17} /> <span>GitHub</span>
              </Button>
              <Button onClick={signInWithApple} variant="ghost" type="button" className="space-x-1 border border-input">
                <AppleLogo size={17} /> <span>Apple</span>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default function Login() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <LoginComponent />
    </Suspense>
  )
}
