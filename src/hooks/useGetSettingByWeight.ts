import { ISettings } from "@/common/interfaces";
import { httpGetSettingByWeight } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetSettingByWeight = () => {
  const [setting, setSetting] = useState<ISettings>();
  const [loading, setLoading] = useState(false);

  const GetSettingByWeight = useCallback(async (weight: string) => {
    try {
      setLoading(true);
      const result = await httpGetSettingByWeight(weight);
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

  return { GetSettingByWeight, setting, loading };
};
