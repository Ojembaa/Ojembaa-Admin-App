import { IBulletin } from "@/common/interfaces";
import { httpGetBulletinById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetBulletinById = () => {
  const [bulletin, setBulletin] = useState<IBulletin>();
  const [isLoading, setIsLoading] = useState(false);
  //   const { setError } = useErrorContext();

  const fetchBulletinById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const data = await httpGetBulletinById(id);
      if (data) {
        setBulletin(data.data);
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

  return { fetchBulletinById, bulletin, isLoading };
};
