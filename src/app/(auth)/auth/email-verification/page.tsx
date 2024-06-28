import { TypographyMuted } from "@/components/typography"
import { Card } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function EmailVerification({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // const email = params.get("email")
  const email = searchParams.email
  return (
    <div className="mx-auto flex h-full items-center justify-center px-3">
      <Card className="w-[500px] max-w-full p-6">
        <div className="mb-4 flex flex-col space-y-4 text-left">
          <Mail className="mx-auto h-12 w-12 text-primary" />
          <p className="text-center text-xl font-semibold tracking-tight">Verification link sent to:</p>
          <p className="text-center text-xl font-semibold tracking-tight">{email}</p>{" "}
          <Link className="cursor-pointer text-center text-sm text-primary underline" href="/login">
            Back to login
          </Link>
          <TypographyMuted className="text-center tracking-tight">
            Note: If user already exist you won&apos;t get an email
          </TypographyMuted>{" "}
        </div>
      </Card>
    </div>
  )
}
