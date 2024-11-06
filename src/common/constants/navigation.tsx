import { LockOpenIcon } from "@heroicons/react/20/solid";
import {
  Cog6ToothIcon,
  InformationCircleIcon,
  NewspaperIcon,
  UserGroupIcon,
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
    key: "bulletin",
    label: "Bulletin",
    path: "/admin/bulletin",
    icon: <NewspaperIcon width={30.75} height={32} />,
  },

  {
    key: "announcement",
    label: "Announcement",
    path: "/admin/announcement",
    icon: <InformationCircleIcon width={30.75} height={32} />,
  },

  {
    key: "users",
    label: "User",
    path: "/admin/user",
    icon: <UserGroupIcon width={30.75} height={32} />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINK = [
  {
    key: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <Cog6ToothIcon className="text-white h-6 w-6" />,
  },
  {
    key: "permission",
    label: "Permission",
    path: "/admin/permission",
    icon: <LockOpenIcon className="text-white h-6 w-6" />,
  },
];
