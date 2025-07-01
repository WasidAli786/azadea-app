"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookmarkBorderIcon, BookmarkFilledIcon } from "../../icons";
import ButtonUI from "../../ui/button-ui";
import NextImage from "../../ui/next-image";
import { UserDashboardRecord } from "@/src/types";
import { Tooltip } from "@heroui/tooltip";
import Link from "next/link";

interface UserCardProps {
  record: UserDashboardRecord;
}

const UserCard = ({ record }: UserCardProps) => {
  const queryClient = useQueryClient();

  const { mutate: toggleBookmarkMutate, isPending: isCreating } = useMutation({
    mutationFn: async (cardId: string | number) => {
      const res = await fetch(`/api/user/bookmark/${cardId}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to toggle bookmark");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
  return (
    <>
      <Tooltip content={record?.description} showArrow>
        <Link href={`/dashboard/${record._id}`}>
          <div className="relative group p-[1px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
            <div className="h-full p-2 bg-white dark:bg-gray-900 rounded-xl">
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

            {/* <div className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100">
              <ButtonUI
                isIconOnly
                size="sm"
                radius="full"
                color="primary"
                onPress={() => toggleBookmarkMutate(record._id)}
              >
                {record.isBookmarked ? (
                  <BookmarkFilledIcon />
                ) : (
                  <BookmarkBorderIcon className="text-xl" />
                )}
              </ButtonUI>
            </div> */}
          </div>
        </Link>
      </Tooltip>
    </>
  );
};

export default UserCard;
