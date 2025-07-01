import ModalUI from "../ui/modal-ui";
import { Form } from "@heroui/form";
import InputUI from "../ui/input-ui";
import ButtonUI from "../ui/button-ui";
import { Select, SelectItem } from "@heroui/select";
import ImageUploader from "../ui/image-uploader";

export interface IUserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonLoading: boolean;
  defaultValues?: any;
  dashboardAssignee?: any;
  selectedAssignees?: any;
  setSelectedAssignees: React.Dispatch<React.SetStateAction<any>>;
  imageBase64: string | null;
  setImageBase64: React.Dispatch<React.SetStateAction<string | null>>;
}

const ModulesModal = ({
  isOpen,
  onClose,
  onOpenChange,
  handleSubmit,
  buttonLoading,
  defaultValues,
  dashboardAssignee,
  selectedAssignees,
  setSelectedAssignees,
  imageBase64,
  setImageBase64,
}: IUserModalProps) => {
  return (
    <>
      <ModalUI
        title="Create Dashboard"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid w-full grid-cols-2 gap-6">
            <InputUI
              name="title"
              placeholder="Title"
              isRequired
              defaultValue={defaultValues?.title}
            />
            <InputUI
              name="description"
              placeholder="Description"
              isRequired
              defaultValue={defaultValues?.description}
            />
            <Select
              name="assignee"
              placeholder="Select assignee"
              selectionMode="multiple"
              isRequired
              aria-label="User status selection"
              selectedKeys={selectedAssignees}
              onSelectionChange={(keys) => {
                setSelectedAssignees(new Set(Array.from(keys) as string[]));
              }}
            >
              {dashboardAssignee?.map((item: any) => (
                <SelectItem key={item?._id}>{item?.label}</SelectItem>
              ))}
            </Select>
            <InputUI
              name="link"
              placeholder="Link"
              isRequired
              defaultValue={defaultValues?.link}
            />
          </div>
          <ImageUploader onChange={setImageBase64} defaultImage={imageBase64} />
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

export default ModulesModal;
