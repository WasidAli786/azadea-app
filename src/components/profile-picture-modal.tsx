"use client";

import React, { useState, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Avatar } from "@heroui/avatar";
import { Camera, Upload, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ButtonUI from "./ui/button-ui";
import { useUser } from "@/src/context/user-context";
import { showSuccess, showError } from "@/src/lib/toast";
import { axiosInstance } from "@/src/lib/axios";

interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const ProfilePictureModal = ({
  isOpen,
  onClose,
  onOpenChange,
}: ProfilePictureModalProps) => {
  const { user, refetchUser } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // React Query mutation for uploading profile picture
  const { mutate, isPending } = useMutation({
    mutationFn: async (profilePicture: string) => {
      const res = await axiosInstance.post("/user/profile-picture", {
        profilePicture,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      await refetchUser();
      showSuccess(data.message || "Profile picture updated successfully");
      handleClose();
    },
    onError: (error: any) => {
      console.error("Error uploading profile picture:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to upload profile picture";
      showError(message);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showError("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showError("Please select a file first");
      return;
    }

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        mutate(base64);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error reading file:", error);
      showError("Failed to read file");
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const handleOpenChange = () => {
    if (!isPending) {
      onOpenChange();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} size="md">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Update Profile Picture
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4 items-center">
            {/* Current profile picture */}
            <div className="flex flex-col gap-2 items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Current Picture
              </span>
              <Avatar
                src={user?.profilePicture || undefined}
                size="lg"
                className="w-20 h-20"
                showFallback
                name={user?.name || user?.email}
              />
            </div>

            {/* File upload area */}
            <div className="w-full">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="p-6 text-center rounded-lg border-2 border-gray-300 border-dashed dark:border-gray-600">
                {previewUrl ? (
                  <div className="flex flex-col gap-4 items-center">
                    <Avatar
                      src={previewUrl}
                      size="lg"
                      className="w-20 h-20"
                      showFallback
                    />
                    <div className="flex gap-2">
                      <ButtonUI
                        size="sm"
                        color="primary"
                        onPress={() => fileInputRef.current?.click()}
                        isDisabled={isPending}
                      >
                        <Upload size={16} className="mr-2" />
                        Change
                      </ButtonUI>
                      <ButtonUI
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        isDisabled={isPending}
                      >
                        <X size={16} className="mr-2" />
                        Remove
                      </ButtonUI>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 items-center">
                    <Camera size={48} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                    <ButtonUI
                      color="primary"
                      variant="flat"
                      onPress={() => fileInputRef.current?.click()}
                      isDisabled={isPending}
                    >
                      <Upload size={16} className="mr-2" />
                      Choose File
                    </ButtonUI>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ButtonUI
            color="danger"
            variant="light"
            onPress={handleClose}
            isDisabled={isPending}
          >
            Cancel
          </ButtonUI>
          <ButtonUI
            color="primary"
            onPress={handleUpload}
            isLoading={isPending}
            isDisabled={!selectedFile}
          >
            {isPending ? "Uploading..." : "Upload"}
          </ButtonUI>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfilePictureModal;
