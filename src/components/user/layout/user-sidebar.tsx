"use client";

import React, { Fragment } from "react";
import InputUI from "../../ui/input-ui";
import { CloseIcon } from "../../icons";
import ButtonUI from "../../ui/button-ui";
import { userMenu } from "@/src/config/site";
import { useUser } from "@/src/context/user-context";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onModalOpen: () => void;
  onClose: () => void;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserSidebar: React.FC<Props> = ({
  isOpen,
  onModalOpen,
  onClose,
  searchValue,
  onSearchChange,
}) => {
  const { user, logout } = useUser();
  const router = useRouter();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 h-16 border-b dark:border-gray-700">
        <div>
          <p className="text-sm font-medium">Signed in as</p>
          <p className="text-sm font-medium">{user?.email}</p>
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
                <li
                  className="flex gap-3 items-center p-2 rounded-md cursor-pointer hover:bg-default/40"
                  onClick={() => {
                    router.push(menu.link!);
                    onClose();
                  }}
                >
                  <menu.icon />
                  {menu.label}
                </li>
              ) : !menu.isLogout ? (
                <li
                  className="flex gap-3 items-center p-2 rounded-md cursor-pointer hover:bg-default/40"
                  onClick={() => {
                    onModalOpen();
                    onClose();
                  }}
                >
                  <menu.icon />
                  {menu.label}
                </li>
              ) : (
                <li
                  className="flex gap-3 items-center p-2 rounded-md cursor-pointer hover:bg-danger/20 hover:text-danger"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  <menu.icon />
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
