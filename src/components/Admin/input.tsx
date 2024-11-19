import React, { useImperativeHandle } from "react";

interface Props {
  type: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    { type, defaultValue, className, label, disabled = false, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div>
        <label className="font-semibold text-sm">{label}</label>
        <input
          ref={inputRef}
          className={` ${className} h-3 w-full p-5 rounded-md border border-gray-300 font-poppins text-black focus:outline-none
        focus:border-gray-500`}
          type={type}
          onWheel={(e) => e.currentTarget.blur()}
          disabled={disabled}
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
