import { fetcher } from "@/src/lib/fetcher";
import { VerifyResponse } from "@/src/types";
import UserCard from "@/src/components/user/dashboard/user-card";

export const dynamic = "force-dynamic";

interface Props {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}

export default async function FavoritesPage({ searchParams }: Props) {
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
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filtered.map((record) => (
        <UserCard key={record?._id} record={record} />
      ))}
    </div>
  );
}
