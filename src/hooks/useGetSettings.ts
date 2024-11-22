import { ISettings } from "@/common/interfaces";
import { httpGetSettings } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetSettings = () => {
  const [settings, setSettings] = useState<ISettings[]>([]);
  const [loading, setLoading] = useState(true);
  //   const { setError } = useErrorContext();

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await httpGetSettings();
      if (res) {
        setSettings(res.data.data);
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
    fetchSettings();
  }, [fetchSettings]);

  return { fetchSettings, settings, loading };
};
