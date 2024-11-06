import { IAnnouncement } from "@/common/interfaces";
import { httpCreateAnnouncement } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useCreateAnnouncement = () => {
  const [announcements, setAnnouncement] = useState<IAnnouncement[]>([]);
  const [loading, setLoading] = useState(false);
  //   const { setError } = useErrorContext();

  const createAnnouncement = useCallback(async (data: IAnnouncement) => {
    try {
      setLoading(true);
      const fetchData = await httpCreateAnnouncement(data);
      if (fetchData) {
        setAnnouncement(fetchData.data.data);
        toast.success("Announcement created successfully");
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

  return { createAnnouncement, announcements, loading };
};
