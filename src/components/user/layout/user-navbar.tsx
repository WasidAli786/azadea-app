"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputUI from "../../ui/input-ui";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { ThemeSwitch } from "../../theme-switch";
import Link from "next/link";
import UserSidebar from "./user-sidebar";
import { LogoutIcon, MenuIcon, PasswordIcon } from "../../icons";
import ButtonUI from "../../ui/button-ui";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useUser } from "@/src/context/user-context";
import ChangePasswordModal from "../../change-password-modal";
import { useDisclosure } from "@heroui/modal";

const UserNavbar = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const debouncedSearch = useDebounce(search);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
    setIsSidebarOpen(false);
  }, [debouncedSearch]);

  return (
    <>
      <nav className="border-b dark:border-gray-700">
        <div className="container flex items-center justify-between h-16">
          <Link href="/dashboard">
            <h1 className="text-xs font-semibold sm:text-sm">
              Welcome DataCrypt-testing Account!
            </h1>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <InputUI
                name="search"
                placeholder="Search..."
                color="primary"
                variant="faded"
                defaultValue={searchParams.get("search") || ""}
                onChange={onSearchChange}
              />
            </div>
            <ThemeSwitch />
            {user?.id && (
              <div className="hidden md:block">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name="Jason Hughes"
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="gap-2 h-14">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{user?.email}</p>
                    </DropdownItem>
                    {/* <DropdownItem key="favorites" href="/favorites">
                      Favorites
                    </DropdownItem> */}
                    <DropdownItem
                      key="change-password"
                      startContent={<PasswordIcon />}
                      onClick={onOpen}
                    >
                      Change Password
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      onPress={logout}
                      startContent={<LogoutIcon />}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
            <div className="md:hidden">
              <ButtonUI
                isIconOnly
                radius="full"
                variant="light"
                color="default"
                onPress={() => setIsSidebarOpen(true)}
              >
                <MenuIcon className="text-2xl" />
              </ButtonUI>
            </div>
          </div>
        </div>
      </nav>

      <UserSidebar
        isOpen={isSidebarOpen}
        onModalOpen={onOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchValue={searchParams.get("search") || ""}
        onSearchChange={onSearchChange}
      />
      <ChangePasswordModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default UserNavbar;
