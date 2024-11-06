"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton({
  text,
  width,
  height,
}: {
  text?: string;
  width?: number;
  height?: number;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center font-poppins text-xl gap-x-4 cursor-pointer w-fit">
      <div onClick={() => router.back()}>
        <Image
          src={"/assets/svgs/back-icon.svg"}
          className=""
          alt="icon"
          width={width ?? 39}
          height={height ?? 33.265}
        />
      </div>
      {text}
    </div>
  );
}
