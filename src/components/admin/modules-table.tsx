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
import { useDisclosure } from "@heroui/modal";
import ModulesModal from "./modules-modal";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
  { name: "TITLE", uid: "title" },
  { name: "LINK", uid: "link" },
  { name: "ASSIGNED TO", uid: "assignee" },
  { name: "CREATED", uid: "created" },
  { name: "ACTIONS", uid: "actions" },
];

export const users = [
  {
    id: 1,
    title: "Tony Reichert",
    link: "https://app.powerbi.com/view?r=eyJrIjoiNzAzN2I2NzEtNGE0My00NWZhLWFhY2MtZDdkOWI2YTBmNDNhIiwidCI6ImFmNDdkYjk3LTM1OGQtNGFhNS04MTU4LTVhOWQzOWNkYzFiYSJ9",
    assignee: "DataCrypt-testing Account",
    created: "10-Oct-2022, 9:15 am",
  },
  {
    id: 2,
    title: "Emma Johnson",
    link: "https://app.powerbi.com/view?r=eyJrIjoiY2YzYWQwZjYtNjJlYS00NzRiLTlkNjQtZDAzNjQzNzYwYTI3IiwidCI6Ijg1N2NiMmM0LTU2OTUtNDQzZi1iYmUwLWZkOWYxNDA5MGM2NCJ9",
    assignee: "Finance Insights",
    created: "14-Nov-2022, 11:30 am",
  },
  {
    id: 3,
    title: "Liam Smith",
    link: "https://app.powerbi.com/view?r=eyJrIjoiZjk5NDYyZTYtMjEwYy00NDg4LWFhZWQtZTk5NTU1N2QyYTYyIiwidCI6ImQwOTIwM2ZiLTc1M2EtNGMxYS1hZDZhLTAxYmU5NTliZjcwZiJ9",
    assignee: "Marketing Tracker",
    created: "21-Dec-2022, 4:45 pm",
  },
  {
    id: 4,
    title: "Olivia Brown",
    link: "https://app.powerbi.com/view?r=eyJrIjoiZDdhZWJjNjEtNmRmZS00ZmMwLTljNDctYTljODgzYjY4NzUwIiwidCI6ImIwOTUzNDc4LTZhZTctNDkzMi1iMWIwLTQxODdmMzI1ZjY2ZiJ9",
    assignee: "Customer Analytics",
    created: "05-Jan-2023, 2:10 pm",
  },
  {
    id: 5,
    title: "Noah Wilson",
    link: "https://app.powerbi.com/view?r=eyJrIjoiYWUzYjQ1NTgtOTc5Mi00ZWRjLTkwZmItZmRmYWI1NDY1YzBiIiwidCI6IjMwYjE5NzVjLTVhNTctNDBhNi1iZmVmLWM1NTI2MzEzZDg0OSJ9",
    assignee: "Sales Dashboard",
    created: "18-Feb-2023, 10:20 am",
  },
  {
    id: 6,
    title: "Ava Martinez",
    link: "https://app.powerbi.com/view?r=eyJrIjoiZDZkYTUyZWItZWY1YS00YzI5LWE2ZjQtYjM2ZGRhMWUwYmYyIiwidCI6ImYwYzU5ZDJjLWEzNGEtNDNmZi1hYmMyLWZlMjM3MDZlZjUyMyJ9",
    assignee: "Retail Overview",
    created: "03-Mar-2023, 1:55 pm",
  },
  {
    id: 7,
    title: "William Davis",
    link: "https://app.powerbi.com/view?r=eyJrIjoiN2ZhYTA0NDYtYmRlYi00YTgwLTgzNzQtNTNkNzAyMGM2MWE4IiwidCI6IjAxNjA2MTRjLWQ3YjUtNDZhNi05ZjIwLTdiNzQ5N2Y2NzlkMiJ9",
    assignee: "Operations Reporting",
    created: "12-Mar-2023, 9:05 am",
  },
  {
    id: 8,
    title: "Sophia Garcia",
    link: "https://app.powerbi.com/view?r=eyJrIjoiYjhkYTg2ODAtOTExYy00NDUzLWE2ZDgtMzZiNmUwMTBiYzRmIiwidCI6IjExMzA4ZDExLTM4ZTQtNDA1NC05MjU0LThhMzYxMmFjM2M1ZCJ9",
    assignee: "HR Dashboard",
    created: "25-Apr-2023, 3:40 pm",
  },
  {
    id: 9,
    title: "James Anderson",
    link: "https://app.powerbi.com/view?r=eyJrIjoiYjA4YzNkNmUtMzEzNC00OGZkLTk3ZGUtZjY2NTQ0NzM0ZDYzIiwidCI6ImM4YzQzNTY0LTY4M2YtNDI0NC1iMmZkLTljZGM5OWI5NzY3ZiJ9",
    assignee: "Executive Report",
    created: "10-May-2023, 12:00 pm",
  },
  {
    id: 10,
    title: "Mia Thomas",
    link: "https://app.powerbi.com/view?r=eyJrIjoiZDNmYTVjMzUtY2YxOS00NzFjLWI1ZDItNDhkMmFlNmNmYjViIiwidCI6IjA4MzYzY2QxLTY0NzUtNDdiNC04OGFjLTUyOGI4ZGU2NzA5MyJ9",
    assignee: "Performance Metrics",
    created: "05-Jun-2023, 8:00 am",
  },
];

type User = (typeof users)[0];

export const ModulesTable = () => {
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
        return <div>{cellValue}</div>;
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
          <span className="font-semibold">Dashboards ({users.length})</span>
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
      <ModulesModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
