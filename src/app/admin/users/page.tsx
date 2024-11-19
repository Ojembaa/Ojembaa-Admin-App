"use client";
import Container from "@/components/Admin/Container";
import AdminLayout from "../../../components/Admin/layout";
import { Fragment, useEffect, useState } from "react";
import { Spinner } from "@/components/Common/Spinner";
import Search from "@/components/Admin/Search";
import withAuth from "@/common/HOC/withAuth";
import { useGetUsers } from "@/hooks/useGetUsers";
import Switch from "react-switch";
import { IAppUsers } from "@/common/interfaces";
import { useUpdateUserDetail } from "@/hooks/useUpdateUser";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Swal from "sweetalert2";

const User = () => {
  const { fetchAllUsers, users, loading, setLoading } = useGetUsers();
  const { UpdateUserDetailById } = useUpdateUserDetail();
  const [filteredUser, setFilteredUser] = useState<IAppUsers[]>([]);

  useEffect(() => {
    setFilteredUser(users);
  }, [users]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const updateUserStatus = async (id: string, status: boolean) => {
    try {
      setLoading(true);
      await UpdateUserDetailById(id, { activate: status });
      fetchAllUsers();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredUser(users);
    } else {
      const bulletinSearchResults =
        users &&
        users.filter((item) => {
          return (
            item.firstName.toLowerCase().includes(query.toLowerCase()) ||
            item.lastName.toLowerCase().includes(query.toLowerCase())
          );
        });
      setFilteredUser(bulletinSearchResults);
    }
  };

  const deleteItem = (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "p-3 bg-red-700  rounded-lg text-white mx-2",
        cancelButton: "p-3 bg-green-700 rounded-lg text-white ",
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
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
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
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        <div className="flex flex-col justify-between mb-5 lg:flex-row gap-y-5">
          <Search onSearch={handleSearch} />
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
                  First Name
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Last Name
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  User Role
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Status
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  IsActivated
                </th>{" "}
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-y-50">
              {!loading &&
                filteredUser?.map((data, idx: number) => {
                  return (
                    <tr className="" key={idx}>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {idx + 1}
                      </td>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {data.firstName}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {data.lastName}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {data.role}{" "}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {data.status}{" "}
                      </td>
                      <td className="text-sm whitespace-nowrap py-2">
                        <Switch
                          onChange={() =>
                            updateUserStatus(data.id!, !data.isActivated)
                          }
                          checked={data.isActivated}
                        />
                      </td>
                      <td className="p-2 text-sm text-gray-700">
                        {" "}
                        <div className="z-10 ">
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
                                      <Link
                                        href={`/admin/users/view/${data.id}`}
                                      >
                                        <button
                                          className={`${
                                            active
                                              ? "bg-gray-200 text-black"
                                              : "text-black-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          View
                                        </button>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>

                                <div className="px-1 py-1 ">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link href={`/`}>
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
                                        onClick={() => deleteItem("3")}
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
            <div className="flex items-center justify-center h-96">
              {" "}
              <Spinner color="orange" />
            </div>
          ) : (
            filteredUser?.length === 0 && (
              <div className="flex items-center justify-center font-bold h-96">
                No Data found!
              </div>
            )
          )}
        </div>
      </Container>
    </AdminLayout>
  );
};

export default withAuth(User);
