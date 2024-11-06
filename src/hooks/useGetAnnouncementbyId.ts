import { httpGetAnnouncementById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetAnnouncementById = () => {
  const [announcement, getAnnouncement] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  //   const { setError } = useErrorContext();

  const fetchAnnouncementById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const data = await httpGetAnnouncementById(id);
      if (data) {
        getAnnouncement(data.data);
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

  return { fetchAnnouncementById, announcement, isLoading };
};
