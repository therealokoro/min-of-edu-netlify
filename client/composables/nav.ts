// @unocss-include
export const MENU_LINKS = [
  { label: "Home", link: "/" },
  {
    label: "Portals",
    link: "#",
    children: [
      { label: "Staff", link: "/staff" },
      { label: "Administrative", link: "/admin" }
    ]
  },
  { label: "News", link: "/news" },

  {
    label: "ICT Services",
    link: "#",
    children: [{ label: "E-Recruitments", link: "/e-recruitment" }]
  },
  {
    label: "Extras",
    link: "#",
    children: [
      { label: "Gallery", link: "/extras/gallery" },
      { label: "Staff Profiles", link: "/extras/staff-profiles" },
      { label: "Announcements", link: "/announcements" }
    ]
  },
  { label: "About Us", link: "/about-us" },
  { label: "Contacts", link: "/contacts" }
].map((curr) => ({ ...curr, isActive: false }))

export const ADMIN_SIDE_NAV_LINKS = [
  { label: "Dashboard", link: "/admin", icon: "i-tabler-home" },
  {
    label: "Manage Staffs",
    link: "/admin/manage-staffs",
    icon: "i-tabler-users"
  },
  {
    label: "Verification",
    link: "/admin/screening",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "Recruitments",
    link: "/admin/recruitment",
    icon: "i-tabler-list"
  },
  {
    label: "Posting & Transfer",
    link: "/admin/posting-transfer",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "E-Files",
    link: "/admin/e-files",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "Staff Enquiries",
    link: "/admin/#",
    icon: "i-tabler-info-circle"
  },
  {
    label: "Manage Pages",
    link: "/admin/manage-pages",
    icon: "i-tabler-file-settings"
  },
  {
    label: "Messages",
    link: "/admin/messages",
    icon: "i-tabler-message"
  }
].map((curr) => ({ ...curr, isActive: false }))

export const STAFF_SIDE_NAV_LINKS = [
  { label: "Dashboard", link: "/staff", icon: "i-tabler-home" },
  {
    label: "Verification",
    link: "/staff/screening",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "Recruitments",
    link: "/staff/recruitment",
    icon: "i-tabler-list"
  },
  {
    label: "Posting & Transfer",
    link: "/staff/posting-transfer",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "Staff Enquiries/Feedback",
    link: "/staff/enquiries",
    icon: "i-tabler-info-circle"
  }
].map((curr) => ({ ...curr, isActive: false }))

export type NavLink = {
  label: string
  link: string
  icon?: string
  isActive: boolean
}

export const useActivePageLink = <T extends NavLink>(
  links: T[],
  homeRoute = "/"
) => {
  return computed(() => {
    const route = useRoute()

    return links.map((link) => {
      if (link.link === homeRoute && route.path !== homeRoute) {
        return { ...link, isActive: false }
      }

      const isActive = route.path.startsWith(link.link)
      return { ...link, isActive }
    })
  })
}

export const useExpandSideNav = () => useState("side-panel", () => false)
