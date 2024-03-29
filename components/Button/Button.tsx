import { SBtn, SBtnDelete } from "./Button.styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }

export  const Btn: React.FC<ButtonProps> = ({ children, ...props }) => {
    return <SBtn type='button' {...props}> {children}</SBtn>;
};

export const BtnDelete: React.FC<ButtonProps> = ({ children, ...props }) => {
    return <SBtnDelete type='button' {...props}> {children}</SBtnDelete>;
};



