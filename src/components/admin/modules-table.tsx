"use client";

import type { SVGProps } from "react";

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
import { useDisclosure } from "@heroui/modal";
import ModulesModal from "./modules-modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/src/hooks/use-debounce";
import { Spinner } from "@heroui/spinner";
import { formatDateTime } from "@/src/utils/format-date";
import { axiosInstance } from "@/src/lib/axios";
import { showError, showSuccess } from "@/src/lib/toast";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
  { name: "TITLE", uid: "title" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "LINK", uid: "link" },
  { name: "ASSIGNED TO", uid: "assignee" },
  { name: "CREATED", uid: "created" },
  { name: "ACTIONS", uid: "actions" },
];

export const ModulesTable = () => {
  const LIMIT = 5;
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [page, setPage] = useState(1);
  const [selectedAssignees, setSelectedAssignees] = useState<Set<string>>(
    new Set()
  );
  const [filterValue, setFilterValue] = useState("");
  const [editingModule, setEditingModule] = useState<any>(null);
  const debouncedSearch = useDebounce(filterValue, 400);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["dashboards", debouncedSearch, page, LIMIT],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/admin/dashboard", {
          params: {
            search: debouncedSearch,
            page,
            limit: LIMIT,
          },
        });
        return res.data;
      } catch (err: any) {
        showError(err?.response?.data?.message || "Failed to fetch dashboards");
        throw err;
      }
    },
  });

  const dashboards = data?.cards || [];
  const total = data?.pagination?.total || 0;
  const pages = data?.pagination?.pages || 1;

  const { data: dashboardAssignee } = useQuery({
    queryKey: ["dashboards", "assignees"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/admin/user", {
          params: { all: true },
        });
        return res.data;
      } catch (err: any) {
        showError(err?.response?.data?.message || "Failed to fetch assignees");
        throw err;
      }
    },
    select: (data) => {
      return (
        data?.users?.map((item: any) => ({
          _id: item?._id,
          label: item?.name,
        })) || []
      );
    },
  });

  const { mutate: createDashboard, isPending: isCreating } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post("/admin/dashboard", data);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccess(data?.message || "Dashboard created successfully");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
    onError: (err: any) => {
      showError(err?.response?.data?.message || "Failed to create dashboard");
    },
  });

  const { mutate: updateDashboard, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const res = await axiosInstance.put(`/admin/dashboard/${id}`, updates);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccess(data?.message || "Dashboard updated successfully");
      onClose();
      setEditingModule(null);
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
    onError: (err: any) => {
      showError(err?.response?.data?.message || "Failed to update dashboard");
    },
  });

  const { mutate: deleteDashboard } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/admin/dashboard/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccess(data?.message || "Dashboard deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
    onError: (err: any) => {
      showError(err?.response?.data?.message || "Failed to delete dashboard");
    },
  });

  const renderCell = (dashboard: any, columnKey: React.Key) => {
    const cellValue = dashboard[columnKey as keyof typeof dashboard];
    switch (columnKey) {
      case "assignee":
        if (!cellValue || !Array.isArray(cellValue) || cellValue.length === 0) {
          return "No assignee";
        }

        const assigneeLabels = cellValue
          .map((assigneeId: string) => {
            const assignee = dashboardAssignee?.find(
              (item: any) => item._id === assigneeId
            );
            return assignee?.label || assigneeId;
          })
          .filter(Boolean);

        return assigneeLabels.length > 0
          ? assigneeLabels.join(", ")
          : "No assignee";
      case "created":
        return formatDateTime(cellValue as string);
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit dashboard">
              <span
                onClick={() => handleEdit(dashboard)}
                className="cursor-pointer text-default-400"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip content="Delete dashboard" color="danger">
              <span
                onClick={() => deleteDashboard(dashboard._id)}
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
    const updatedData = {
      ...data,
      assignee: Array.from(selectedAssignees),
    };
    if (editingModule) {
      updateDashboard({ id: editingModule._id, updates: updatedData });
    } else {
      createDashboard(updatedData);
    }
  };

  const handleEdit = (dashboard: any) => {
    setEditingModule(dashboard);
    onOpen();
    setSelectedAssignees(dashboard?.assignee);
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
      <div className="py-4 font-semibold">Dashboards ({total})</div>
      <Table
        isHeaderSticky
        aria-label="Dashboard Table"
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
        classNames={{
          wrapper: "max-h-[382px]",
          th: ["text-black dark:text-white"],
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent="No dashboards found"
          items={dashboards}
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

      <ModulesModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEditingModule(null);
        }}
        onOpenChange={onOpenChange}
        handleSubmit={handleSubmit}
        buttonLoading={isCreating || isUpdating}
        defaultValues={editingModule}
        dashboardAssignee={dashboardAssignee}
        selectedAssignees={selectedAssignees}
        setSelectedAssignees={setSelectedAssignees}
      />
    </>
  );
};
