"use client";
import Container from "@/components/Admin/Container";
import AdminLayout from "../../../components/Admin/layout";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/Common/Spinner";
import Search from "@/components/Admin/Search";
import Button from "@/components/Admin/button";
import withAuth from "@/common/HOC/withAuth";
import { ICategories } from "@/common/interfaces";
import { useGetCategories } from "@/hooks/useGetCategories";
import CategoryModal from "@/components/Common/Modal/CategoryModal";
import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";

const Category = () => {
  const { categories, fetchCategories, loading } = useGetCategories();
  const { setIsShowModal, isShowModal } = useToggleModalContext();

  const [filteredCategories, setFilteredCategories] = useState<ICategories[]>(
    []
  );

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleShowModal = () => {
    setIsShowModal((preVal) => !preVal);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredCategories(categories);
    } else {
      const categorySearchResults =
        categories &&
        categories.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });
      setFilteredCategories(categorySearchResults);
    }
  };

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
                  Description
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-y-50">
              {!loading &&
                filteredCategories?.map((data, idx: number) => {
                  return (
                    <tr className="" key={idx}>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {data.name}
                      </td>
                      <td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
                        {data.description}
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                        {data.amount}
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
            filteredCategories?.length === 0 && (
              <div className="flex items-center justify-center font-bold h-96">
                No Data found!
              </div>
            )
          )}
        </div>
        {isShowModal && <CategoryModal handleShowModal={handleShowModal} />}
      </Container>
    </AdminLayout>
  );
};

export default withAuth(Category);
