"use client";
import Image from "next/image";
import Link from "next/link";

const NoAuthHeader = () => {
  return (
    <div className="sticky top-0 z-20">
      <header className="px-8 py-3 mx-auto  border-b border-black md:px-16 bg-[#F56118]">
        <nav className="flex items-center justify-between font-semibold ">
          <div>
            <Image
              src="/assets/imgs/logo/ojembaa.jpeg"
              alt="Church-logo"
              width={60}
              height={20}
              className="h-15 w-15 rounded-full"
            />
          </div>

          <div className="items-center hidden h-10 font-serif md:flex md:space-x-8 text-sm">
            <div className="group">
              <Link href="/">Sign In</Link>
              <div className="mx-2 group-hover:border-b group-hover:border-white"></div>
            </div>
            <div className="group">
              <Link href="/admin/register">Register</Link>
              <div className="mx-2 group-hover:border-b group-hover:border-white"></div>
            </div>
          </div>

          {/* Hamburger button goes here */}
        </nav>
        {/*  Mobile Menu Goes shere */}
        {/* <div
          id="menu"
          className={`${
            showMenu
              ? "hidden"
              : "md:hidden flex absolute top-0 bottom-0 left-0 flex-col self-end w-full min-h-screen py-1 pt-16 pl-12 space-y-3 text-lg text-orange-400 uppercase bg-[#304D30]  z-10 "
          }`}
        >
          <div className="items-center hidden h-10 font-serif md:flex md:space-x-8 text-sm">
            <div className="group">
              <Link href="/admin/signin">Sign In</Link>
              <div className="mx-2 group-hover:border-b group-hover:border-white"></div>
            </div>
            <div className="group">
              <Link href="/admin/register">Register</Link>
              <div className="mx-2 group-hover:border-b group-hover:border-white"></div>
            </div>
          </div>
        </div> */}
      </header>
    </div>
  );
};

export default NoAuthHeader;
