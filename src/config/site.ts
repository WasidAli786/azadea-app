import {
  DashboardIcon,
  HomeIcon,
  LogoutIcon,
  PasswordIcon,
  UserIcon,
} from "../components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Azadea App",
  description: "Azadea app",
};

export const userMenu = [
  // {
  //   label: "Favorites",
  //   link: "/favorites",
  // },
  {
    icon: PasswordIcon,
    label: "Change Password",
  },
  {
    icon: LogoutIcon,
    label: "Logout",
    isLogout: true,
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
    href: "/admin/users",
    icon: UserIcon,
  },
  {
    label: "Dashboard",
    href: "/admin/modules",
    icon: DashboardIcon,
  },
];
