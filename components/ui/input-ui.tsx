import { Input, InputProps } from "@heroui/input";

const InputUI = ({ radius = "sm", ...props }: InputProps) => {
  return (
    <>
      <Input radius={radius} {...props} />
    </>
  );
};

export default InputUI;
