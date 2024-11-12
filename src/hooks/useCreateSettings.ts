import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";
import { ISettings } from "@/common/interfaces";
import { httpCreateSetting } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useCreateSetting = () => {
  const [settings, setSettings] = useState<ISettings[]>([]);
  const [loading, setLoading] = useState(false);
  const { setIsShowModal } = useToggleModalContext();

  const createSetting = useCallback(async (data: ISettings) => {
    try {
      setLoading(true);
      const fetchData = await httpCreateSetting(data);
      if (fetchData) {
        setSettings(fetchData.data.data);
        toast.success("Setting created successfully");
      }
      setIsShowModal(false);
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

  return { createSetting, settings, loading };
};
