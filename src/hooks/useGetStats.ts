import { httpGetStats, QueryParamDto } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetStats = () => {
  const [stats, setStats] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchStat = useCallback(async (query?: QueryParamDto) => {
    try {
      setLoading(true);
      const response = await httpGetStats();
      setStats(response);
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

  return { fetchStat, stats, loading, setLoading };
};
