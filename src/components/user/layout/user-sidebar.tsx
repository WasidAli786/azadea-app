"use client";

import React, { Fragment } from "react";
import InputUI from "../../ui/input-ui";
import { CloseIcon } from "../../icons";
import ButtonUI from "../../ui/button-ui";
import { userMenu } from "@/src/config/site";
import { useUser } from "@/src/context/user-context";

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

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between h-16 p-4 border-b dark:border-gray-700">
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
              {!menu.isLogout ? (
                <li
                  className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-default/40"
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
                  className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-danger/20 hover:text-danger"
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
