import { AppUsers } from "@/common/interfaces";
import { httpUpdateUserById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useUpdateUserDetail = () => {
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState<Partial<AppUsers>>();

  const UpdateUserDetailById = useCallback(
    async (id: string, data: Partial<AppUsers>) => {
      try {
        setLoading(true);
        const result = await httpUpdateUserById(id, data);
        if (result) {
          setUserDetail(result.data.data);
          toast.success("user updated successfully!");
        }
      } catch (error) {
        let errorMessage: string = "";
        if (error instanceof AxiosError) {
          errorMessage = error?.response?.data.message;
        }
        toast.error(errorMessage);
        //@ts-ignore
        //   setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    UpdateUserDetailById,
    loading,
    userDetail,
  };
};
