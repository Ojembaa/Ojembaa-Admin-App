import { IAnnouncement, ICategories } from "@/common/interfaces";
import { httpUpdateCategoryById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useUpdateCategoryById = () => {
  const [category, setCategory] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  //   const { setError } = useErrorContext();

  const UpdateCategoryData = useCallback(
    async (id: string, data: ICategories) => {
      try {
        setLoading(true);
        const result = await httpUpdateCategoryById(id, data);
        if (result) {
          setCategory(result.data.data);
          toast.success("Announcement updated successfully");
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
    },
    []
  );

  return { UpdateCategoryData, category, loading };
};
