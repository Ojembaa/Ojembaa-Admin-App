import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ISettings } from "@/common/interfaces";
import Input from "@/components/Admin/input";
import Button from "@/components/Admin/button";
import { Spinner } from "@/components/Common/Spinner";
import { useUpdateSettingsById } from "@/hooks/useUpdateSettingsById";
import { useGetSettingById } from "@/hooks/useGetSettingById";

interface ISettingsModal {
  handleShowModal: () => void;
  dataId?: string;
}

const SettingsModal = ({ handleShowModal, dataId }: ISettingsModal) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ISettings>();

  const { UpdateSettingsData, loading: isBusy } = useUpdateSettingsById();
  const { GetSettingById, setting, loading } = useGetSettingById();
  const [dataToEdit, setDataToEdit] = useState<ISettings>();

  useEffect(() => {
    GetSettingById(dataId!);
  }, [dataId]);

  useEffect(() => {
    if (setting) {
      setDataToEdit(setting);
    }
  }, [setting]);

  useEffect(() => {
    if (dataId && dataToEdit) {
      setValue("weightClass", dataToEdit?.weightClass, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("baseFare", dataToEdit?.baseFare, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("amountPerKM", dataToEdit?.amountPerKM, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [dataToEdit]);

  const onSubmit = (data: ISettings) => {
    if (dataId) {
      return UpdateSettingsData(dataId, data);
    }
    reset();
  };
  return (
    <div className="fixed inset-0 opacity-90 backdrop-blur-sm flex justify-center items-center bg-black">
      <div className="bg-white px-6  py-3 rounded-xl w-[28rem] z-10">
        <div className="flex justify-between items-center space-y-3 pb-3  px-2">
          <div>
            <div className="font-bold"> Update Weight Class</div>
            <p className="flex justify-center text-xs">
              Update weight class with the base fare and amount per KM
            </p>
          </div>
          <div
            className="font-bold capitalize text-red-900 cursor-pointer shadow-md px-2 hover:rotate-3"
            onClick={handleShowModal}
          >
            X
          </div>
        </div>

        {dataId && loading ? (
          <div className="flex items-center justify-center h-96">
            {" "}
            <Spinner color="orange" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Weight Class"
                type="text"
                {...register("weightClass", {
                  required: "Weight Class is required",
                })}
                disabled
              />
              {errors?.weightClass && (
                <p className="text-red-500 italic">
                  {errors.weightClass.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Base Fare (&#8358;)"
                type="number"
                {...register("baseFare", {
                  required: "Base Fare is required ",
                })}
              />
              {errors?.amountPerKM && (
                <p className="text-red-500 italic">
                  {errors.amountPerKM.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Amount Per KM"
                type="number"
                {...register("amountPerKM", {
                  required: "Amount Per KM is required",
                })}
              />
              {errors?.amountPerKM && (
                <p className="text-red-500 italic">
                  {errors.amountPerKM.message}
                </p>
              )}
            </div>

            <div className="pb-2">
              <Button
                className="flex items-center justify-center bg-orange-500 rounded-md text-white hover:bg-orange-400 w-full"
                type="submit"
                disabled={loading}
              >
                {loading || isBusy ? "loading..." : "Update"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
