import { Button, ButtonProps } from "@heroui/button";

const ButtonUI = ({
  children,
  color = "primary",
  className,
  radius = "sm",
  ...props
}: ButtonProps) => {
  return (
    <>
      <Button
        color={color}
        radius={radius}
        className={`font-medium ${className}`}
        {...props}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonUI;
