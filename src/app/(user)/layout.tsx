import UserNavbar from "@/src/components/user/layout/user-navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <UserNavbar />
      <div className="container py-5 md:py-10">{children}</div>
    </div>
  );
}
