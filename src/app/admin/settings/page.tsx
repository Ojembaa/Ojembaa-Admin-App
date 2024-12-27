"use client";
import Container from "@/components/Admin/Container";
import AdminLayout from "../../../components/Admin/layout";
import { Fragment, useEffect, useState } from "react";
import { Spinner } from "@/components/Common/Spinner";
import withAuth from "@/common/HOC/withAuth";
import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";
import { Menu, Transition } from "@headlessui/react";
import SettingsModal from "./SettingModal";
import { useGetSettings } from "@/hooks/useGetSettings";

const Settings = () => {
  const { settings, fetchSettings, loading } = useGetSettings();
  const { setIsShowModal, isShowModal } = useToggleModalContext();
  const [dataId, setDataId] = useState<string>();
  const [weight, setWeight] = useState("");

  const handleEditSettingModal = (weight: string, id: string) => {
    setWeight(weight);
    setDataId(id);
    setIsShowModal((preVal) => !preVal);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleShowModal = () => {
    setIsShowModal((preVal) => !preVal);
  };

  return (
    <AdminLayout>
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        <div className="font-bold text-xl ">Rider Setting</div>
        <hr className="w-full mb-10" />
        <div className="mb-4 overflow-auto rounded-lg">
          <table className="w-full">
            <thead className="border-b border-b-gray-400 borer">
              <tr className="">
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Weight Class
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Bare Fare
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Amount Per KM
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-y-50">
              {!loading &&
                settings?.map((data) => {
                  return (
                    <tr className="hover:bg-orange-200" key={data?.id}>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {data?.weightClass}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {data?.baseFare}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {data?.amountPerKM}
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
                                      <button
                                        onClick={() =>
                                          handleEditSettingModal(
                                            data?.weightClass,
                                            data.id
                                          )
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
            settings?.length === 0 && (
              <div className="flex items-center justify-center font-bold h-96">
                No Data found!
              </div>
            )
          )}
        </div>
        {isShowModal && (
          <SettingsModal
            handleShowModal={handleShowModal}
            dataId={dataId!}
            weight={weight}
          />
        )}
      </Container>
    </AdminLayout>
  );
};

export default withAuth(Settings);
