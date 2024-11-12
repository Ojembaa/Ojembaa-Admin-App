import { ICourierDetails } from "@/common/interfaces";
import React from "react";

const Guarantor = ({ userDetail }: { userDetail: ICourierDetails }) => {
  return (
    <div>
      <div className="mb-3 font-bold">
        <h2 className="text-lg">Guarantor </h2>
      </div>

      <div className="border border-slate-300 rounded-md py-3 px-5">
        {userDetail?.guarantor.map((item) => (
          <div className="grid grid-cols-2 gap-2">
            <div className="font-bold">
              First Name:{" "}
              <span className="font-normal capitalize">{item.firstName}</span>
            </div>
            <div className="font-bold">
              Last Name:{" "}
              <span className="font-normal capitalize"> {item.lastName}</span>
            </div>
            <div className="font-bold">
              Relationship:{" "}
              <span className="font-normal capitalize">
                {item.relationship}
              </span>
            </div>
            <div className="font-bold">
              Occupation:{" "}
              <span className="font-normal capitalize">{item.occupation}</span>
            </div>
            <div className="font-bold">
              Address:{" "}
              <span className="font-normal capitalize">{item.address}</span>
            </div>
            <div className="font-bold">
              Email:{" "}
              <span className="font-normal capitalize"> {item.email}</span>{" "}
            </div>
            <div className="font-bold">
              Phone Number:{" "}
              <span className="font-normal capitalize">{item.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guarantor;
