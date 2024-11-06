import { CreateBulletinDTO } from "@/common/interfaces";
import { httpCreateBulletin } from "@/services/requests";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useCreateBulletins = () => {
  const [bulletins, setBulletins] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //   const { setError } = useErrorContext();

  // TODO: correct thr empty string that is being send to the server.

  const CreateBulletins = useCallback(async (data: CreateBulletinDTO) => {
    try {
      setLoading(true);
      const res = await httpCreateBulletin(data);
      if (res) {
        setBulletins(res.data.data);
        toast.success("Bulletin created successfully");
      }
      router.push("/admin/bulletin");
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

  return { CreateBulletins, bulletins, loading };
};
