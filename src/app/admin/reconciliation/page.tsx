"use client";
import Container from "@/components/Admin/Container";
import AdminLayout from "../../../components/Admin/layout";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/Common/Spinner";
import withAuth from "@/common/HOC/withAuth";
import { ITransaction, TransactionEnums } from "@/common/interfaces";
import CategoryModal from "@/app/admin/categories/CategoryModal";
import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";
import { useGetReconciliation } from "@/hooks/useGetReconciliation";
import numeral from "numeral";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetTransactions } from "@/hooks/useGetTransactions";
import dayjs from "dayjs";

const Reconciliation = () => {
  const { fetchReconciliationData, reconciliation, loading } =
    useGetReconciliation();
  const {
    fetchTransaction,
    transactions,
    loading: loadingTransactions,
  } = useGetTransactions();
  const { fetchAllUsers } = useGetUsers();
  const { setIsShowModal, isShowModal } = useToggleModalContext();
  const [dataId] = useState<string>();

  const [reconciliationData, setReconciliationData] = useState<ITransaction[]>(
    []
  );
  const [totalUnreconciledAmount, setTotalUnreconciledAmount] =
    useState<number>();
  const [reconciledAmount, setTotalReconciledAmount] = useState<number>();

  useEffect(() => {
    setReconciliationData(reconciliation);
  }, [reconciliation]);

  useEffect(() => {
    fetchReconciliationData();
    fetchAllUsers();
    fetchTransaction({ type: "RECONCILIATION" });
  }, []);

  const handleShowModal = () => {
    setIsShowModal((preVal) => !preVal);
  };

  useEffect(() => {
    const unReconciledAmount = reconciliationData.filter(
      (item) => item.type === TransactionEnums.DELIVERY
    );
    const amountToPay = unReconciledAmount.map((item) => +item.amount);

    const total = amountToPay.reduce((acc, curr) => acc + curr, 0);
    setTotalUnreconciledAmount(total);
  }, [reconciliationData]);

  useEffect(() => {
    const reconciledList = reconciliationData.filter(
      (item) => item.type === TransactionEnums.RECONCILIATION
    );
    const amountPaid = reconciledList.map((item) => +item.amount);

    // const reconciledUsers = users.filter((user) =>
    //   reconciledList.some((item) => item.courierId === user.id)
    // );

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
                  Date of Payment
                </th>
                {/* <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Action
                </th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-y-50">
              {!loadingTransactions &&
                transactions?.map((data) => {
                  return (
                    <tr className="" key={data.id}>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {`${data?.courier?.firstName} ${data?.courier?.lastName}`}
                      </td>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {data?.courier?.email}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {data?.amount}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {dayjs(data?.createdAt).format("MMMM D, YYYY")}
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
