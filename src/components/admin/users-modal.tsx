import ModalUI from "../ui/modal-ui";
import { Form } from "@heroui/form";
import InputUI from "../ui/input-ui";
import ButtonUI from "../ui/button-ui";

export interface IUserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonLoading: boolean;
  defaultValues?: any;
}

const UsersModal = ({
  isOpen,
  onClose,
  onOpenChange,
  handleSubmit,
  buttonLoading,
  defaultValues,
}: IUserModalProps) => {
  return (
    <>
      <ModalUI title="Create User" isOpen={isOpen} onOpenChange={onOpenChange}>
        <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid w-full grid-cols-2 gap-6">
            <InputUI
              name="name"
              placeholder="Name"
              isRequired
              defaultValue={defaultValues?.name}
            />
            <InputUI
              name="email"
              placeholder="Email"
              isRequired
              defaultValue={defaultValues?.email}
            />
            <InputUI
              name="department"
              placeholder="Department"
              isRequired
              defaultValue={defaultValues?.department}
            />
            <InputUI
              name="password"
              placeholder="Password"
              isRequired
              defaultValue={defaultValues?.password}
            />
          </div>
          <div className="flex justify-end w-full gap-3">
            <ButtonUI size="sm" variant="flat" onPress={onClose}>
              CANCEL
            </ButtonUI>
            <ButtonUI size="sm" type="submit" isLoading={buttonLoading}>
              SAVE
            </ButtonUI>
          </div>
        </Form>
      </ModalUI>
    </>
  );
};

export default UsersModal;
