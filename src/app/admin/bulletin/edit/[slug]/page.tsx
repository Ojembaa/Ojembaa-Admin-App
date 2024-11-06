"use client";

import BackButton from "@/components/Admin/backButton";
import Button from "@/components/Admin/button";
import Container from "@/components/Admin/Container";
import AdminLayout from "@/components/Admin/layout";
import { useForm } from "react-hook-form";
import Input from "@/components/Admin/input";
import { Spinner } from "@/components/Common/Spinner";
import { useEffect } from "react";
import { useGetBulletinById } from "@/hooks/useGetBulletinById";
import { useUpdateeBulletinById } from "@/hooks/useUpdateBulletinById";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import makeAnimated from "react-select/animated";
import { useGetAnnouncements } from "@/hooks/useGetAnnouncements";
import { CreateBulletinDTO } from "@/common/interfaces";
import withAuth from "@/common/HOC/withAuth";

const animatedComponents = makeAnimated();

const EditBulletin = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<CreateBulletinDTO>();
  const { fetchBulletinById, bulletin, isLoading } = useGetBulletinById();
  const { UpdateBulletinData, loading } = useUpdateeBulletinById();
  const { announcements } = useGetAnnouncements();

  const bulletinId = params.slug;

  useEffect(() => {
    fetchBulletinById(bulletinId);
  }, [bulletinId]);

  const formattedStartDate = bulletin?.startDate
    ? new Date(bulletin?.startDate).toISOString().split("T")[0]
    : "";
  const formattedEndDate = bulletin?.endDate
    ? new Date(bulletin?.endDate!).toISOString().split("T")[0]
    : "";

  useEffect(() => {
    if (!bulletin) return;
    setValue("themeForTheQuarter", bulletin?.themeForTheQuarter, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("topicForTheWeek", bulletin?.topicForTheWeek, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("lessonMemoryTest", bulletin?.lessonMemoryTest, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("lessonMemoryVerse", bulletin?.lessonMemoryVerse, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("onLineZoomLink", bulletin?.onLineZoomLink, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("midweekPrayerZoomLink", bulletin?.midweekPrayerZoomLink, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      "earlyMorningPrayerZoomLink",
      bulletin?.earlyMorningPrayerZoomLink,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setValue("singspirationTime", bulletin?.singspirationTime, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("songLeader", bulletin?.songLeader, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("openingPrayerBy", bulletin?.openingPrayerBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("openningRemarkBy", bulletin?.openningRemarkBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("openingHymnBy", bulletin?.openingHymnBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("openingHymn", bulletin?.openingHymn, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("missionSpotlightBy", bulletin?.missionSpotlightBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("lessonIntroductionBy", bulletin?.lessonIntroductionBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("unitActivities", bulletin?.unitActivities, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("lessonSummaryBy", bulletin?.lessonSummaryBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("friendTimeBy", bulletin?.friendTimeBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      "annnouncementClosingRemarkBy",
      bulletin?.annnouncementClosingRemarkBy,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    setValue("ssClosingHymnNo", bulletin?.ssClosingHymnNo, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("ssClosingHymnBy", bulletin?.ssClosingHymnBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("ssClosingPrayerBy", bulletin?.ssClosingPrayerBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("prelude", bulletin?.prelude, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("callToWorshipHymnNo", bulletin?.callToWorshipHymnNo, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("callToWorshipBy", bulletin?.callToWorshipBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("invocation", bulletin?.invocation, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      "divineServiceOpeningHymnNo",
      bulletin?.divineServiceOpeningHymnNo,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    setValue(
      "divineServiceOpeningHymnBy",
      bulletin?.divineServiceOpeningHymnBy,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    setValue("pastoralPrayerBy", bulletin?.pastoralPrayerBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("stewardshipBy", bulletin?.stewardshipBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("musicalSelectionBy", bulletin?.musicalSelectionBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("hymnOfConcecrationNo", bulletin?.hymnOfConcecrationNo, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("hymnOfConcecrationNoBy", bulletin?.hymnOfConcecrationNoBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("preacher", bulletin?.preacher, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("sermonTitle", bulletin?.sermonTitle, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      "divineServiceClosingHymnNo",
      bulletin?.divineServiceClosingHymnNo,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    setValue(
      "divineServiceClosingHymnBy",
      bulletin?.divineServiceOpeningHymnBy,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    setValue("benediction", bulletin?.benediction, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("doxology", bulletin?.doxology, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("pastorDeskBibleVerse", bulletin?.pastorDeskBibleVerse, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      "pastorDeskBibleVerseDescription",
      bulletin?.pastorDeskBibleVerseDescription,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    setValue("keepingOnCourseBy", bulletin?.keepingOnCourseBy, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("specialFeature", bulletin?.specialFeature, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      "scripturalReadingBibleVerse",
      bulletin?.scripturalReadingBibleVerse,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    setValue(
      "scripturalReadingBibleVerseBy",
      bulletin?.scripturalReadingBibleVerseBy,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    setValue("startDate", formattedStartDate, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("endDate", formattedEndDate, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [bulletin]);

  const submitData = () => {
    const data = getValues();
    try {
      UpdateBulletinData(bulletinId, data);
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/admin/bulletin");
    }
  };
  return (
    <AdminLayout>
      <Container className=" md:px-[3.125rem] px-[2.5rem] pt-6 pb-7 ">
        <form onSubmit={handleSubmit(submitData)}>
          <div className=" flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
            <BackButton text="Create Bulletin Information" />

            <Button
              type="submit"
              className=" w-28 disabled:bg-slate-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              {" "}
              <Spinner color="orange" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-between gap-4 mt-4 ">
              <div className="flex flex-col flex-wrap justify-between w-full gap-5 px-3 pt-6 pb-8 bg-white rounded-lg md:flex-row h-fit gap-y-3 gap-x-3 font-poppins">
                <div className="font-semibold text-2xl">
                  <h2>Schedule Date </h2>
                </div>

                <div className=" md:w-full w-full grid grid-cols-2 gap-4 gap-y-3">
                  <div className=" h-[3.75rem] cursor-pointer">
                    <span className=" italic">
                      Select a start date{" "}
                      <span className="text-red-500">*</span>{" "}
                      {errors?.startDate && (
                        <span className="text-red-500 italic">
                          {errors.startDate.message}
                        </span>
                      )}
                    </span>
                    <Input
                      type="date"
                      placeHolder="Start Date"
                      {...register("startDate", {
                        required: "Start date is required",
                      })}
                    />
                  </div>

                  <div className=" h-[3.75rem] cursor-pointer">
                    <span className=" italic">
                      Select an end date <span className="text-red-500">*</span>
                      {errors?.endDate && (
                        <span className="text-red-500 italic">
                          {errors.endDate.message}
                        </span>
                      )}
                    </span>
                    <Input
                      type="date"
                      placeHolder="End Date"
                      {...register("endDate", {
                        required: "End date is required",
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-wrap justify-between w-full gap-5 px-3 pt-6 pb-8 bg-white rounded-lg md:flex-row h-fit gap-y-3 gap-x-3 font-poppins">
                <div className="text-2xl font-semibold">
                  <h2>Welcome</h2>
                </div>
                <div className="grid w-full grid-cols-3 gap-4  md:w-full gap-y-3">
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="theme for this quarter"
                      {...register("themeForTheQuarter", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="topic for the week"
                      {...register("topicForTheWeek", {})}
                    />
                  </div>
                  <div className="h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="memory verse"
                      {...register("lessonMemoryVerse", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="memory test"
                      {...register("lessonMemoryTest", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Zoom link account"
                      {...register("onLineZoomLink", {})}
                    />
                  </div>
                  <div className="h-[3rem]">
                    <Input
                      type="text"
                      placeHolder="Midweek prayer zoom link "
                      {...register("midweekPrayerZoomLink", {})}
                    />
                  </div>
                  <div className="h-[3rem]">
                    <Input
                      type="text"
                      placeHolder="Early Morning Prayer zoom Link"
                      {...register("earlyMorningPrayerZoomLink", {})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-wrap justify-between w-full gap-5 px-3 pt-6 pb-8 bg-white rounded-lg md:flex-row h-fit gap-y-3 gap-x-3 font-poppins">
                <div className="text-2xl font-semibold">
                  <h2>Sabbath School</h2>
                </div>
                <div className="grid w-full grid-cols-3 gap-4  md:w-full gap-y-3">
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Singspiration time"
                      {...register("singspirationTime", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Song Leader"
                      {...register("songLeader", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Opening Prayer by"
                      {...register("openingPrayerBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Welcome /Supt's Openning Remark by"
                      {...register("openningRemarkBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Welcome / Opening Hymn"
                      {...register("openingHymn", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Welcome / Opening Hymn by"
                      {...register("openingHymnBy", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="keeping On Course by"
                      {...register("keepingOnCourseBy", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Mission Spotlight by"
                      {...register("missionSpotlightBy", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="study Time, Lession Introduction by"
                      {...register("lessonIntroductionBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Unit Activities (35 Minutes) by"
                      {...register("unitActivities", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Lesson Summary by"
                      {...register("lessonSummaryBy", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Friend's Time by"
                      {...register("friendTimeBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Special Features"
                      {...register("specialFeature", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Announcement / Closing Remark by"
                      {...register("annnouncementClosingRemarkBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Closing Hymn No"
                      {...register("ssClosingHymnNo", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Closing Hymn by"
                      {...register("ssClosingHymnBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Sabbath School Closing Prayer by"
                      {...register("ssClosingPrayerBy", {})}
                    />
                  </div>
                </div>
              </div>{" "}
              <div className="flex flex-col flex-wrap justify-between w-full gap-5 px-3 pt-6 pb-8 bg-white rounded-lg md:flex-row h-fit gap-y-3 gap-x-3 font-poppins">
                {/* <div className="border-b border-slate-500"></div> */}

                <div className="text-2xl font-semibold">
                  <h2>Divine Service</h2>
                </div>

                <div className="grid w-full grid-cols-3 gap-4  md:w-full gap-y-3">
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Prelude"
                      {...register("prelude", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Call To Worship Hymn No"
                      {...register("callToWorshipHymnNo", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Call To Worship By"
                      {...register("callToWorshipBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Invocation"
                      {...register("invocation", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Opening Hymn No"
                      {...register("divineServiceOpeningHymnNo", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Welcome / Opening Hymn by"
                      {...register("divineServiceOpeningHymnBy", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Pastoral Prayer By"
                      {...register("pastoralPrayerBy", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Stewardship By"
                      {...register("stewardshipBy", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Musical Selection By"
                      {...register("musicalSelectionBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Spiritual Reading Bible Verse"
                      {...register("scripturalReadingBibleVerse", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Spiritual Reading Bible VerseBy"
                      {...register("scripturalReadingBibleVerseBy", {})}
                    />
                  </div>{" "}
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Hymn Of Concecration No"
                      {...register("hymnOfConcecrationNo", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Sermon Title"
                      {...register("sermonTitle", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Preacher"
                      {...register("preacher", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Hymn Of Concecration No By"
                      {...register("hymnOfConcecrationNoBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Closing Hymn No"
                      {...register("divineServiceClosingHymnNo", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Closing Hymn By"
                      {...register("divineServiceClosingHymnBy", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Benediction"
                      {...register("benediction", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Doxology"
                      {...register("doxology", {})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-wrap justify-between w-full gap-5 px-3 pt-6 pb-8 bg-white rounded-lg md:flex-row h-fit gap-y-3 gap-x-3 font-poppins">
                <div className="w-full pb-2">
                  <div className="text-2xl font-semibold">
                    <h2>Announcements</h2>
                  </div>
                  <div className=" h-[3.75rem] w-full">
                    <div className="mb-12">
                      <div className="flex items-center mt-1">
                        <Select
                          isMulti={true}
                          className="w-full mb-6"
                          instanceId="announcements"
                          placeholder="Select announcement"
                          hideSelectedOptions={true}
                          minMenuHeight={10}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          defaultValue={
                            bulletin?.announcements &&
                            bulletin.announcements.length > 0 &&
                            bulletin?.announcements.map((item) => {
                              return {
                                label: item.content,
                                value: item.id,
                              };
                            })
                          }
                          theme={
                            {
                              borderRadius: 10,
                              spacing: {
                                baseUnit: 6.3,
                                menuGutter: 4,
                              },
                            } as any
                          }
                          options={announcements.map((item) => {
                            return {
                              label: item.content,
                              value: item.id,
                            };
                          })}
                          onChange={(selectedAnnouncements) => {
                            const anounce = selectedAnnouncements.map(
                              (item: any) => item.value as string
                            );
                            console.log(
                              selectedAnnouncements,
                              "selectedAnnouncementsrst"
                            );
                            // setSelectedAnnouncements(anounce);
                            setValue("announcementIds", anounce, {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            });
                          }}
                        />
                        {isValid && (
                          <CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
                        )}
                      </div>

                      {errors.content?.type === "required" && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.content?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-wrap justify-between w-full gap-5 px-3 pt-6 pb-8 bg-white rounded-lg md:flex-row h-fit gap-y-3 gap-x-3 font-poppins">
                <div className="text-2xl font-semibold">
                  <h2>Pastor's Desk</h2>
                </div>

                <div className="grid w-full grid-cols-2 gap-4  md:w-full gap-y-3">
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Bible Verse"
                      {...register("pastorDeskBibleVerse", {})}
                    />
                  </div>
                  <div className=" h-[3.75rem]">
                    <Input
                      type="text"
                      placeHolder="Bible Verse Description"
                      {...register("pastorDeskBibleVerseDescription", {})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </Container>
    </AdminLayout>
  );
};
export default withAuth(EditBulletin);
