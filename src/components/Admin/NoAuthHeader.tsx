"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NoAuthHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [toggleHamburger, setTogglehambugger] = useState(false);

  const handlehamburgerToogle = () => {
    setShowMenu((preshowMenu) => !preshowMenu);
    setTogglehambugger((prevToggleHamburger) => !prevToggleHamburger);
  };

  return (
    <div className="sticky top-0 z-20">
      <header className="px-8 py-3 mx-auto text-white border-b border-slate-200 md:px-16 bg-[#304D30]">
        <nav className="flex items-center justify-between font-semibold ">
          <div>
            <Image
              src="/assets/imgs/sda-logo.jpeg"
              alt="Church-logo"
              width={50}
              height={10}
              className="h-15 w-15 rounded-full"
            />
          </div>

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

          {/* Hamburger button goes here */}
          <div className="md:hidden">
            <button
              onClick={handlehamburgerToogle}
              className={`${
                !toggleHamburger ? "open" : ""
              } z-40 block hamburger md:hidden focus:outline-none`}
              id="menu-btn"
              type="button"
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </div>
        </nav>
        {/*  Mobile Menu Goes shere */}
        <div
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
        </div>
      </header>
    </div>
  );
};

export default NoAuthHeader;
