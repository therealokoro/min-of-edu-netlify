// @unocss-include
export const MENU_LINKS = [
  { label: "Home", to: "/" },
  {
    label: "Portals",
    to: "#",
    children: [
      { label: "Staff", to: "/staff" },
      { label: "Administrative", to: "/admin" }
    ]
  },
  { label: "News", to: "/news" },

  {
    label: "ICT Services",
    to: "#",
    children: [{ label: "E-Recruitments", to: "/e-recruitment" }]
  },
  {
    label: "Extras",
    to: "#",
    children: [
      { label: "Gallery", to: "/extras/gallery" },
      { label: "Staff Profiles", to: "/extras/staff-profiles" },
      { label: "Announcements", to: "/announcements" }
    ]
  },
  { label: "About Us", to: "/about-us" },
  { label: "Contacts", to: "/contacts" }
].map((curr) => ({ ...curr, active: false }))

export const ADMIN_SIDE_NAV_LINKS = [
  { label: "Dashboard", to: "/admin", icon: "i-tabler-home" },
  {
    label: "Manage Staffs",
    to: "/admin/manage-staffs",
    icon: "i-tabler-users"
  },
  {
    label: "Verification",
    to: "/admin/screening",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "Recruitments",
    to: "/admin/recruitment",
    icon: "i-tabler-list"
  },
  {
    label: "Posting & Transfer",
    to: "/admin/posting-transfer",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "E-Files",
    to: "/admin/e-files",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "Staff Enquiries",
    to: "/admin/#",
    icon: "i-tabler-info-circle"
  },
  {
    label: "Manage Pages",
    to: "/admin/manage-pages",
    icon: "i-tabler-file-settings"
  },
  {
    label: "Messages",
    to: "/admin/messages",
    icon: "i-tabler-message"
  }
].map((curr) => ({ ...curr, active: false }))

export const STAFF_SIDE_NAV_LINKS = [
  { label: "Dashboard", to: "/staff", icon: "i-tabler-home" },
  {
    label: "Verification",
    to: "/staff/screening",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "Recruitments",
    to: "/staff/recruitment",
    icon: "i-tabler-list"
  },
  {
    label: "Posting & Transfer",
    to: "/staff/posting-transfer",
    icon: "i-tabler-clipboard-list"
  },
  {
    label: "Staff Enquiries/Feedback",
    to: "/staff/enquiries",
    icon: "i-tabler-info-circle"
  }
].map((curr) => ({ ...curr, active: false }))

export type NavLink = {
  label: string
  to: string
  icon?: string
  active: boolean
}

export const useActivePageLink = <T extends NavLink>(
  links: T[],
  homeRoute = "/"
) => {
  return computed(() => {
    const route = useRoute()

    return links.map((linkIten) => {
      if (linkIten.to === homeRoute && route.path !== homeRoute) {
        return { ...linkIten, active: false }
      }

      const active = route.path.startsWith(linkIten.to)
      return { ...linkIten, active }
    })
  })
}

export const useExpandSideNav = () => useState("side-panel", () => false)
