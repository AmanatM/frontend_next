import { CSSIcon, HTMLIcon, JavascriptIcon } from '@/app/icons/code-icons'
import { Braces, Code } from 'lucide-react'

export const getIconForLanguage = (language: string | null) => {
  switch (language) {
    case 'javascript':
      return <JavascriptIcon />
    case 'html':
      return <HTMLIcon />
    case 'css':
      return <CSSIcon />
    default:
      return null
  }
}
