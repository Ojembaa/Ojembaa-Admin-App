"use client";
import { IAppUsers } from "@/common/interfaces";
import BackButton from "@/components/Admin/backButton";
import Container from "@/components/Admin/Container";
import AdminLayout from "@/components/Admin/layout";
import { Spinner } from "@/components/Common/Spinner";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useEffect, useState } from "react";

const UserViewPage = ({ params }: { params: { slug: string } }) => {
  const userID = params.slug;
  const { fetchAllUsers, users, loading } = useGetUsers();
  const [userDetail, setUserDetail] = useState<IAppUsers>();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (users) {
      const user = users.filter((user) => user.id === userID);
      setUserDetail(user[0]);
      console.log(user[0], "user");
    }
  }, [users]);

  return (
    <AdminLayout>
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            {" "}
            <Spinner color="orange" />
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
              <BackButton text="Bulletin List Page" />
            </div>
            <div className="py-2">
              <hr />
            </div>
            <div className="flex gap-20">
              <div className="flex gap-4">
                <div>
                  <img
                    className="inline-block h-44 w-44 rounded-full"
                    src={userDetail?.profilePhoto}
                    alt="profile-image"
                  />
                </div>
              </div>

              <div>
                <div className="font-bold flex ">
                  <div className="pr-16">
                    <p>First Name:</p>
                  </div>
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.firstName || "Null"}{" "}
                  </span>
                </div>
                <div className="font-bold flex ">
                  <div className="pr-16">
                    <p>Last Name:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.lastName || "Null"}{" "}
                  </span>
                </div>
                <div className="font-bold flex">
                  <div className="pr-16">
                    <p>Address:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.address || "Null"}{" "}
                  </span>
                </div>
                <div className="font-bold flex">
                  <div className="pr-5">
                    <p>Phone Number:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.phone || "Null"}{" "}
                  </span>
                </div>
                <div className="font-bold flex">
                  <div className="pr-20">
                    <p>Email:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.email || "Null"}
                  </span>
                </div>
                <div className="font-bold flex ">
                  <div className="pr-16">
                    <p>Deliveries:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.deliveries || "Null"}
                  </span>
                </div>

                <div className="font-bold flex ">
                  <div className="pr-16">
                    <p>Status:</p>
                  </div>{" "}
                  <span className="capitalize font-normal py-1 px-5 bg-green-400 rounded-2xl text-white">
                    {" "}
                    {userDetail?.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <hr />
            </div>
            <div>
              <div className="mt-5 font-bold">
                <h2>ID Card </h2>
              </div>
              <div className="flex justify-between my-5 space-x-8 max-h-52">
                {/* <div
             className="border border-slate-300 rounded-md w-full p-7 "
             style={{
               backgroundImage: `url(${userDetail?.idImageFront})`,
               backgroundRepeat: "no-repeat",
               backgroundSize: "cover",
               backgroundPosition: "center",
             }}
           ></div> */}

                <div className="border border-slate-300 rounded-md w-full p-7 h-52  overflow-auto">
                  <img src={userDetail?.idImageFront} />
                </div>

                <div className="border border-slate-300 rounded-md w-full p-7 h-52 overflow-auto">
                  <img src={userDetail?.idImageBack} />
                </div>
              </div>
            </div>
            <div className="my-10">
              <hr />
            </div>

            <div>
              <div className="mt-5 font-bold">
                <h2>Guarantor </h2>
              </div>
            </div>
          </div>
        )}
      </Container>
    </AdminLayout>
  );
};

export default UserViewPage;
