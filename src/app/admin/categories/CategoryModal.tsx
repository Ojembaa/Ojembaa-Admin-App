import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICategories } from "@/common/interfaces";
import Input from "@/components/Admin/input";
import Button from "@/components/Admin/button";
import { useCreateCategory } from "@/hooks/useCreateCategory";
import { useGetCategories } from "@/hooks/useGetCategories";
import { Spinner } from "@/components/Common/Spinner";
import { useUpdateCategoryById } from "@/hooks/useUpdateCategoryById";

interface IModal {
  handleShowModal: () => void;
  dataId?: string;
}

const CategoryModal = ({ handleShowModal, dataId }: IModal) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICategories>();

  const { CreateCategory, loading } = useCreateCategory();
  const {
    fetchCategories,
    categories,
    loading: isloading,
  } = useGetCategories();
  const { UpdateCategoryData, loading: isBusy } = useUpdateCategoryById();
  const [dataToEdit, setDataToEdit] = useState<ICategories[]>();

  useEffect(() => {
    if (!dataId) return;
    const fetchData = async () => {
      await fetchCategories();
    };
    fetchData();
  }, [dataId]);

  useEffect(() => {
    if (categories) {
      const result = categories.filter((item) => item.id === dataId);
      setDataToEdit(result);
    }
  }, [categories]);

  useEffect(() => {
    if (dataId && dataToEdit) {
      let data = dataToEdit[0];
      setValue("name", data?.name, {
        shouldDirty: true,
        shouldValidate: true,
      });

      setValue("amount", data?.amount, {
        shouldDirty: true,
        shouldValidate: true,
      });

      setValue("description", data?.description, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [dataToEdit]);

  const onSubmit = (data: ICategories) => {
    data.amount = +data.amount;
    if (dataId) {
      return UpdateCategoryData(dataId, data);
    }
    CreateCategory(data);
    reset();
  };
  return (
    <div className="fixed inset-0 opacity-90 backdrop-blur-sm flex justify-center items-center bg-black">
      <div className="bg-white px-6  py-3 rounded-xl w-[28rem] z-10">
        <div className="flex justify-between items-center space-y-3 pb-3  px-2">
          <div>
            <div className="font-bold"> New Category</div>
            <p className="flex justify-center text-xs">
              Add a new category of product that can be dispatched
            </p>
          </div>
          <div
            className="font-bold capitalize text-red-900 cursor-pointer shadow-md px-2 hover:rotate-3"
            onClick={handleShowModal}
          >
            X
          </div>
        </div>

        {dataId && isloading ? (
          <div className="flex items-center justify-center h-96">
            {" "}
            <Spinner color="orange" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Category Name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>

            {errors?.name && (
              <p className="text-red-500 italic">{errors.name.message}</p>
            )}
            <div>
              <Input
                label="Amount"
                type="number"
                {...register("amount", { required: "Amount is required" })}
              />
            </div>
            {errors?.amount && (
              <p className="text-red-500 italic">{errors.amount.message}</p>
            )}

            <div>
              <Input
                label="Description"
                type="text"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </div>
            {errors?.description && (
              <p className="text-red-500 italic">
                {errors.description.message}
              </p>
            )}

            <div className="pb-2">
              <Button
                className="flex items-center justify-center bg-orange-500 rounded-md text-white hover:bg-orange-400 w-full"
                type="submit"
                disabled={loading}
              >
                {loading || isBusy ? "loading..." : dataId ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
