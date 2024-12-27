import React from "react";
import { Spinner } from "../Common/Spinner";
import { useRouter } from "next/navigation";

const DeliveryList = ({
  loading,
  deliveriesData,
}: {
  loading: boolean;
  deliveriesData: any;
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="font-semibold"> Deliveries</div>

      <div className="mb-4 overflow-auto rounded-lg">
        <table className="w-full">
          <thead className="border-b border-b-gray-400 borer">
            <tr className="">
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                ID
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Package Name
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Receiver Name
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Pickup Address
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Delivery Address
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Distance
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-y-50 cursor-pointer ">
            {!loading &&
              deliveriesData?.map((data: any, idx: number) => {
                return (
                  <tr
                    className="hover:bg-orange-200"
                    key={idx}
                    onClick={() =>
                      router.push(`/admin/dashboard/deliveryDetail/${data.id}`)
                    }
                  >
                    <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                      {idx + 1}
                    </td>
                    <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                      {data.package.description}
                    </td>
                    <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                      {data.package.receiverName}
                    </td>
                    <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                      {data.pickupAddress}
                    </td>
                    <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                      {data.deliveryAddress}
                    </td>
                    <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                      {data?.distance}{" "}
                    </td>
                    <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                      {data.status}{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {loading ? (
          <div className="flex items-center justify-center h-96">
            {" "}
            <Spinner color="orange" />
          </div>
        ) : (
          deliveriesData?.length === 0 && (
            <div className="flex items-center justify-center font-bold h-96">
              No Data found!
            </div>
          )
        )}
      </div>
      {/* <Pagination  /> */}
    </div>
  );
};

export default DeliveryList;
