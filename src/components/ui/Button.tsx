import { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ElementType | undefined;
  children?: ReactNode;
  className?: string;
}

const Button = ({ icon: Icon, children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md ${className}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;
