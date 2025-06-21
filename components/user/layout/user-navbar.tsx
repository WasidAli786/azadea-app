"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputUI from "@/components/ui/input-ui";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { ThemeSwitch } from "@/components/theme-switch";
import Link from "next/link";
import UserSidebar from "./user-sidebar";
import { MenuIcon } from "@/components/icons";
import ButtonUI from "@/components/ui/button-ui";
import { useDebounce } from "@/hooks/use-debounce";

const UserNavbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
        <div className="h-16 flex items-center justify-between container">
          <Link href="/dashboard">
            <h1 className="text-xs sm:text-sm font-semibold">
              Welcome DataCrypt-testing Account!
            </h1>
          </Link>

          <div className="flex items-center md:gap-2">
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
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="favorites" href="/favorites">
                    Favorites
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
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
        onClose={() => setIsSidebarOpen(false)}
        searchValue={searchParams.get("search") || ""}
        onSearchChange={onSearchChange}
      />
    </>
  );
};

export default UserNavbar;
