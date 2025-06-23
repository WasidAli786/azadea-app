"use client";

import { ReactNode } from "react";
import { AdminNavbar } from "./admin-navbar";
import { useAdminContext } from "../admin-context";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { collapsed } = useAdminContext();
  return (
    <>
      <div
        className={`transition-all duration-300 ${collapsed ? "md:ml-12" : "md:ml-64"}`}
      >
        <AdminNavbar />
        <main className="p-6">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
