import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { ThemeSwitch } from "../../theme-switch";
import ButtonUI from "../../ui/button-ui";
import { MenuIcon } from "../../icons";
import { useAdminContext } from "../admin-context";

export const AdminNavbar = () => {
  const { collapsed, toggle } = useAdminContext();
  return (
    <>
      <header className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
        <h1 className="font-medium">Welcome Admin!</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeSwitch />
          <div>
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
                  <p className="font-semibold">zoey@example.com</p>
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
              onPress={toggle}
            >
              <MenuIcon className="text-2xl" />
            </ButtonUI>
          </div>
        </div>
      </header>
    </>
  );
};
