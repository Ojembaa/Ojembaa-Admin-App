"use client";
import Container from "@/components/Admin/Container";
import AdminLayout from "../../../components/Admin/layout";
import { Fragment, useEffect, useState } from "react";
import { Spinner } from "@/components/Common/Spinner";
import Search from "@/components/Admin/Search";
import Button from "@/components/Admin/button";
import withAuth from "@/common/HOC/withAuth";
import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";
import { Menu, Transition } from "@headlessui/react";
// import SettingsModal from "./SettingModal";
import { useGetSettings } from "@/hooks/useGetSettings";

const Settings = () => {
  const { settings, fetchSettings, loading } = useGetSettings();
  const { setIsShowModal } = useToggleModalContext();

  const [filteredSettings, setFilteredSettings] = useState<any>([]);

  useEffect(() => {
    const results = Object.entries(settings).map(([key, value]) => ({
      [key]: value,
    }));
    setFilteredSettings(results);
  }, [settings]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleShowModal = () => {
    setIsShowModal((preVal) => !preVal);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredSettings(settings);
    } else {
      const settingSearchResults =
        settings &&
        settings.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });
      setFilteredSettings(settingSearchResults);
    }
  };

  // const deleteItem = (id: string) => {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: "p-3 bg-red-700  rounded-lg text-white mx-2",
  //       cancelButton: "p-3 bg-green-700 rounded-lg text-white ",
  //     },
  //     buttonsStyling: false,
  //   });
  //   swalWithBootstrapButtons
  //     .fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, delete it!",
  //       cancelButtonText: "No, cancel!",
  //       reverseButtons: true,
  //     })
  //     .then(async (result) => {
  //       if (result.isConfirmed) {
  //         await DeleteCategory(id);
  //         swalWithBootstrapButtons.fire({
  //           title: "Deleted!",
  //           text: "Your file has been deleted.",
  //           icon: "success",
  //         });
  //         // fetchBulletins(); //TODO: Optimize the responsd afte deleting files
  //       } else if (
  //         /* Read more about handling dismissals below */
  //         result.dismiss === Swal.DismissReason.cancel
  //       ) {
  //         swalWithBootstrapButtons.fire({
  //           title: "Cancelled",
  //           text: "Your imaginary file is safe :)",
  //           icon: "error",
  //         });
  //       }
  //     });
  // };

  return (
    <AdminLayout>
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        <div className="flex flex-col gap-3 items-center mb-5 lg:flex-row gap-y-5">
          <Search onSearch={handleSearch} />
          <Button
            type="button"
            className="px-3 py-2 hover:bg-orange-600"
            onClick={() => handleShowModal()}
          >
            Add New
          </Button>
        </div>
        <hr className="w-full" />
        <div className="mb-4 overflow-auto rounded-lg">
          <table className="w-full">
            <thead className="border-b border-b-gray-400 borer">
              <tr className="">
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Name
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Value
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-y-50">
              {!loading &&
                filteredSettings?.map((data: any, idx: number) => {
                  const [key, value] = Object.entries(data)[0];

                  return (
                    <tr className="" key={idx}>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {key}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {value as React.ReactNode}
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
                                      // <Link href={`/categories/`}>
                                      <button
                                        className={`${
                                          active
                                            ? "bg-gray-200 text-black"
                                            : "text-black-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        View
                                      </button>
                                      // </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                                {/* 
                                <div className="px-1 py-1 ">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={() =>
                                          handleEditCategoryModal(idx)
                                        }
                                        className={`${
                                          active
                                            ? "bg-gray-200 text-black"
                                            : "text-black-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        Edit
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div> */}
                                <div className="px-1 py-1 ">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
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
            filteredSettings?.length === 0 && (
              <div className="flex items-center justify-center font-bold h-96">
                No Data found!
              </div>
            )
          )}
        </div>
        {/* {isShowModal && (
          <SettingsModal handleShowModal={handleShowModal} dataId={dataId} />
        )} */}
      </Container>
    </AdminLayout>
  );
};

export default withAuth(Settings);
