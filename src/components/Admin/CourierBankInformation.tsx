import { ICourierDetails } from "@/common/interfaces";
import React from "react";

const CourierBankInformation = ({
  userDetail,
}: {
  userDetail: ICourierDetails;
}) => {
  return (
    <div>
      <div className="mb-3 font-bold">
        <h2 className="text-lg">Bank Information </h2>
      </div>

      <div className="border border-slate-300 rounded-md py-3 px-5">
        {userDetail?.bankInformation.map((item) => (
          <div className="grid grid-cols-2 gap-2">
            <div className="font-bold">
              Name: <span className="font-normal capitalize">{item?.name}</span>
            </div>
            <div className="font-bold">
              Account Number:{" "}
              <span className="font-normal capitalize">{item?.number}</span>
            </div>
            <div className="font-bold">
              BVN: <span className="font-normal capitalize">{item?.bvn}</span>
            </div>
            <div className="font-bold">
              Code:{" "}
              <span className="font-normal capitalize"> {item?.code}</span>
            </div>
            <div className="font-bold">
              Holder:{" "}
              <span className="font-normal capitalize">{item?.holder}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourierBankInformation;
