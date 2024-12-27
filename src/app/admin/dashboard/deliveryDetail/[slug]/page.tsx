"use client";
import BackButton from "@/components/Admin/backButton";
import Container from "@/components/Admin/Container";
import AdminLayout from "@/components/Admin/layout";
import { Spinner } from "@/components/Common/Spinner";
import { useGetRecentDelivery } from "@/hooks/useRecentDelivery";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const DeliverViewPage = ({ params }: { params: { slug: string } }) => {
  const deliveryId = params.slug;
  const [deliveryDetail, setDeliveryDetail] = useState<any>();
  const { fetchRecentDelivery, recentDelivery, loading } =
    useGetRecentDelivery();

  console.log(deliveryDetail, "delivery detail");

  useEffect(() => {
    fetchRecentDelivery();
  }, []);

  useEffect(() => {
    if (recentDelivery) {
      const delivery = recentDelivery.filter((item) => item.id === deliveryId);
      setDeliveryDetail(delivery[0]);
    }
  }, [recentDelivery]);

  // useEffect(() => {}, []);
  return (
    <AdminLayout>
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        <div>
          <div className="flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
            <BackButton
              text="Deliveries Details
"
            />
          </div>
          <div className="py-2">
            <hr />
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-96">
              {" "}
              <Spinner color="orange" />
            </div>
          ) : (
            <div>
              <div className="flex flex-row-reverse gap-3">
                <div
                  className={`${
                    deliveryDetail?.status === "COMPLETED"
                      ? "bg-green-500 border-green-500 "
                      : "border-slate-500"
                  }
                  px-3 rounded-md border`}
                >
                  {deliveryDetail?.status}
                </div>
                <div className="font-bold">Delivery Status:</div>
              </div>
              <div className="flex justify-between my-5 border border-slate-400 rounded-2xl p-6">
                <div>
                  <div className="flex gap-3">
                    <div className="font-bold">Sender FullName:</div>
                    <div className="capitalize">
                      {deliveryDetail?.sender?.firstName +
                        " " +
                        deliveryDetail?.sender?.lastName}{" "}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="font-bold">Sender Phone:</div>
                    <div>{deliveryDetail?.sender?.phone}</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="font-bold">Receiver FullName:</div>
                    <div>{deliveryDetail?.package?.receiverName}</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="font-bold">Receiver Phone:</div>
                    <div>{deliveryDetail?.package?.receiverPhone}</div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3">
                    <div className="font-bold">Courier FullName:</div>
                    <div className="capitalize">
                      {deliveryDetail?.courier?.firstName +
                        " " +
                        deliveryDetail?.courier?.lastName}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="font-bold">Courier Phone:</div>
                    <div>{deliveryDetail?.package?.receiverPhone}</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="font-bold">Date of Booking:</div>
                    <div>
                      {dayjs(deliveryDetail?.courier?.createdAt).format(
                        "MMMM D, YYYY"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-bold">Picture of Item:</div>
              <div className="border border-slate-500 rounded-2xl my-5 p-5 h-96 overflow-auto">
                <div>
                  <img
                    src={deliveryDetail?.package?.photoUrls}
                    // width="45%"
                    // height="20%"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </AdminLayout>
  );
};

export default DeliverViewPage;
