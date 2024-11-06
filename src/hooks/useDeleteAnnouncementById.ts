import { httpDeleteAnnouncementById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useDeleteAnnouncementItem = () => {
  const [isBusy, setIsBusy] = useState(false);

  const deleteAnnouncementItem = useCallback(async (id: string) => {
    try {
      setIsBusy(true);
      await httpDeleteAnnouncementById(id);
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

  return { deleteAnnouncementItem, isBusy };
};
