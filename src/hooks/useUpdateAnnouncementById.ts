import { IAnnouncement } from "@/common/interfaces";
import { httpUpdateAnnouncementById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useUpdateeAnnouncementById = () => {
  const [announcement, setAnnouncement] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  //   const { setError } = useErrorContext();

  const UpdateAnnouncementData = useCallback(
    async (id: string, data: IAnnouncement) => {
      try {
        setLoading(true);
        const result = await httpUpdateAnnouncementById(id, data);
        if (result) {
          setAnnouncement(result.data.data);
          toast.success("Announcement updated successfully");
        }
      } catch (error) {
        let errorMessage: string = "";
        if (error instanceof AxiosError) {
          errorMessage = error?.response?.data?.message;
        }
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { UpdateAnnouncementData, announcement, loading };
};
