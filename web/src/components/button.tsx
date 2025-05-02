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
  const base = "flex flex-row justify-center items-center text-md px-5 gap-3 sm:w-80 h-12 rounded-lg transition-opacity duration-300 order-2 self-stretch";

  const sizeStyles = {
    small: 'h-8 w-8',
    medium: 'h-8 w-32 font-semibold text-[12px]',
    large: 'h-12 w-79 text-md',
  };

  const opacityStyles = isLoading || disabled
    ? "opacity-50 cursor-not-allowed"
    : "opacity-100 hover:opacity-80";

  const primaryStyles = "bg-blue-base text-white";
  const secondaryStyles = "bg-gray-200 border border-transparent hover:border-blue-base text-black";

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
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
