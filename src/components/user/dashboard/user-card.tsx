"use client";

import { useMutation } from "@tanstack/react-query";
import { BookmarkBorderIcon, BookmarkFilledIcon } from "../../icons";
import ButtonUI from "../../ui/button-ui";
import NextImage from "../../ui/next-image";
import { UserDashboardRecord } from "@/src/types";
import { Tooltip } from "@heroui/tooltip";
import Link from "next/link";
import { showSuccess, showError } from "@/src/lib/toast";
import { useRouter } from "next/navigation";

interface UserCardProps {
  record: UserDashboardRecord;
}

const UserCard = ({ record }: UserCardProps) => {
  const router = useRouter();

  const { mutate: toggleBookmarkMutate, isPending: isCreating } = useMutation({
    mutationFn: async (cardId: string | number) => {
      const res = await fetch(`/api/user/bookmark/${cardId}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to toggle bookmark");
      return res.json();
    },
    onSuccess: (data) => {
      router.refresh();
      showSuccess(data.message);
    },
    onError: () => {
      showError("Failed to update favorite status");
    },
  });
  return (
    <>
      <Tooltip content={record?.description} showArrow>
        <div className="relative group p-[1px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
          <Link href={`/dashboard/${record._id}`}>
            <div className="p-2 h-full bg-white rounded-xl dark:bg-gray-900">
              <div className="relative w-full h-48">
                <NextImage
                  src={record?.image || "/"}
                  alt="Card Image"
                  className="object-cover rounded-xl"
                  fill
                />
              </div>
              <h2 className="mt-2 text-sm text-center">{record?.title}</h2>
            </div>
          </Link>

          <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
            <ButtonUI
              isIconOnly
              size="sm"
              radius="full"
              color="primary"
              isLoading={isCreating}
              onPress={() => toggleBookmarkMutate(record._id)}
            >
              {record.isBookmarked ? (
                <BookmarkFilledIcon className="text-xl" />
              ) : (
                <BookmarkBorderIcon className="text-xl" />
              )}
            </ButtonUI>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default UserCard;
