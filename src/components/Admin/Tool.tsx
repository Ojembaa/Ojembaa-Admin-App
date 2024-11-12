import { ICourierDetails } from "@/common/interfaces";
import React from "react";

const Tool = ({ userDetail }: { userDetail: ICourierDetails }) => {
  return (
    <div>
      <div className="mb-3 font-bold">
        <h2 className="text-lg">Tool </h2>
      </div>

      <div className="border border-slate-300 rounded-md py-3 px-5">
        {userDetail?.tools &&
          userDetail.tools.map((item) => (
            <>
              <div className="font-bold">
                Vehicle Type:{" "}
                <span className="font-normal capitalize">
                  {item?.vehicleType}
                </span>
              </div>
              <div className="flex justify-between my-5 space-x-8">
                <div
                  className="border border-slate-300 rounded-md w-full p-7  h-52"
                  style={{
                    backgroundImage: `url(${item?.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                <div
                  className="border border-slate-300 rounded-md w-full p-7 h-52"
                  style={{
                    backgroundImage: `url(${item?.proof})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Tool;
