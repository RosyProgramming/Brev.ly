import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SpinnerGap } from "@phosphor-icons/react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  label: string;
  icon?: ReactNode;
  isLoading?: boolean;
};

export function Button({
  variant = "primary",
  size = "medium",
  label,
  icon,
  isLoading = false,
  disabled = false,
  onClick,
  className,
  ...props
}: ButtonProps) {
  const base = " flex flex-row justify-center items-center ";

  const sizeStyles = {
    small: 'h-8 w-8',
    medium: 'h-8 w-[100px]',
    large: 'h-12 w-79',
  };
  

  const opacityStyles = isLoading || disabled
    ? "opacity-50 cursor-not-allowed"
    : "opacity-100 hover:opacity-80";

  const primaryStyles = "bg-blue-base px-5 gap-3 sm:w-80 h-12 rounded-lg transition-opacity duration-300 order-2 self-stretch";
  const secondaryStyles = "px-2 gap-1 mx-auto bg-gray-200 border border-transparent hover:border-blue-base text-black";

  const variantStyles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button
      type="button"
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`${base} ${sizeStyles[size]} ${variantStyles} ${opacityStyles} ${className ?? ""}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2 text-md">
          <SpinnerGap size={20} className="animate-spin" />
          Salvando...
        </span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span 
            className={variant === "secondary" 
              ? " w-[62px] text-[12px] font-semibold text-gray-500 leading-4 "
              : "text-white text-md"}
          >{label}</span>
        </>
      )}
    </button>
  );
}
