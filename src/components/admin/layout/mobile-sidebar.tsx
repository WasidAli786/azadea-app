"use client";

import { CloseIcon, LogoutIcon, PasswordIcon } from "../../icons";
import { useAdminContext } from "@/src/context/admin-context";
import { adminMenu } from "@/src/config/site";
import { usePathname } from "next/navigation";
import ButtonUI from "../../ui/button-ui";
import { useUser } from "@/src/context/user-context";
import Link from "next/link";

export const MobileSidebar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const { user, logout } = useUser();
  const { mobileCollapsed, mobileToggle } = useAdminContext();
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-64 z-50 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
        mobileCollapsed ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between h-16 p-4 border-b dark:border-gray-700">
        <div>
          <p className="text-sm font-medium">Signed in as</p>
          <p className="text-sm font-medium">{user?.email}</p>
        </div>
        <ButtonUI
          isIconOnly
          radius="full"
          variant="light"
          color="default"
          onPress={mobileToggle}
        >
          <CloseIcon className="text-2xl" />
        </ButtonUI>
      </div>

      <nav className="flex flex-col h-full gap-1 py-2 overflow-y-auto">
        {adminMenu.map((item) => (
          <Link
            href={item.href}
            key={item.href + item.label}
            className={`flex items-center gap-3 p-2 hover:bg-default/40 ${item.href === pathname && "bg-default/40"}`}
            onClick={mobileToggle}
          >
            <item.icon className="w-5 h-5" />
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        ))}
        <div
          className="flex items-center gap-3 p-2 cursor-pointer hover:bg-default/40"
          onClick={() => {
            onOpenModal();
            mobileToggle();
          }}
        >
          <PasswordIcon />
          <span className="whitespace-nowrap">Change Password</span>
        </div>
        <div className="flex items-center w-full gap-3 p-2 rounded-md cursor-pointer hover:bg-danger/20 hover:text-danger">
          <LogoutIcon />
          <span
            onClick={() => {
              logout();
              mobileToggle();
            }}
          >
            Logout
          </span>
        </div>
      </nav>
    </aside>
  );
};
