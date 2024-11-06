import { IAnnouncement } from "@/common/interfaces";
import { httpGetAnnouncements } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetAnnouncements = () => {
  const [announcements, setAnnouncement] = useState<IAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  //   const { setError } = useErrorContext();

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      const res = await httpGetAnnouncements();
      if (res) {
        setAnnouncement(res.data.data);
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
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return { fetchAnnouncements, announcements, loading };
};
