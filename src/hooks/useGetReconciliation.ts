import { ITransaction } from "@/common/interfaces";
import { httpGetReconciliationData, QueryParamDto } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetReconciliation = () => {
  const [reconciliation, setReconciliation] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReconciliationData = useCallback(async (query?: QueryParamDto) => {
    try {
      setLoading(true);
      const response = await httpGetReconciliationData();
      setReconciliation(response);
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

  return { fetchReconciliationData, reconciliation, loading, setLoading };
};
