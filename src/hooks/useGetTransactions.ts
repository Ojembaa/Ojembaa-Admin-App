import { ITransaction } from "@/common/interfaces";
import { httpGetTransactions, QueryParamDto } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransaction = useCallback(async (query?: QueryParamDto) => {
    try {
      setLoading(true);
      const response = await httpGetTransactions(query);
      setTransactions(response);
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

  return { fetchTransaction, transactions, loading, setLoading };
};
