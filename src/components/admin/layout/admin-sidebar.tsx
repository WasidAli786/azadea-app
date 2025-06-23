"use client";

import clsx from "clsx";
import {
  OutlineKeyboardArrowLeft,
  OutlineKeyboardArrowRight,
} from "../../icons";
import { useAdminContext } from "../admin-context";
import { adminMenu } from "@/src/config/site";
import Link from "next/link";

export const AdminSidebar = () => {
  const { collapsed, toggle } = useAdminContext();

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col h-screen fixed top-0 left-0 z-40 border-r dark:border-gray-700 transition-all duration-300",
        collapsed ? "w-12" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-[71px] px-4 border-b dark:border-gray-700">
        {!collapsed && <h2 className="font-semibold">Azadea</h2>}
        <button
          className="absolute p-1 bg-gray-100 border rounded-full dark:border-gray-950 dark:bg-gray-800 -right-3"
          onClick={toggle}
        >
          {collapsed ? (
            <OutlineKeyboardArrowRight />
          ) : (
            <OutlineKeyboardArrowLeft />
          )}
        </button>
      </div>

      <nav className="flex flex-col h-full py-2 overflow-y-auto">
        {adminMenu.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="flex items-center gap-3 p-3 hover:bg-default/40"
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && (
              <span className="whitespace-nowrap">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
