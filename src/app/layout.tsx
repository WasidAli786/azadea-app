import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { siteConfig } from "../config/site";
import { montserrat } from "../lib/fonts";
import { UserProvider } from "../context/user-context";
import { QueryProvider } from "../lib/query-provider";
import { Toaster } from "react-hot-toast";
import clsx from "clsx";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background antialiased",
          montserrat.className
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <QueryProvider>
            <UserProvider>{children}</UserProvider>
          </QueryProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
