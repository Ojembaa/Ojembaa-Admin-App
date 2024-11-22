import { LockOpenIcon } from "@heroicons/react/20/solid";
import {
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowPathRoundedSquareIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export const DASHBOARD_SIDEBAR_LINK = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: (
      <Image
        src={"/assets/svgs/dashboard-icon.svg"}
        className=""
        alt="icon"
        width={27}
        height={27}
      />
    ),
  },

  {
    key: "users",
    label: "Users",
    path: "/admin/users",
    icon: <UserGroupIcon width={30.75} height={32} />,
  },

  {
    key: "categories",
    label: "Categories",
    path: "/admin/categories",
    icon: <RectangleGroupIcon width={30.75} height={32} />,
  },

  {
    key: "reconciliation",
    label: "Reconciliation",
    path: "/admin/reconciliation",
    icon: <ArrowPathRoundedSquareIcon width={30.75} height={32} />,
  },
  {
    key: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <Cog6ToothIcon className="h-6 w-6" />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINK = [
  {
    key: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <Cog6ToothIcon className=" h-6 w-6" />,
  },
  {
    key: "permission",
    label: "Permission",
    path: "/admin/permission",
    icon: <LockOpenIcon className="h-6 w-6" />,
  },
];
