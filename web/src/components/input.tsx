import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { Warning } from "@phosphor-icons/react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = "text", placeholder = "", required = false, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const isFilled = !!rest.value;

    const baseBorder = "border";
    const baseText = "text-xs px-4 h-12 rounded-lg w-full";
    const baseLabel = "text-[10px] uppercase font-normal leading-[14px]";

    const borderColor = error
      ? "border-danger"
      : isFocused
      ? "border-blue-base"
      : "border-gray-300";

    const labelColor = error
      ? "text-danger"
      : isFocused || isFilled
      ? "text-blue-base"
      : "text-gray-500";

    return (
      <div className="w-full flex flex-col gap-2 group">
        {label && (
          <label htmlFor={label} className={`${baseLabel} ${labelColor}`}>
            {label}
          </label>
        )}

        <input
          id={label}
          ref={ref}
          type={type}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${baseText} ${baseBorder} ${borderColor} ${
            error ? "text-danger" : "text-gray-800"
          } focus:outline-none`}
          {...rest}
        />

        {error && (
          <span className="text-gray-500 text-sm flex items-center gap-1">
            <Warning size={16} weight="thin" className="text-danger" />
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
