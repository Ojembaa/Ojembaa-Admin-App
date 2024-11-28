import { ISettings } from "@/common/interfaces";
import { httpGetSettingById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetSettingById = () => {
  const [setting, setSetting] = useState<ISettings>();
  const [loading, setLoading] = useState(false);

  const GetSettingById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const result = await httpGetSettingById(id);
      if (result) {
        setSetting(result.data.data);
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
  }, []);

  return { GetSettingById, setting, loading };
};
