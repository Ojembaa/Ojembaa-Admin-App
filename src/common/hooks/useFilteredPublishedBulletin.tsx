"use clint";
import { useEffect, useState } from "react";
import { BulletinStatusEnum, IBulletin } from "../interfaces";
import { useGetbulletins } from "@/hooks/useGetBulletins";

const useFilteredPublishedBulletin = () => {
  const [publishedData, setPublishedData] = useState<IBulletin>();
  const { fetchBulletins, loading, bulletins } = useGetbulletins();

  const currentDate = new Date().toISOString();
  const today = new Date().getTime();

  useEffect(() => {
    fetchBulletins({ current_date: currentDate });
  }, []);

  useEffect(() => {
    if (bulletins.length === 0) return;

    const publishedBulletin = bulletins.filter(
      (bulletin) => bulletin.status === BulletinStatusEnum.PUBLISHED
    ); // Pick all the bulletin whose status is published
    const bulletin =
      publishedBulletin.length > 0
        ? publishedBulletin.reduce((closest, current) => {
            const currentDiff = Math.abs(+new Date(current.startDate) - today);
            const closestDiff = Math.abs(+new Date(closest.startDate) - today);

            return currentDiff < closestDiff ? current : closest;
          })
        : null; // then from the list of the published, select the bulletin which start date is closer to today's date

    if (bulletin) {
      setPublishedData(bulletin);
    }
  }, [bulletins]);

  return {
    loading,
    publishedData,
  };
};

export default useFilteredPublishedBulletin;
