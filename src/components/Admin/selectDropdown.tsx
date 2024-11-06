import { useOnClickOutside } from "@/common/hooks/useClickOutside";
import useDisclosure from "@/common/hooks/useDisclosure";
import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {
  placeholder?: string;
  selectedOption?: string;
  options: string[];
  onClick?: (a: string) => void;
  disabled?: boolean;
};

export default function SelectDropdown({
  placeholder,
  selectedOption,
  options,
  onClick,
  disabled,
}: Readonly<Props>) {
  const [value, setValue] = useState<string | null>(selectedOption ?? null);
  const { isOpen, close, toggle } = useDisclosure();
  const ref = useRef(null);
  useOnClickOutside(ref, close);

  const selectOption = (a: any) => {
    setValue(a);
    close();
    if (onClick) onClick(a);
  };

  return (
    <div
      ref={ref}
      className=" relative inline-block text-left w-full h-full font-poppins"
    >
      <div onClick={() => toggle()} className="h-full w-full">
        <button
          type="button"
          disabled={disabled}
          className="inline-flex cursor-pointer items-center justify-between h-full w-full p-5 rounded-xl border border-black font-poppins text-black focus:outline-none capitalize"
        >
          {value ?? placeholder ?? "select an option"}
          <Image
            src={"/assets/svgs/less-than-icon.svg"}
            className=" -rotate-90"
            alt="icon"
            width={30}
            height={32}
          />
        </button>
      </div>

      <div
        className={`${
          !isOpen && " hidden"
        } absolute right-0 z-30 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 capitalize`}
      >
        <div className="py-1 cursor-pointer">
          {options.map((a) => {
            return (
              <p
                onClick={() => {
                  selectOption(a);
                }}
                className=" hover:bg-[#D8D4E533] cursor-pointer text-text-secondary block pl-4 py-2 text-sm"
              >
                {a}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
