import { IBulletin } from "@/common/interfaces";
import { QueryParamDto, httpGetBulettins } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetbulletins = () => {
  const [bulletins, setBulletins] = useState<IBulletin[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  //   const { setError } = useErrorContext();

  const fetchBulletins = useCallback(async (query?: QueryParamDto) => {
    try {
      setLoading(true);
      const response = await httpGetBulettins({
        next_page_token: nextPageToken,
        ...query,
      });
      setBulletins((initialval) => {
        return [...initialval, ...response?.bulletins];
      });
      setNextPageToken(response.paginationToken!);
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
  // useEffect(() => {
  //   fetchBulletins();
  // }, [fetchBulletins]);

  return { fetchBulletins, nextPageToken, bulletins, loading };
};
