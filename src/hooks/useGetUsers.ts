import { AppUsers } from "@/common/interfaces";
import { httpGetUsers } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetUsers = () => {
  const [users, setUsers] = useState<AppUsers[]>([]);
  const [loading, setLoading] = useState(true);
  //   const { setError } = useErrorContext();

  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await httpGetUsers();
      if (res) {
        setUsers(res.data.data);
      }
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.error(errorMessage);
      //@ts-ignore
      //   setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return { fetchAllUsers, users, loading, setLoading };
};
