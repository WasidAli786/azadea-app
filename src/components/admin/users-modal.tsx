import ModalUI from "../ui/modal-ui";
import { Form } from "@heroui/form";
import InputUI from "../ui/input-ui";
import ButtonUI from "../ui/button-ui";

export interface IUserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
}

const UsersModal = ({ isOpen, onClose, onOpenChange }: IUserModalProps) => {
  return (
    <>
      <ModalUI title="Create User" isOpen={isOpen} onOpenChange={onOpenChange}>
        <Form className="flex flex-col gap-6">
          <div className="grid w-full grid-cols-2 gap-6">
            <InputUI name="name" placeholder="Name" isRequired />
            <InputUI name="email" placeholder="Email" isRequired />
            <InputUI name="department" placeholder="Department" isRequired />
            <InputUI name="password" placeholder="Password" isRequired />
          </div>
          <div className="flex justify-end w-full gap-3">
            <ButtonUI size="sm" variant="flat" onPress={onClose}>
              CANCEL
            </ButtonUI>
            <ButtonUI size="sm" type="submit">
              SAVE
            </ButtonUI>
          </div>
        </Form>
      </ModalUI>
    </>
  );
};

export default UsersModal;
