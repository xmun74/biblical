import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant: 'contained' | 'outlined';
    onClick?: MouseEventHandler<HTMLButtonElement>;
};
declare const Button: (props: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
