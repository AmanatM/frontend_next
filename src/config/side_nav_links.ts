import { Home, LucideIcon, UserIcon, CodeXml, NotebookPen, Target } from 'lucide-react'

interface INavLinks {
  title: string
  url: string
  icon: LucideIcon
}

export const side_nav_links: INavLinks[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Coding',
    url: '/coding',
    icon: CodeXml,
  },
  {
    title: 'Tutorials',
    url: '/tutorials',
    icon: NotebookPen,
  },
  {
    title: 'Topics',
    url: '/topics',
    icon: Target,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: UserIcon,
  },
]
