import { ISignUpUser } from "@/common/interfaces";
import { httpRegister } from "@/services/requests";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  const [usersData, setUsersData] = useState<any>();
  const [loading, setLoading] = useState(false);
  //   const { setError } = useErrorContext();

  const router = useRouter();

  const setRegisterUser = useCallback(async (registerData: ISignUpUser) => {
    try {
      setLoading(true);
      const data = await httpRegister(registerData);
      if (data) {
        setUsersData(data);
        toast.success("Registration successful");
        router.push("/admin/signin");
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

  return { setRegisterUser, usersData, loading };
};
