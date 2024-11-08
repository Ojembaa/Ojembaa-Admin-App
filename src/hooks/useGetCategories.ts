import { ICategories } from "@/common/interfaces";
import { httpGetCategories, QueryParamDto } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async (query?: QueryParamDto) => {
    try {
      setLoading(true);
      const response = await httpGetCategories();
      setCategories(response);
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.error(errorMessage);
      //@ts-ignore
      //   setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchCategories, categories, loading, setLoading };
};
