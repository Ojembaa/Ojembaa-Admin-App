import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";
import { ICategories } from "@/common/interfaces";
import { httpCreateCategory } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useCreateCategory = () => {
  const [category, setCategory] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState(false);
  const { setIsShowModal } = useToggleModalContext();

  // TODO: correct the empty string that is being sent to the server.

  const CreateCategory = useCallback(async (data: ICategories) => {
    try {
      setLoading(true);
      const res = await httpCreateCategory(data);
      if (res) {
        setCategory(res.data);
        toast.success("Category created successfully");
      }
      setIsShowModal(false);
      window.location.reload();
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.error(errorMessage); //@ts-ignore
      //   setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { CreateCategory, category, loading };
};
