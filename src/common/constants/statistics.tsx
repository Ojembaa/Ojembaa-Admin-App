import Image from "next/image";

export const Statistics = [
  {
    key: "sales",
    title: "Total sales",
    amount: "N 11,050",
    icon: (
      <Image
        src={"/assets/svgs/sales-graph-icon.svg"}
        className=""
        alt="icon"
        width={39}
        height={37}
      />
    ),
  },
  {
    key: "total-orders",
    title: "Total orders",
    amount: 22,
    icon: (
      <Image
        src={"/assets/svgs/orders-graph-icon.svg"}
        className=""
        alt="icon"
        width={45}
        height={45}
      />
    ),
  },
  {
    key: "new-customers",
    title: "New customers",
    amount: 15,
    icon: (
      <Image
        src={"/assets/svgs/customers-graph-icon.svg"}
        className=""
        alt="icon"
        width={34.436}
        height={36.248}
      />
    ),
  },
  {
    key: "completed-orders",
    title: "Completed orders",
    amount: 6,
    icon: (
      <Image
        src={"/assets/svgs/completed-orders-graph-icon.svg"}
        className=""
        alt="icon"
        width={34}
        height={41.503}
      />
    ),
  },
];
