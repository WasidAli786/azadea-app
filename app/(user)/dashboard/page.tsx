import { fetcher } from "@/lib/fetcher";
import { VerifyResponse } from "@/types";
import UserCard from "@/components/user/dashboard/user-card";

export const dynamic = "force-dynamic";

interface Props {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}

export default async function UserDashboardPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search?.toLowerCase() || "";

  const data: VerifyResponse = await fetcher(
    "https://azadea-api.ytech.systems/api/auth/verify"
  );

  const filtered = data?.records?.dashboards?.filter((item) =>
    item.title.toLowerCase().includes(search)
  );

  if (!filtered || filtered.length === 0) {
    return <div className="py-10 text-center">No matching records found.</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered.map((record) => (
        <UserCard key={record?.id} record={record} />
      ))}
    </div>
  );
}
