"use client";

import BackButton from "@/components/Admin/backButton";
import Button from "@/components/Admin/button";
import Container from "@/components/Admin/Container";
import AdminLayout from "@/components/Admin/layout";
import { useForm } from "react-hook-form";
import Input from "@/components/Admin/input";
import { Spinner } from "@/components/Common/Spinner";
import { useCreateAnnouncement } from "@/hooks/useCreateAnnouncement";
import { IAnnouncement } from "@/common/interfaces";
import withAuth from "@/common/HOC/withAuth";

const CreateAnnouncement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAnnouncement>();
  const { createAnnouncement, loading } = useCreateAnnouncement();

  const submitData = (data: IAnnouncement) => {
    try {
      createAnnouncement(data);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };
  return (
    <AdminLayout>
      <Container className=" md:px-[3.125rem] px-[2.5rem] pt-6 pb-7 ">
        <form onSubmit={handleSubmit(submitData)}>
          <div className=" flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
            <BackButton text="Back to Announcement List " />

            <Button
              type="submit"
              className=" w-28 disabled:bg-slate-500"
              disabled={loading}
            >
              Create
            </Button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-96">
              {" "}
              <Spinner color="orange" />
            </div>
          ) : (
            <div className=" mt-4 flex flex-wrap gap-5 justify-between">
              <div className="w-full flex flex-wrap gap-5 justify-between  md:flex-row flex-col h-fit rounded-lg gap-y-3 gap-x-3 pb-8 pt-6 px-3 bg-white font-poppins">
                <div className="font-semibold text-2xl">
                  <h2> Create Announcement</h2>
                </div>

                <div className=" h-[3.75rem] w-full">
                  <Input
                    type="text"
                    placeHolder="announcement description"
                    {...register("content", { required: true })}
                  />
                </div>
                {errors?.content && (
                  <p className="py-1 text-red-500 italic">
                    Announcement description is required
                  </p>
                )}
              </div>
            </div>
          )}
        </form>
      </Container>
    </AdminLayout>
  );
};

export default withAuth(CreateAnnouncement);
