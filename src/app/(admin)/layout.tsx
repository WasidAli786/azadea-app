import React from "react";
import AdminLayout from "@/src/components/admin/layout/admin-layout";
import { AdminProvider } from "@/src/components/admin/admin-context";
import { AdminSidebar } from "@/src/components/admin/layout/admin-sidebar";

export default function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminProvider>
        <div>
          <AdminSidebar />
          <AdminLayout>{children}</AdminLayout>
        </div>
      </AdminProvider>
    </>
  );
}
