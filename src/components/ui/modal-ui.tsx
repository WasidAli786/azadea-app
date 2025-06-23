"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalProps,
  ModalHeader,
} from "@heroui/modal";

const ModalUI = ({
  children,
  title,
  isOpen,
  onOpenChange,
  size = "3xl",
  scrollBehavior = "outside",
  className,
}: ModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        classNames={{
          body: "p-5",
          header: "border-b",
        }}
        size={size}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        className={className}
        isDismissable={false}
      >
        <ModalContent>
          {title && (
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          )}
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUI;
