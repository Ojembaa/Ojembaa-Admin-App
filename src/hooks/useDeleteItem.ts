import { httpDeleteBulletinById } from "@/services/requests";
import { useCallback, useState } from "react";
import { useGetbulletins } from "./useGetBulletins";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useDeleteBulletinItem = () => {
  const [isBusy, setIsBusy] = useState(false);
  const { fetchBulletins } = useGetbulletins();

  const DeleteBulletinItem = useCallback(async (id: string) => {
    try {
      setIsBusy(true);
      await httpDeleteBulletinById(id);
      fetchBulletins();
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

  return { DeleteBulletinItem, isBusy };
};
