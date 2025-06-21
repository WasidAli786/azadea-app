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
  return (
    <>
      <Tooltip content="I am a tooltip" showArrow>
        <Link href={`/dashboard/${record.id}`}>
          <div className="relative group p-[1px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 h-full">
              <div className="relative w-full h-48">
                <NextImage
                  src={record?.image_public_url || "/"}
                  alt="Card Image"
                  className="rounded-xl object-cover"
                  fill
                />
              </div>
              <h2 className="text-sm text-center mt-2">{record?.title}</h2>
            </div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ButtonUI isIconOnly size="sm" radius="full" color="primary">
                <BookmarkBorderIcon className="text-xl" />
              </ButtonUI>
            </div>
          </div>
        </Link>
      </Tooltip>
    </>
  );
};

export default UserCard;
