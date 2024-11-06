import { BulletinStatusEnum, IBulletin } from "@/common/interfaces";
import { httpPublishBulletin } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const usePublishBulletin = () => {
  const [message, setMessage] = useState<IBulletin[]>([]);
  const [loading, setLoading] = useState(false);

  const PublishBulletin = useCallback(
    async (id: string, status: BulletinStatusEnum) => {
      try {
        setLoading(true);
        const result = await httpPublishBulletin(id, status);
        if (result) {
          setMessage(result.data.data);
          toast.success("Bulletin updated Successfully");
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

  return { PublishBulletin, message, loading };
};
