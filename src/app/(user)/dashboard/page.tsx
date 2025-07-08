import { fetcher } from "@/src/lib/fetcher";
import { VerifyResponse } from "@/src/types";
import UserCard from "@/src/components/user/dashboard/user-card";
import WeatherWidget from "@/src/components/admin/weather-widget";
import NewsWidget from "@/src/components/admin/news-widget";
import SystemStatusWidget from "@/src/components/admin/system-status-widget";

export const dynamic = "force-dynamic";

interface Props {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}

export default async function UserDashboardPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search?.toLowerCase() || "";

  const data: VerifyResponse = await fetcher("/api/user/cards");

  const filtered = data?.cards?.filter((item) =>
    item.title.toLowerCase().includes(search)
  );

  if (!filtered || filtered.length === 0) {
    return <div className="py-10 text-center">No matching records found.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top widgets row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <WeatherWidget minimal={true} />
        <NewsWidget minimal={true} />
        <SystemStatusWidget minimal={true} />
      </div>
      {/* User cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((record) => (
          <UserCard key={record?._id} record={record} />
        ))}
      </div>
    </div>
  );
}
