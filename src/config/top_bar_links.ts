import { UrlObject } from "url"

type MenuLinks = {
  title: string
  url: UrlObject
}

export const top_menu_links: MenuLinks[] = [
  {
    title: "Dashboard",
    url: { pathname: "/dashboard" },
  },
  {
    title: "Coding",
    url: { pathname: "/coding" },
  },
  {
    title: "Tutorials",
    url: { pathname: "/tutorials" },
  },
]
