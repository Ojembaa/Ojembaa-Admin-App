import React from "react";
import { useForm } from "react-hook-form";
import { ICategories } from "@/common/interfaces";
import Input from "@/components/Admin/input";
import Button from "@/components/Admin/button";
import { useCreateCategory } from "@/hooks/useCreateCategory";

interface IModal {
  handleShowModal: () => void;
}

const CategoryModal = ({
  handleShowModal,
}: {
  handleShowModal: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategories>();

  const { CreateCategory, loading } = useCreateCategory();

  const onSubmit = (data: ICategories) => {
    data.amount = +data.amount;
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
            <p className="text-red-500 italic">{errors.description.message}</p>
          )}

          <div className="pb-2">
            <Button
              className="flex items-center justify-center bg-orange-500 rounded-md text-white hover:bg-orange-400 w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "loading..." : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
