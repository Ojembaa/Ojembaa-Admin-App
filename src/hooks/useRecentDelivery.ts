import { httpGetRecentDelivery, QueryParamDto } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetRecentDelivery = () => {
  const [recentDelivery, setRecentDelivery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentDelivery = useCallback(async (query?: QueryParamDto) => {
    try {
      setLoading(true);
      const response = await httpGetRecentDelivery();
      setRecentDelivery(response.data);
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

  return { fetchRecentDelivery, recentDelivery, loading, setLoading };
};
