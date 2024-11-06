"use client";
import Container from "@/components/Admin/Container";
import AdminLayout from "../../../components/Admin/layout";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Spinner } from "@/components/Common/Spinner";
import dayjs from "dayjs";
import Search from "@/components/Admin/Search";
import Button from "@/components/Admin/button";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useGetAnnouncements } from "@/hooks/useGetAnnouncements";
import { useDeleteAnnouncementItem } from "@/hooks/useDeleteAnnouncementById";
import { IAnnouncement } from "@/common/interfaces";
import withAuth from "@/common/HOC/withAuth";

const AnnouncementListPage = () => {
  const router = useRouter();

  const { deleteAnnouncementItem, isBusy } = useDeleteAnnouncementItem();
  const { announcements, loading } = useGetAnnouncements();
  const [fillteredAnnouncements, setFilteredAnnouncement] = useState<
    IAnnouncement[]
  >([]);

  useEffect(() => {
    setFilteredAnnouncement(announcements);
  }, [announcements]);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredAnnouncement(announcements);
    } else {
      const announcementSearchResults =
        announcements &&
        announcements.filter((item) => {
          return item.content
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase());
        });
      setFilteredAnnouncement(announcementSearchResults);
    }
  };
  const deleteItem = (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-700 p-3 rounded-lg text-white mx-2",
        cancelButton: "p-3 bg-red-700 rounded-lg text-white ",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteAnnouncementItem(id);
          if (!isBusy) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else "Loading";
          // fetchBulletins(); //TODO: Optimize the responsd afte deleting files
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <AdminLayout>
      <Container className=" md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7 min-h-screen">
        <div className=" flex flex-col lg:flex-row gap-y-5 justify-between mb-5">
          <Search onSearch={handleSearch} />
          <Button
            type="button"
            className="py-2 px-8  hover:bg-orange-600"
            onClick={() => router.push("/admin/announcement/create")}
          >
            Create
          </Button>
        </div>
        <hr className="w-full" />
        <div className="mb-4 overflow-auto rounded-lg">
          <table className="w-full">
            <thead className="border-b border-b-gray-400 borer">
              <tr className="">
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  ID
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Created Date
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Content
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-y-50">
              {!loading &&
                fillteredAnnouncements.map((data: any, idx: number) => {
                  return (
                    <tr className="" key={idx}>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {idx + 1}
                      </td>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {dayjs(data?.createdDate).format("MMM D, YYYY")}
                      </td>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {data.content}
                      </td>

                      <td className="p-2 text-sm text-gray-700">
                        {" "}
                        <div className="">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                  />
                                </svg>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-50 w-40 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active
                                            ? "bg-gray-200 text-black"
                                            : "text-black-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        View
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>

                                <div className="px-1 py-1 ">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        href={`/admin/announcement/edit/${data.id}`}
                                      >
                                        <button
                                          className={`${
                                            active
                                              ? "bg-gray-200 text-black"
                                              : "text-black-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          Edit
                                        </button>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="px-1 py-1 ">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={() => deleteItem(data.id)}
                                        className={`${
                                          active
                                            ? "bg-gray-200 text-red-700"
                                            : "text-red-500"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              {" "}
              <Spinner color="orange" />
            </div>
          ) : (
            fillteredAnnouncements.length === 0 && (
              <div className="flex justify-center items-center h-96 font-bold">
                No Announcement created yet
              </div>
            )
          )}
        </div>
      </Container>
    </AdminLayout>
  );
};

export default withAuth(AnnouncementListPage);
