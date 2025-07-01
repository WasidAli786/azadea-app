import { VerifyResponse, UserDashboardRecord } from "@/src/types";
import ButtonUI from "@/src/components/ui/button-ui";
import { fetcher } from "@/src/lib/fetcher";
import Link from "next/link";

export default async function DashboardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data: VerifyResponse = await fetcher("/api/user/cards");

  const record: UserDashboardRecord | undefined = data?.cards?.find(
    (item) => item._id.toString() === id
  );

  if (!record) {
    return (
      <div className="p-10 text-center text-red-500">Dashboard not found</div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold md:text-2xl">{record.title}</h1>
        <Link href="/dashboard">
          <ButtonUI variant="ghost">Back To Home</ButtonUI>
        </Link>
      </div>
      <div className="mt-5">
        <iframe
          src={record.link}
          title={record.title}
          allowFullScreen
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          height="1000vh"
          width="100%"
          className="dark:invert"
        />
      </div>
    </>
  );
}
