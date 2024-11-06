import { ReactNode } from "react";

export default function Container({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={` ${className} h-[calc(100vh-5.3125rem)] max-h-[calc(100vh-5.3125rem)] max-w-full overflow-y-auto w-full`}
    >
      {children}
    </div>
  );
}
