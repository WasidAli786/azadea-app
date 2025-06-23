import { DashboardIcon, HomeIcon, UserIcon } from "../components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Azadea App",
  description: "Azadea app",
};

export const userMenu = [
  {
    label: "Favorites",
    link: "/favorites",
  },
  {
    label: "Logout",
  },
];

export const adminMenu = [
  {
    label: "Home",
    href: "/admin",
    icon: HomeIcon,
  },
  {
    label: "Users",
    href: "/users",
    icon: UserIcon,
  },
  {
    label: "Dashboard",
    href: "/modules",
    icon: DashboardIcon,
  },
];
