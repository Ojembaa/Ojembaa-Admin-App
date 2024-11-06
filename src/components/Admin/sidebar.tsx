"use client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DASHBOARD_SIDEBAR_LINK } from "../../common/constants/navigation";
import { useLoginUser } from "@/hooks/useUserLogin";

const linkClasses =
  "flex items-center pl-[2.5rem] gap-4 text-white w-[13.75rem] h-[2.625rem] hover:bg-orange-500 hover:no-underline active:bg-orange-500 rounded-r-[.875rem] hover:border-r-[1px] active:border-r-[1px] text-base";

const SideBar = ({
  isOpen,
  sidebarRef,
}: {
  isOpen: boolean;
  sidebarRef: any;
}) => {
  const { setIsAuthenticated } = useLoginUser();

  const router = useRouter();
  return (
    <div
      ref={sidebarRef}
      className={`${
        isOpen ? "flex" : "hidden"
      } md:flex bg-[#304D30] w-[15.1875rem] pr-[1.4375rem] md:pt-[2.8125rem] pt-[2.5125rem] pb-[4rem] flex-col text-white z-[99999999] md:static absolute h-screen`}
    >
      <div className="flex items-center justify-center gap-5 ml-[3.375rem] w-fit">
        <Image
          src={"/assets/imgs/sda-logo.jpeg"}
          className="rounded-full w-20 h-20"
          alt="icon"
          width={59}
          height={62}
        />
      </div>
      <div className="flex-1 flex flex-col gap-[1.625rem] pt-[3rem]">
        {DASHBOARD_SIDEBAR_LINK.map((item) => (
          <SideBarLink key={item.key} item={item} />
        ))}
      </div>

      <div
        className="flex justify-between items-center w-[6.5625rem] h-[1.5625rem] text-red-500 hover:text-red-600 cursor-pointer ml-[4.3125rem]"
        onClick={() => {
          sessionStorage.clear();
          router.push("/admin/signin");
          setIsAuthenticated(false);
        }}
      >
        <Image
          src={"/assets/svgs/logout-icon.svg"}
          className=""
          alt="icon"
          width={24}
          height={24}
        />
        Log Out
      </div>
    </div>
  );
};

export default SideBar;

function SideBarLink({ item }: { item: any }) {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={classNames(
        pathname === item.path || pathname.includes(item.path)
          ? "bg-orange-500 font-bold border-r-[1px]"
          : " font-normal",
        linkClasses
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}
