import { Home, LucideIcon, UserIcon, CodeXml, NotebookPen, Target } from 'lucide-react'
import { UrlObject } from 'url'

type INavLinks = {
  title: string
  url: UrlObject
  icon: LucideIcon
}

export const side_nav_links: INavLinks[] = [
  {
    title: 'Home',
    url: { pathname: '/'},
    icon: Home,
  },
  {
    title: 'Coding',
    url: { pathname: '/coding'},
    icon: CodeXml,
  },
  {
    title: 'Tutorials',
    url: { pathname: '/tutorials'},
    icon: NotebookPen,
  },
  {
    title: 'Topics',
    url: { pathname: '/topics'},
    icon: Target,
  },
  {
    title: 'Profile',
    url: { pathname: '/profile'},
    icon: UserIcon,
  },
]
