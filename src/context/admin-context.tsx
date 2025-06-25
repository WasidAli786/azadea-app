"use client";

import { createContext, useContext, useState } from "react";

type AdminContextType = {
  collapsed: boolean;
  toggle: () => void;
  mobileCollapsed: boolean;
  mobileToggle: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(false);

  const toggle = () => setCollapsed((prev) => !prev);
  const mobileToggle = () => setMobileCollapsed((prev) => !prev);

  return (
    <AdminContext.Provider
      value={{ collapsed, toggle, mobileCollapsed, mobileToggle }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
