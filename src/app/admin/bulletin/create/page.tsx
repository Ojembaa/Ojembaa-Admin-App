"use client";
import BackButton from "@/components/Admin/backButton";
import Button from "@/components/Admin/button";
import Container from "@/components/Admin/Container";
import AdminLayout from "@/components/Admin/layout";
import { useForm } from "react-hook-form";
import Input from "@/components/Admin/input";
import { useCreateBulletins } from "@/hooks/useCreateBulletin";
import { Spinner } from "@/components/Common/Spinner";
import { CreateBulletinDTO } from "@/common/interfaces";
import { useGetAnnouncements } from "@/hooks/useGetAnnouncements";
import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import withAuth from "@/common/HOC/withAuth";

const animatedComponents = makeAnimated();

const CreateBulletin = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateBulletinDTO>();
  const { CreateBulletins, loading } = useCreateBulletins();
  const { announcements, fetchAnnouncements } = useGetAnnouncements();

  useEffect(() => {
    fetchAnnouncements();

    setValue(
      "onLineZoomLink",
      "https://us02web.zoom.us/j/82591974493?pwd=Yk8vUEwrR1ZtZ1hvWEcvdFdjLzVWZz09",
      {
        shouldValidate: true,
      }
    );
    setValue(
      "earlyMorningPrayerZoomLink",
      "https://us02web.zoom.us/j/82044972297?pwd=GmOaK1QcBfhnphBQ4KEQiUQnBwWilA",
      {
        shouldValidate: true,
      }
    );

    setValue(
      "midweekPrayerZoomLink",
      "https://us02web.zoom.us/j/83976497702?pwd=TmJpa3VBU05XUWlHb1JVOTY3S1gyQT09",
      {
        shouldValidate: true,
      }
    );
  }, []);

  const submitData = () => {
    try {
      let data = getValues();
      data.startDate = new Date(data.startDate).toISOString();
      data.endDate =
        new Date(data.endDate).toISOString().split("T").at(0) +
        "T23:59:59.000Z";
      CreateBulletins(data);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  return (
    <>
      <AdminLayout>
        <Container className="md:px-[3.125rem] px-[2.5rem] pt-6 pb-7 ">
          <form onSubmit={handleSubmit(submitData)}>
            <div className=" flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
              <BackButton text="Create Bulletin Information" />
              <Button
                type="submit"
                className=" w-28 disabled:bg-slate-500"
                disabled={loading}
              >
                {loading ? "Creating" : "Save"}
              </Button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-96">
                {" "}
                <Spinner color="orange" />
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap gap-4 justify-between">
                <div className="w-full flex flex-wrap gap-5 justify-between  md:flex-row flex-col h-fit rounded-lg gap-y-3 gap-x-3 pb-8 pt-6 px-3 bg-white font-poppins mb-0">
                  <div className="font-semibold text-2xl">
                    <h2>Schedule Date </h2>
                  </div>

                  <div className=" md:w-full w-full grid grid-cols-2 gap-4 gap-y-3">
                    <div className=" h-[3rem]">
                      <span className="font-semibold">
                        Select a start date{" "}
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

                    <div className=" h-[3rem]">
                      <span className="font-semibold">
                        Select an end date{" "}
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
                <div className="w-full flex flex-wrap gap-5 justify-between  md:flex-row flex-col h-fit rounded-lg gap-y-3 gap-x-3 pb-8 pt-6 px-3 bg-white font-poppins">
                  <div className="font-semibold text-2xl">
                    <h2>Welcome</h2>
                  </div>
                  <div className="md:w-full w-full grid grid-cols-3 gap-4 gap-y-3">
                    <div className="h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="theme for this quarter"
                        {...register("themeForTheQuarter", {})}
                      />
                    </div>
                    <div className="h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="topic for the week"
                        {...register("topicForTheWeek", {})}
                      />
                    </div>
                    <div className="h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="memory verse"
                        {...register("lessonMemoryVerse", {})}
                      />
                    </div>
                    <div className="h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="memory test"
                        {...register("lessonMemoryTest", {})}
                      />
                    </div>

                    <div className="h-[3rem]">
                      <Input
                        disabled
                        type="text"
                        placeHolder="zoom link"
                        {...register("onLineZoomLink", {})}
                      />
                    </div>
                    <div className="h-[3rem]">
                      <Input
                        disabled
                        type="text"
                        placeHolder="midweek prayer zoom link "
                        {...register("midweekPrayerZoomLink", {})}
                      />
                    </div>
                    <div className="h-[3rem]">
                      <Input
                        disabled
                        type="text"
                        placeHolder="early Morning Prayer zoom Link"
                        {...register("earlyMorningPrayerZoomLink", {})}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-wrap gap-5 justify-between  md:flex-row flex-col h-fit rounded-lg gap-y-3 gap-x-3 pb-8 pt-6 px-3 bg-white font-poppins">
                  <div className="font-semibold text-2xl">
                    <h2>Sabbath School</h2>
                  </div>
                  <div className="md:w-full w-full grid grid-cols-3 gap-4 gap-y-3">
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Singspiration time"
                        {...register("singspirationTime", {})}
                        defaultValue="8:45"
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Song Leader"
                        {...register("songLeader", {})}
                        defaultValue="Song leader"
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Opening Prayer by"
                        {...register("openingPrayerBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Welcome /Supt's Opening Remark by"
                        {...register("openningRemarkBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Welcome / Opening Hymn"
                        {...register("openingHymn", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Welcome / Opening Hymn by"
                        {...register("openingHymnBy", {})}
                      />
                    </div>{" "}
                    <div className="h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="keeping On Course by"
                        {...register("keepingOnCourseBy", {})}
                      />
                    </div>{" "}
                    <div className="h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Mission Spotlight by"
                        {...register("missionSpotlightBy", {})}
                      />
                    </div>{" "}
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="study Time, Lesson Introduction by"
                        {...register("lessonIntroductionBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Unit Activities (35 Minutes) by"
                        {...register("unitActivities", {})}
                      />
                    </div>{" "}
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Lesson Summary by"
                        {...register("lessonSummaryBy", {})}
                      />
                    </div>{" "}
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Friend's Time by"
                        {...register("friendTimeBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Special Features"
                        {...register("specialFeature", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Announcement / Closing Remark by"
                        {...register("annnouncementClosingRemarkBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Closing Hymn No"
                        {...register("ssClosingHymnNo", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Closing Hymn by"
                        {...register("ssClosingHymnBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Sabbath School Closing Prayer by"
                        {...register("ssClosingPrayerBy", {})}
                      />
                    </div>
                  </div>
                </div>{" "}
                <div className="w-full flex flex-wrap gap-5 justify-between  md:flex-row flex-col h-fit rounded-lg gap-y-3 gap-x-3 pb-8 pt-6 px-3 bg-white font-poppins">
                  {/* <div className="border-b border-slate-500"></div> */}

                  <div className="font-semibold text-2xl">
                    <h2>Divine Service</h2>
                  </div>

                  <div className=" md:w-full w-full grid grid-cols-3 gap-4 gap-y-3">
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Prelude"
                        {...register("prelude", {})}
                        defaultValue="Organist"
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Call To Worship Hymn No"
                        {...register("callToWorshipHymnNo", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Call To Worship By"
                        {...register("callToWorshipBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Invocation"
                        {...register("invocation", {})}
                        defaultValue="Congregation"
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Opening Hymn No"
                        {...register("divineServiceOpeningHymnNo", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Welcome / Opening Hymn by"
                        {...register("divineServiceOpeningHymnBy", {})}
                      />
                    </div>{" "}
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Pastoral Prayer By"
                        {...register("pastoralPrayerBy", {})}
                      />
                    </div>{" "}
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Stewardship By"
                        {...register("stewardshipBy", {})}
                      />
                    </div>{" "}
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Musical Selection By"
                        {...register("musicalSelectionBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Spiritual Reading Bible Verse"
                        {...register("scripturalReadingBibleVerse", {})}
                      />
                    </div>{" "}
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Spiritual Reading Bible VerseBy"
                        {...register("scripturalReadingBibleVerseBy", {})}
                      />
                    </div>{" "}
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Hymn Of Consecration No"
                        {...register("hymnOfConcecrationNo", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Hymn Of Consecration No By"
                        {...register("hymnOfConcecrationNoBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Sermon Title"
                        {...register("sermonTitle", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Preacher"
                        {...register("preacher", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Hymn Of Consecration No By"
                        {...register("hymnOfConcecrationNoBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Closing Hymn No"
                        {...register("divineServiceClosingHymnNo", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Closing Hymn By"
                        {...register("divineServiceClosingHymnBy", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Benediction"
                        {...register("benediction", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Doxology"
                        {...register("doxology", {})}
                        defaultValue="Congregation"
                      />
                    </div>
                  </div>
                </div>{" "}
                <div className="w-full flex flex-wrap gap-5 justify-between  md:flex-row flex-col h-fit rounded-lg gap-y-3 gap-x-3 pb-8 pt-6 px-3 bg-white font-poppins">
                  <div className="w-full">
                    <div className="font-semibold text-2xl">
                      <h2>Announcements</h2>
                    </div>
                    <div className=" h-[3rem] w-full">
                      <div className="mb-12">
                        <div className="flex items-center mt-1">
                          <Select
                            isMulti={true}
                            className="w-full mb-6"
                            instanceId="announcements"
                            placeholder="Select permissions"
                            hideSelectedOptions={true}
                            minMenuHeight={10}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
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
                </div>{" "}
                <div className="w-full flex flex-wrap gap-5 justify-between  md:flex-row flex-col h-fit rounded-lg gap-y-3 gap-x-3 pb-8 pt-6 px-3 bg-white font-poppins">
                  <div className="font-semibold text-2xl">
                    <h2>Pastor's Desk</h2>
                  </div>

                  <div className=" md:w-full w-full grid grid-cols-2 gap-4 gap-y-3">
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Bible Verse"
                        {...register("pastorDeskBibleVerse", {})}
                      />
                    </div>
                    <div className=" h-[3rem]">
                      <Input
                        type="text"
                        placeHolder="Bible Verse Description"
                        {...register("pastorDeskBibleVerseDescription", {})}
                      />
                    </div>
                  </div>
                </div>{" "}
              </div>
            )}
          </form>
        </Container>
      </AdminLayout>
    </>
  );
};

export default withAuth(CreateBulletin);
