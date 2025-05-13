import { Button as ButtonAntd, ButtonProps as AntdButtonProps } from "antd";

interface ButtonProps extends AntdButtonProps {
  name: string;
}

export const Button = (props: Readonly<ButtonProps>) => {
  return <ButtonAntd {...props}>{props.name}</ButtonAntd>;
};
