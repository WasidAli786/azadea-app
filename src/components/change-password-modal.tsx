import React from "react";
import ModalUI from "./ui/modal-ui";
import { Form } from "@heroui/form";
import InputUI from "./ui/input-ui";
import ButtonUI from "./ui/button-ui";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../context/user-context";
import { showError, showSuccess } from "../lib/toast";
import { axiosInstance } from "../lib/axios";

export interface IPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const ChangePasswordModal = ({
  isOpen,
  onClose,
  onOpenChange,
}: IPasswordModalProps) => {
  const { logout } = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post("/auth/change-password", payload);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccess(data?.message || "Password updated successfully");
      onClose();
      logout();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update password";
      showError(message);
    },
  });

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutate(data);
  };
  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Change Password"
      >
        <Form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
          <InputUI
            name="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            size="lg"
            labelPlacement="outside"
            isRequired
          />
          <InputUI
            name="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            size="lg"
            labelPlacement="outside"
            isRequired
          />
          <ButtonUI size="lg" fullWidth type="submit" isLoading={isPending}>
            Change Password
          </ButtonUI>
        </Form>
      </ModalUI>
    </>
  );
};

export default ChangePasswordModal;
