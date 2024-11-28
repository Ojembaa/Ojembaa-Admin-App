import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";
import { ISettings } from "@/common/interfaces";
import { httpUpdateSettingById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useUpdateSettingsById = () => {
  const [settings, setSettings] = useState<ISettings[]>([]);
  const [loading, setLoading] = useState(false);
  const { setIsShowModal } = useToggleModalContext();

  const UpdateSettingsData = useCallback(
    async (id: string, data: ISettings) => {
      try {
        setLoading(true);
        const result = await httpUpdateSettingById(id, data);
        if (result) {
          setSettings(result.data.data);
          toast.success("Settings updated successfully");
        }
        setIsShowModal(false);
        window.location.reload();
      } catch (error) {
        let errorMessage: string = "";
        if (error instanceof AxiosError) {
          errorMessage = error?.response?.data?.message;
        }
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { UpdateSettingsData, settings, loading };
};
