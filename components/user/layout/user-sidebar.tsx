"use client";

import React, { Fragment } from "react";
import InputUI from "@/components/ui/input-ui";
import { CloseIcon } from "@/components/icons";
import ButtonUI from "@/components/ui/button-ui";
import { userMenu } from "@/config/site";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserSidebar: React.FC<Props> = ({
  isOpen,
  onClose,
  searchValue,
  onSearchChange,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-16 flex justify-between items-center p-4 border-b dark:border-gray-700">
        <div>
          <p className="font-medium text-sm">Signed in as</p>
          <p className="font-medium text-sm">zoey@example.com</p>
        </div>
        <ButtonUI
          isIconOnly
          radius="full"
          variant="light"
          color="default"
          onPress={onClose}
        >
          <CloseIcon className="text-2xl" />
        </ButtonUI>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <InputUI
          name="search"
          placeholder="Search..."
          color="primary"
          variant="faded"
          defaultValue={searchValue}
          onChange={onSearchChange}
        />

        <ul>
          {userMenu.map((menu) => (
            <Fragment key={menu.label}>
              {menu.link ? (
                <Link href={menu.link}>
                  <li
                    className="p-2 rounded-md hover:bg-default/40"
                    onClick={onClose}
                  >
                    {menu.label}
                  </li>
                </Link>
              ) : (
                <li
                  className="p-2 rounded-md hover:bg-danger/20 hover:text-danger cursor-pointer"
                  onClick={onClose}
                >
                  {menu.label}
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
