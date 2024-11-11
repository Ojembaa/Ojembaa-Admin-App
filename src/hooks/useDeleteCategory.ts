import { httpDeleteCategoryById } from "@/services/requests";
import { useCallback, useState } from "react";
import { useGetCategories } from "./useGetCategories";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useDeleteCategory = () => {
  const [isBusy, setIsBusy] = useState(false);
  const { fetchCategories } = useGetCategories();

  const DeleteCategory = useCallback(async (id: string) => {
    try {
      setIsBusy(true);
      await httpDeleteCategoryById(id);
      fetchCategories();
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.error(errorMessage);
      //@ts-ignore
      //   setError(error.message);
    } finally {
      setIsBusy(false);
    }
  }, []);

  return { DeleteCategory, isBusy };
};
