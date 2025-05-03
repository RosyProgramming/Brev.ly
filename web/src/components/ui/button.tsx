import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  label: string;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "medium",
  label,
  icon,
  disabled = false,
  onClick,
  className,
  ...props
}: ButtonProps) {
  const base = "flex flex-row justify-center items-center transition-all duration-300";

  const sizeStyles = {
    small: 'h-8 w-8',
    medium: 'h-8 w-[100px]',
    large: 'h-12',
  };

  const stateStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const primaryStyles = "w-full sm:w-80 h-12 bg-blue-base hover:bg-blue-dark text-white px-5 gap-3 rounded-lg";
  const secondaryStyles = "bg-gray-200 text-gray-500 border border-transparent hover:border-blue-base rounded-[4px] px-2 gap-1 h-[32px] text-[12px] font-semibold leading-4";

  const variantStyles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizeStyles[size]} ${variantStyles} ${stateStyles} ${className ?? ""}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span
        className={
          variant === "secondary"
            ? "w-[62px] text-[12px] font-semibold text-gray-500 leading-4"
            : "text-white text-md"
        }
      >
        {label}
      </span>
    </button>
  );
}
