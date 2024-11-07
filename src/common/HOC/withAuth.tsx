"use client";
import { getAuthFromLocal } from "@/services/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

/*
Guide: https://www.youtube.com/watch?v=cj1trlsQ0is&list=PLN2XTW9cUhPfVDcATcGV0wsffD7Kajzpd&index=5&t=967s
*/
export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const session = getAuthFromLocal();
    useEffect(() => {
      if (!session) {
        redirect("/");
      }
    }, []);

    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}
