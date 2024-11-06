"use client";
import Container from "@/components/Admin/Container";
import AdminLayout from "../../../components/Admin/layout";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/Common/Spinner";
import Search from "@/components/Admin/Search";
import Button from "@/components/Admin/button";
import { useRouter } from "next/navigation";
import withAuth from "@/common/HOC/withAuth";
import { useGetUsers } from "@/hooks/useGetUsers";
import Switch from "react-switch";
import { AppUsers } from "@/common/interfaces";
import { useUpdateUserDetail } from "@/hooks/useUpdateUser";

const User = () => {
  const router = useRouter();

  const { fetchAllUsers, users, loading, setLoading } = useGetUsers();
  const { UpdateUserDetailById } = useUpdateUserDetail();
  const [filteredUser, setFilteredUser] = useState<AppUsers[]>([]);

  useEffect(() => {
    setFilteredUser(users);
  }, [users]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const updateUserStatus = async (id: string, status: boolean) => {
    try {
      setLoading(true);
      await UpdateUserDetailById(id, { isVerified: status });
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
            item.userName.toLowerCase().includes(query.toLowerCase()) ||
            item.lastName.toLowerCase().includes(query.toLowerCase())
          );
        });
      setFilteredUser(bulletinSearchResults);
    }
  };

  return (
    <AdminLayout>
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        <div className="flex flex-col justify-between mb-5 lg:flex-row gap-y-5">
          <Search onSearch={handleSearch} />
          <Button
            type="button"
            className="px-8 py-2 hover:bg-orange-600"
            onClick={() => router.push("/admin/bulletin/create")}
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
                  First Name
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Last Name
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  User Name
                </th>
                <th className="p-3 text-sm font-bold tracking-wide text-left">
                  Status
                </th>{" "}
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
                        {data.userName}{" "}
                      </td>
                      <td className="text-sm whitespace-nowrap py-2">
                        <Switch
                          disabled={data.userName === "dev"}
                          onChange={() =>
                            updateUserStatus(data.id!, !data.isVerified)
                          }
                          checked={data.isVerified}
                        />
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
                No Data created yet
              </div>
            )
          )}
        </div>
      </Container>
    </AdminLayout>
  );
};

export default withAuth(User);
