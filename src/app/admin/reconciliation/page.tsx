"use client";
import Container from "@/components/Admin/Container";
import AdminLayout from "../../../components/Admin/layout";
import { Fragment, useEffect, useState } from "react";
import { Spinner } from "@/components/Common/Spinner";
import withAuth from "@/common/HOC/withAuth";
import { IAppUsers, ITransaction, TransactionEnums } from "@/common/interfaces";
import CategoryModal from "@/app/admin/categories/CategoryModal";
import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useGetReconciliation } from "@/hooks/useGetReconciliation";
import numeral from "numeral";
import { useGetUsers } from "@/hooks/useGetUsers";

const Reconciliation = () => {
  const { fetchReconciliationData, reconciliation, loading } =
    useGetReconciliation();
  const { fetchAllUsers, users, loading: userLoading } = useGetUsers();
  const { setIsShowModal, isShowModal } = useToggleModalContext();
  const [dataId, setDataId] = useState<string>();

  const [reconciliationData, setReconciliationData] = useState<ITransaction[]>(
    []
  );
  const [totalUnreconciledAmount, setTotalUnreconciledAmount] =
    useState<number>();
  const [reconciledAmount, setTotalReconciledAmount] = useState<number>();
  const [reconciledUsers, setReconciledUsers] = useState<IAppUsers[]>([]);

  useEffect(() => {
    setReconciliationData(reconciliation);
  }, [reconciliation]);

  useEffect(() => {
    fetchReconciliationData();
    fetchAllUsers();
  }, []);

  const handleShowModal = () => {
    setIsShowModal((preVal) => !preVal);
  };

  const handleEditCategoryModal = (id: string) => {
    setDataId(id);
    setIsShowModal((preVal) => !preVal);
  };

  useEffect(() => {
    const unReconciledAmount = reconciliationData.filter(
      (item) => item.type === TransactionEnums.DELIVERY
    );
    const amountToPay = unReconciledAmount.map((item) => item.amount);

    const total = amountToPay.reduce((acc, curr) => acc + curr, 0);
    setTotalUnreconciledAmount(total);
  }, [reconciliationData]);

  useEffect(() => {
    const reconciledList = reconciliationData.filter(
      (item) => item.type === TransactionEnums.RECONCILIATION
    );
    const amountPaid = reconciledList.map((item) => item.amount);

    const reconciledUsers = users.filter((user) =>
      reconciledList.some((item) => item.courierId === user.id)
    );

    setReconciledUsers(reconciledUsers);

    const total = amountPaid.reduce((acc, curr) => acc + curr, 0);
    setTotalReconciledAmount(total);
  }, [reconciliationData]);

  return (
    <AdminLayout>
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        <div className="font-bold py-3">Reconciliation</div>
        <hr className="w-full" />
        <div className="flex justify-between my-5 space-x-8 h-52">
          <div className="border border-slate-300 rounded-md w-full p-7">
            <p className="font-semibold"> Reconciled</p>
            <div className="font-semibold text-xl text-slate-500">
              <p className="font-semibold">
                {numeral(reconciledAmount).format("0,0.00")}
              </p>
            </div>
          </div>
          <div className="border border-slate-300 rounded-md w-full p-7">
            <p className="font-semibold"> Unreconciled</p>
            <div className="font-semibold text-xl text-slate-500">
              <p>{numeral(totalUnreconciledAmount).format("N0,0.00")}</p>
            </div>
          </div>
        </div>
        <div className="mb-4 overflow-auto rounded-lg">
          <div className="font-bold py-3">Reconciled Users</div>
          <table className="w-full">
            <thead className="border-b border-b-gray-400 borer">
              <tr className="">
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Name
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Email
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Amount{" "}
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-y-50">
              {!userLoading &&
                reconciledUsers?.map((data) => {
                  return (
                    <tr className="" key={data.id}>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {`${data.firstName} ${data.lastName}`}
                      </td>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {data?.email}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {data?.role}
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
                                      <Link href={`/categories/`}>
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
                                      <button
                                        onClick={() =>
                                          handleEditCategoryModal(data?.id)
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
            reconciliationData?.length === 0 && (
              <div className="flex items-center justify-center font-bold h-96">
                No Data found!
              </div>
            )
          )}
        </div>
        {isShowModal && (
          <CategoryModal handleShowModal={handleShowModal} dataId={dataId} />
        )}
      </Container>
    </AdminLayout>
  );
};

export default withAuth(Reconciliation);
