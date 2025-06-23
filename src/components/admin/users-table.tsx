"use client";

import type { SVGProps } from "react";

import React from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import InputUI from "../ui/input-ui";
import ButtonUI from "../ui/button-ui";
import { Tooltip } from "@heroui/tooltip";
import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
} from "../icons";
import { Pagination } from "@heroui/pagination";
import UsersModal from "./users-modal";
import { useDisclosure } from "@heroui/modal";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "PASSWORD", uid: "password" },
  { name: "CREATED", uid: "created" },
  { name: "ACTIONS", uid: "actions" },
];

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    email: "tony.reichert@example.com",
    department: "Management",
    password: "789456",
    created: "02-Sep-2022, 7:41 pm",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Marketing",
    password: "123abc",
    created: "10-Oct-2022, 9:15 am",
  },
  {
    id: 3,
    name: "James Miller",
    email: "james.miller@example.com",
    department: "Engineering",
    password: "pass321",
    created: "14-Nov-2022, 3:22 pm",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    department: "Design",
    password: "design456",
    created: "05-Jan-2023, 11:00 am",
  },
  {
    id: 5,
    name: "Liam Brown",
    email: "liam.brown@example.com",
    department: "HR",
    password: "hr7890",
    created: "20-Feb-2023, 4:10 pm",
  },
  {
    id: 6,
    name: "Olivia Wilson",
    email: "olivia.wilson@example.com",
    department: "Finance",
    password: "finance123",
    created: "28-Mar-2023, 8:33 am",
  },
  {
    id: 7,
    name: "Noah Moore",
    email: "noah.moore@example.com",
    department: "Sales",
    password: "sales321",
    created: "12-Apr-2023, 2:45 pm",
  },
  {
    id: 8,
    name: "Ava Taylor",
    email: "ava.taylor@example.com",
    department: "Support",
    password: "support456",
    created: "25-Apr-2023, 6:20 pm",
  },
  {
    id: 9,
    name: "William Anderson",
    email: "william.anderson@example.com",
    department: "Engineering",
    password: "engineer001",
    created: "01-May-2023, 10:05 am",
  },
  {
    id: 10,
    name: "Sophia Thomas",
    email: "sophia.thomas@example.com",
    department: "QA",
    password: "qa789",
    created: "09-May-2023, 3:33 pm",
  },
  {
    id: 11,
    name: "Jackson Martinez",
    email: "jackson.martinez@example.com",
    department: "Product",
    password: "product321",
    created: "15-May-2023, 1:10 pm",
  },
  {
    id: 12,
    name: "Mia Robinson",
    email: "mia.robinson@example.com",
    department: "Marketing",
    password: "market123",
    created: "21-May-2023, 9:55 am",
  },
  {
    id: 13,
    name: "Benjamin Clark",
    email: "benjamin.clark@example.com",
    department: "Management",
    password: "admin007",
    created: "01-Jun-2023, 8:12 am",
  },
  {
    id: 14,
    name: "Isabella Rodriguez",
    email: "isabella.rodriguez@example.com",
    department: "Design",
    password: "figma321",
    created: "14-Jun-2023, 4:59 pm",
  },
  {
    id: 15,
    name: "Elijah Lewis",
    email: "elijah.lewis@example.com",
    department: "Support",
    password: "helpme!",
    created: "29-Jun-2023, 7:25 pm",
  },
  {
    id: 16,
    name: "Amelia Walker",
    email: "amelia.walker@example.com",
    department: "HR",
    password: "hire456",
    created: "05-Jul-2023, 11:41 am",
  },
  {
    id: 17,
    name: "Lucas Hall",
    email: "lucas.hall@example.com",
    department: "Engineering",
    password: "dev!123",
    created: "17-Jul-2023, 10:00 am",
  },
  {
    id: 18,
    name: "Charlotte Allen",
    email: "charlotte.allen@example.com",
    department: "QA",
    password: "testcase99",
    created: "23-Jul-2023, 12:30 pm",
  },
  {
    id: 19,
    name: "Henry Young",
    email: "henry.young@example.com",
    department: "Finance",
    password: "money$$$",
    created: "04-Aug-2023, 5:20 pm",
  },
  {
    id: 20,
    name: "Evelyn King",
    email: "evelyn.king@example.com",
    department: "Product",
    password: "pm@456",
    created: "19-Aug-2023, 9:00 am",
  },
];

type User = (typeof users)[0];

export const UsersTable = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const pages = Math.ceil(users.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users, rowsPerPage]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "role":
        return (
          <div className="flex flex-col">
            <p className="capitalize text-bold text-small">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg cursor-pointer text-danger active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col-reverse items-end justify-between gap-3 sm:items-center sm:flex-row">
          <InputUI
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon className="text-2xl" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <ButtonUI size="sm" color="primary" isIconOnly className="px-5">
              <RefreshIcon className="text-xl min-w-fit" />
            </ButtonUI>
            <ButtonUI
              size="sm"
              color="primary"
              endContent={<PlusIcon className="text-xl" />}
              onPress={onOpen}
            >
              Add
            </ButtonUI>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Users ({users.length})</span>
          <label className="flex items-center text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex justify-end">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
          th: ["text-black dark:text-white"],
        }}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UsersModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
