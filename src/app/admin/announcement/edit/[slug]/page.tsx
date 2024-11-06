"use client";

import BackButton from "@/components/Admin/backButton";
import Button from "@/components/Admin/button";
import Container from "@/components/Admin/Container";
import AdminLayout from "@/components/Admin/layout";
import { useForm } from "react-hook-form";
import Input from "@/components/Admin/input";
import { Spinner } from "@/components/Common/Spinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetAnnouncementById } from "@/hooks/useGetAnnouncementbyId";
import { IAnnouncement } from "@/common/interfaces";
import { useUpdateeAnnouncementById } from "@/hooks/useUpdateAnnouncementById";
import withAuth from "@/common/HOC/withAuth";

const EditAnnouncement = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAnnouncement>();

  const { fetchAnnouncementById, announcement, isLoading } =
    useGetAnnouncementById();
  const { UpdateAnnouncementData, loading } = useUpdateeAnnouncementById();

  const announcementId = params.slug;

  useEffect(() => {
    fetchAnnouncementById(announcementId);
  }, [announcementId]);

  useEffect(() => {
    if (!announcement) return;
    setValue("content", announcement?.content, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [announcement]);

  const submitData = (data: IAnnouncement) => {
    try {
      UpdateAnnouncementData(announcementId, data);
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/admin/announcement");
      // Todo: make bulletin list page auto fetch data after an update and delete without refreshing it
    }
  };
  return (
    <AdminLayout>
      <Container className=" md:px-[3.125rem] px-[2.5rem] pt-6 pb-7 ">
        <form onSubmit={handleSubmit(submitData)}>
          <div className=" flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
            <BackButton text="Back to Announcements" />

            <Button
              type="submit"
              className=" w-28 disabled:bg-slate-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              {" "}
              <Spinner color="orange" />
            </div>
          ) : (
            <div className=" mt-4 flex flex-wrap gap-5 justify-between">
              <div className="w-full flex flex-wrap gap-5 justify-between  md:flex-row flex-col h-fit rounded-lg gap-y-3 gap-x-3 pb-8 pt-6 px-3 bg-white font-poppins">
                <div className="font-semibold text-2xl">
                  <h2> Update Announcement</h2>
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
export default withAuth(EditAnnouncement);
