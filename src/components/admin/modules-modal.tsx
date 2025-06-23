import ModalUI from "../ui/modal-ui";
import { Form } from "@heroui/form";
import InputUI from "../ui/input-ui";
import ButtonUI from "../ui/button-ui";

export interface IUserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
}

const ModulesModal = ({ isOpen, onClose, onOpenChange }: IUserModalProps) => {
  return (
    <>
      <ModalUI
        title="Create Dashboard"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <Form className="flex flex-col gap-6">
          <div className="flex w-full gap-6">
            <InputUI name="title" placeholder="Title" isRequired />
            <InputUI name="assignee" placeholder="Assign To" isRequired />
          </div>
          <InputUI name="link" placeholder="Link" isRequired />
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

export default ModulesModal;
