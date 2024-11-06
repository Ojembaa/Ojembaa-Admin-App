"use client";

import BackButton from "@/components/Admin/backButton";
import Container from "@/components/Admin/Container";
import AdminLayout from "@/components/Admin/layout";
import { Spinner } from "@/components/Common/Spinner";
import { useEffect } from "react";
import { useGetBulletinById } from "@/hooks/useGetBulletinById";
import Button from "@/components/Admin/button";
import { usePublishBulletin } from "@/hooks/usePublishBulletin";
import { BulletinStatusEnum } from "@/common/interfaces";
import withAuth from "@/common/HOC/withAuth";

const ListBulletin = ({ params }: { params: { slug: string } }) => {
  const { fetchBulletinById, bulletin, isLoading } = useGetBulletinById();
  const { PublishBulletin, loading, message } = usePublishBulletin();
  const bulletinId = params.slug;

  useEffect(() => {
    fetchBulletinById(bulletinId);
  }, [bulletinId, message]);

  const handlePublish = () => {
    if (bulletin?.status === BulletinStatusEnum.PUBLISHED) {
      PublishBulletin(bulletinId, BulletinStatusEnum.DRAFT);
    } else {
      PublishBulletin(bulletinId, BulletinStatusEnum.PUBLISHED);
    }
    fetchBulletinById(bulletinId);
  };

  return (
    <AdminLayout>
      <Container className="md:px-[3.125rem] px-[2.5rem] pt-6 pb-7 ">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
            <BackButton text="Bulletin List Page" />
          </div>
          <div className="gap-2 p-3">
            <Button
              className={`p-3 ${
                bulletin?.status !== BulletinStatusEnum.PUBLISHED
                  ? "bg-green-900  hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-800"
              }`}
              onClick={() => handlePublish()}
            >
              {!loading && bulletin?.status !== BulletinStatusEnum.PUBLISHED
                ? "Publish"
                : !loading && bulletin?.status === BulletinStatusEnum.PUBLISHED
                ? "UnPublish"
                : loading
                ? "Processing"
                : ""}
            </Button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            {" "}
            <Spinner color="orange" />
          </div>
        ) : (
          <div className="flex-col w-full px-5 pt-6 pb-8 bg-white rounded-lg md:flex-row h-fit gap-y-3 gap-x-3 font-poppins">
            <section className="pt-5 md:pt-0" id="sabbathschool">
              <div className="font-serif text-3xl pb-2 mb-5 dark:text-orange-400 text-[#304D30] text-center italic ">
                Welcome to{" "}
                <span className="text-base italic text-orange-500">
                  Seventh-Day Adventist Church, OGBA{" "}
                </span>
                <div className="border border-orange-500 "></div>
              </div>
              <div className="space-y-2">
                <div className="text-center flex justify-center ">
                  <blockquote className="rounded-lg capitalize bg-[#EEF0E5] py-2 w-full">
                    <p className="text-orange-400 underline">
                      THEME FOR THIS QUARTER
                    </p>
                    {bulletin?.themeForTheQuarter
                      ? bulletin.themeForTheQuarter
                      : "-"}
                  </blockquote>
                </div>
                <div className="text-center flex justify-center ">
                  <blockquote className="rounded-lg capitalize bg-[#EEF0E5] py-2 w-full ">
                    <p className="text-orange-400 underline">
                      TOPIC FOR THE WEEK
                    </p>
                    {bulletin?.topicForTheWeek ? bulletin.topicForTheWeek : "-"}
                  </blockquote>
                </div>
                <div className="text-center flex justify-center ">
                  <blockquote className="rounded-lg capitalize bg-[#EEF0E5] py-2 w-full ">
                    <p className="text-orange-400 underline">MEMORY TEXT</p>

                    <span className="px-1 italic ">
                      {bulletin?.lessonMemoryTest
                        ? bulletin.lessonMemoryTest
                        : "-"}
                      <span className="font-bold">
                        (
                        {bulletin?.lessonMemoryVerse
                          ? bulletin.lessonMemoryVerse
                          : "-"}
                        )
                      </span>
                    </span>
                  </blockquote>
                </div>

                {bulletin?.onLineZoomLink && (
                  <div className="text-center flex justify-center ">
                    <blockquote className="rounded-lg capitalize bg-[#EEF0E5] py-2 w-full  overflow-auto">
                      <a
                        href={bulletin?.onLineZoomLink}
                        target="_blank"
                        className="text-blue-700 cursor-pointer"
                      >
                        <div className="">
                          <p className="underline">Join us Online via Zoom</p>

                          <p>Click here to join us online </p>
                          <span className="text-orange-500 ">
                            Every Sabbath Morning
                          </span>
                        </div>
                      </a>
                    </blockquote>
                  </div>
                )}

                {bulletin?.midweekPrayerZoomLink && (
                  <div className="text-center flex justify-center">
                    <blockquote className="rounded-lg capitalize bg-[#EEF0E5] py-2 w-full  overflow-auto">
                      <a
                        // href="https://us02web.zoom.us/j/83976497702?pwd=TmJpa3VBU05XUWlHb1JVOTY3S1gyQT09"
                        href={bulletin?.onLineZoomLink}
                        target="_blank"
                        className="text-blue-700 cursor-pointer "
                      >
                        <div className="">
                          <p className="underline">
                            Join us to pray on Midweek
                          </p>

                          <p>Click here to join us online</p>
                          <span className="text-xs text-orange-500">
                            Time: 8:00 PM Every Wednesday
                          </span>
                        </div>
                      </a>
                    </blockquote>
                  </div>
                )}
                {bulletin?.earlyMorningPrayerZoomLink && (
                  <div className="text-center flex justify-center">
                    <blockquote className="rounded-lg capitalize bg-[#304D30] py-2 w-full relative overflow-auto">
                      <div className="right-0 pr-1 pt-0 absolute">
                        <div className="bg-red-700 text-white px-2  rounded-lg">
                          New
                        </div>
                      </div>
                      <a
                        // href="https://us02web.zoom.us/j/82044972297?pwd=GmOaK1QcBfhnphBQ4KEQiUQnBwWilA.1"
                        href={bulletin?.onLineZoomLink}
                        target="_blank"
                        className="text-orange-500 cursor-pointer "
                      >
                        <div className="">
                          <p className="underline">Early Morning Prayer</p>

                          <p>Click here to join us online</p>
                          <span className="text-xs text-orange-500">
                            Time: 5:00 AM Every Wednesday and Sunday
                          </span>
                        </div>
                      </a>
                    </blockquote>
                  </div>
                )}
              </div>
            </section>

            <div>
              <section className="pt-10 dark:text-white " id="sabbathschool">
                <div className="font-serif dark:text-orange-400 text-3xl pb-2 mb-5 text-[#304D30] text-center border-b border-[#304D30]">
                  Sabbath School{" "}
                  <span className="text-base">(8:45 - 10:45 AM)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-3 capitalize">
                    {" "}
                    Singspiration (8:45 AM)
                  </div>
                  <div className="capitalize"> Song Leader</div>

                  <div className="col-span-3 capitalize">
                    Opening Remark (Welcome & Prayer)
                  </div>
                  <div className="">
                    {" "}
                    {bulletin?.openningRemarkBy
                      ? bulletin.openningRemarkBy
                      : "-"}
                  </div>

                  <div className="col-span-3 capitalize">
                    Welcome / Supt's Opening Remark
                  </div>
                  <div className=""> - </div>

                  <div className="col-span-3 capitalize">
                    {" "}
                    Welcome / Opening Hymn (
                    {bulletin?.openingHymn ? bulletin.openingHymn : "-"})
                  </div>
                  <div className="capitalize ">
                    {" "}
                    {bulletin?.openingHymnBy ? bulletin.openingHymnBy : "-"}
                  </div>
                  <div className="col-span-3 capitalize">
                    {" "}
                    Mission Spotlight{" "}
                  </div>
                  <div className="capitalize ">
                    {" "}
                    {bulletin?.missionSpotlightBy
                      ? bulletin.missionSpotlightBy
                      : "-"}
                  </div>
                  <div className="col-span-3 capitalize">
                    {" "}
                    Keeping on Course
                  </div>
                  <div className="capitalize ">
                    {" "}
                    {bulletin?.keepingOnCourseBy
                      ? bulletin.keepingOnCourseBy
                      : "-"}
                  </div>
                  <div className="col-span-3 capitalize">
                    {" "}
                    Study Time, Lession Introduction
                  </div>
                  <div className="capitalize ">
                    {" "}
                    {bulletin?.lessonIntroductionBy
                      ? bulletin.lessonIntroductionBy
                      : "-"}
                  </div>
                  <div className="col-span-3 capitalize">
                    Unit Activities / Lesson Study (40 Mins)
                  </div>
                  <div className="capitalize "> - </div>
                  <div className="col-span-3 capitalize">Lesson Summary</div>
                  <div className="capitalize ">
                    {" "}
                    {bulletin?.lessonSummaryBy
                      ? bulletin.lessonSummaryBy
                      : "-"}{" "}
                  </div>
                  <div className="col-span-3 capitalize">Friend's time</div>
                  <div className="capitalize ">
                    {" "}
                    {bulletin?.friendTimeBy ? bulletin.friendTimeBy : "-"}
                  </div>
                  <div className="col-span-3 capitalize">Special Feature</div>
                  <div className="capitalize ">
                    {" "}
                    {bulletin?.specialFeature ? bulletin.specialFeature : "-"}
                  </div>
                  <div className="col-span-3 capitalize">
                    Announcement / Closing Remark
                  </div>
                  <div className="capitalize ">
                    {" "}
                    {bulletin?.annnouncementClosingRemarkBy
                      ? bulletin.annnouncementClosingRemarkBy
                      : "-"}
                  </div>
                  <div className="col-span-3 capitalize">
                    Closing Hymn (
                    {bulletin?.ssClosingHymnNo ? bulletin.ssClosingHymnNo : "-"}
                    )
                  </div>
                  <div className="">
                    {bulletin?.ssClosingHymnBy ? bulletin.ssClosingHymnBy : "-"}
                  </div>
                  <div className="col-span-3 capitalize">Closing Prayer</div>
                  <div className="">
                    {" "}
                    {bulletin?.ssClosingPrayerBy
                      ? bulletin.ssClosingPrayerBy
                      : "-"}
                  </div>
                </div>
              </section>
            </div>
            <div id="divineservice">
              <section className="pt-10 dark:text-white " id="features">
                <div className="font-serif text-3xl pb-2 mb-5 text-[#304D30] text-center dark:text-orange-400 border-b border-[#304D30]">
                  Divine Service{" "}
                  <span className="text-base">(11:00 AM - 12:30 PM)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-3 "> Prelude</div>
                  <div className=""> Organist</div>

                  <div className="col-span-3 ">
                    Call to Worship: (
                    {bulletin?.callToWorshipHymnNo
                      ? bulletin.callToWorshipHymnNo
                      : "-"}
                    )
                  </div>
                  <div className="">
                    {" "}
                    {bulletin?.callToWorshipBy ? bulletin.callToWorshipBy : "-"}
                  </div>
                  <div className="col-span-3 "> Invocation</div>
                  <div className="">
                    {" "}
                    {bulletin?.invocation ? bulletin.invocation : "-"}
                  </div>
                  <div className="col-span-3 ">
                    {" "}
                    Welcome / opening Hymn (
                    {bulletin?.openingHymn ? bulletin.openingHymn : "-"})
                  </div>
                  <div className="">
                    {" "}
                    {bulletin?.openingHymnBy ? bulletin.openingHymnBy : "-"}
                  </div>
                  <div className="col-span-3 "> Pastoral Prayer</div>
                  <div className="">
                    {bulletin?.pastoralPrayerBy
                      ? bulletin.pastoralPrayerBy
                      : "-"}
                  </div>
                  <div className="col-span-3 "> Stewardship </div>
                  <div className="">
                    {" "}
                    {bulletin?.stewardshipBy ? bulletin.stewardshipBy : "-"}
                  </div>
                  <div className="col-span-3 "> Musical Selection (Choir)</div>
                  <div className="">
                    {bulletin?.musicalSelectionBy
                      ? bulletin.musicalSelectionBy
                      : "-"}{" "}
                  </div>
                  <div className="col-span-3 ">
                    Spiritual Reading (
                    {bulletin?.scripturalReadingBibleVerse
                      ? bulletin.scripturalReadingBibleVerse
                      : "-"}
                    )
                  </div>
                  <div className="">
                    {" "}
                    {bulletin?.scripturalReadingBibleVerseBy
                      ? bulletin.scripturalReadingBibleVerseBy
                      : "-"}
                  </div>
                  <div className="col-span-3 ">
                    Hymn of Concecration (
                    {bulletin?.hymnOfConcecrationNo
                      ? bulletin.hymnOfConcecrationNo
                      : "-"}
                    )
                  </div>
                  <div className="">
                    {" "}
                    {bulletin?.hymnOfConcecrationNoBy
                      ? bulletin.hymnOfConcecrationNoBy
                      : "-"}
                  </div>
                  <div className="col-span-3 ">
                    Sermon Title{" "}
                    <span className="font-bold">
                      {bulletin?.sermonTitle ? bulletin.sermonTitle : "-"}
                    </span>
                  </div>
                  <div className="">
                    {" "}
                    {bulletin?.preacher ? bulletin.preacher : "-"}
                  </div>
                  <div className="col-span-3 ">
                    Closing Hymn (
                    {bulletin?.ssClosingHymnNo ? bulletin.ssClosingHymnNo : "-"}
                    )
                  </div>
                  <div className="">
                    {bulletin?.ssClosingHymnBy ? bulletin.ssClosingHymnBy : "-"}
                  </div>
                  <div className="col-span-3 ">Benediction</div>
                  <div className="">
                    {bulletin?.benediction ? bulletin.benediction : "-"}
                  </div>
                  <div className="col-span-3 ">Doxology</div>
                  <div className=""> Congregation</div>
                </div>
              </section>
            </div>
            <div>
              <section className="px-5 pt-10" id="announcement">
                <div className="dark:text-orange-400 font-serif text-3xl pb-2 mb-5 text-[#304D30] text-center border-b border-[#304D30]">
                  Combined Announcement
                </div>
                <div className="space-y-4 dark:text-white">
                  <ol className="space-y-4 list-decimal">
                    {bulletin?.announcements! ? (
                      bulletin?.announcements?.map((item) => (
                        <li className="pb-2 border-b border-orange-200">
                          {item.content}
                        </li>
                      ))
                    ) : (
                      <div className="flex items-center justify-center italic">
                        {" "}
                        No announcement created for this week
                      </div>
                    )}
                  </ol>
                </div>
              </section>
            </div>

            <div id="pastordesk">
              <section className="pt-10 pb-10" id="features">
                <div className="dark:text-orange-400 font-serif text-3xl pb-4 mb-5 text-[#304D30] text-center border-b border-[#304D30]">
                  Pastor's Desk
                </div>
                <div className="space-y-3">
                  <div className="text-lg font-semibold underline">
                    <p className="dark:text-white">
                      {bulletin?.pastorDeskBibleVerse
                        ? bulletin?.pastorDeskBibleVerse
                        : "-"}
                    </p>
                  </div>
                  <p className="text-orange-500">
                    {bulletin?.pastorDeskBibleVerseDescription
                      ? bulletin?.pastorDeskBibleVerseDescription
                      : "-"}
                  </p>
                </div>
              </section>
            </div>
          </div>
        )}
      </Container>
    </AdminLayout>
  );
};
export default withAuth(ListBulletin);
