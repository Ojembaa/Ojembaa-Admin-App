"use client";
import { useOnClickOutside } from "@/common/hooks/useClickOutside";
import useDisclosure from "@/common/hooks/useDisclosure";
import React, { useRef } from "react";
import Header from "./header";
import SideBar from "./sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { open, isOpen, close } = useDisclosure(true);
  const ref = useRef(null);
  useOnClickOutside(ref, close);

  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden text-black">
      <SideBar isOpen={isOpen} sidebarRef={ref} />

      <div className="flex-1">
        <Header open={open} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
