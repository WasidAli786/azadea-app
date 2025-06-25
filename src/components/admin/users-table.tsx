"use client";

import React, { useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/src/hooks/use-debounce";
import { Spinner } from "@heroui/spinner";
import { formatDateTime } from "@/src/utils/format-date";
import { axiosInstance } from "@/src/lib/axios";
import { showError, showSuccess } from "@/src/lib/toast";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "PASSWORD", uid: "password" },
  { name: "CREATED", uid: "created" },
  { name: "ACTIONS", uid: "actions" },
];

export const UsersTable = () => {
  const LIMIT = 5;
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);
  const debouncedSearch = useDebounce(filterValue, 400);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["users", debouncedSearch, page, LIMIT],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/admin/user", {
          params: {
            search: debouncedSearch,
            page,
            limit: LIMIT,
          },
        });
        return res.data;
      } catch (err: any) {
        showError(err?.response?.data?.message || "Failed to fetch users");
        throw err;
      }
    },
  });

  const users = data?.users || [];
  const total = data?.pagination?.total || 0;
  const pages = data?.pagination?.pages || 1;

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post("/admin/user", data);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccess(data?.message || "User created successfully");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      showError(err?.response?.data?.message || "Failed to create user");
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const res = await axiosInstance.put(`/admin/user/${id}`, updates);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccess(data?.message || "User updated successfully");
      onClose();
      setEditingUser(null);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      showError(err?.response?.data?.message || "Failed to update user");
    },
  });

  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/admin/user/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccess(data?.message || "User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      showError(err?.response?.data?.message || "Failed to delete user");
    },
  });

  const renderCell = (user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof typeof user];
    switch (columnKey) {
      case "created":
        return formatDateTime(cellValue as string);
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit user">
              <span
                onClick={() => {
                  setEditingUser(user);
                  onOpen();
                }}
                className="cursor-pointer text-default-400"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip content="Delete user" color="danger">
              <span
                onClick={() => deleteUser(user._id)}
                className="cursor-pointer text-danger"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (editingUser) {
      updateUser({ id: editingUser._id, updates: data });
    } else {
      createUser(data);
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse items-end justify-between gap-4 md:flex-row">
        <InputUI
          isClearable
          className="w-full md:max-w-60"
          placeholder="Search by title..."
          startContent={<SearchIcon className="text-2xl" />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={(val) => {
            setFilterValue(val);
            setPage(1);
          }}
        />
        <div className="flex gap-3">
          <ButtonUI
            size="sm"
            color="primary"
            isIconOnly
            className={`px-5 ${isFetching && "cursor-not-allowed"}`}
            isLoading={isFetching}
            onPress={() => refetch()}
          >
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
      <div className="py-4 font-semibold">Users ({total})</div>
      <Table
        isHeaderSticky
        aria-label="User Table"
        bottomContent={
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
            hidden={isLoading}
          />
        }
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent="No users found"
          items={users}
        >
          {(item: any) => (
            <TableRow key={item?._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <UsersModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEditingUser(null);
        }}
        onOpenChange={onOpenChange}
        handleSubmit={handleSubmit}
        buttonLoading={isCreating || isUpdating}
        defaultValues={editingUser}
      />
    </>
  );
};
