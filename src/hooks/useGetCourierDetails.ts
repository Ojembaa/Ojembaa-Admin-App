import { ICourierDetails } from "@/common/interfaces";
import { httpGetCourierDetailById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetCourierDetailById = () => {
  const [courier, setCourier] = useState<ICourierDetails>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourierDetailById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const data = await httpGetCourierDetailById(id);
      if (data) {
        setCourier(data?.data.data);
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
      setIsLoading(false);
    }
  }, []);

  return { fetchCourierDetailById, courier, isLoading };
};
