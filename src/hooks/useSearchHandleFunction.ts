// import { useGetbulletins } from "./useGetCategories";

// export const useHandleSearchFunction = () => {
//   const { bulletins, loading } = useGetbulletins();

//   const handleSearch = (
//     query: string,
//     setFilteedBulletins: (data: any[]) => void
//   ) => {
//     if (query.trim() === "") {
//       setFilteedBulletins(bulletins);
//     } else {
//       const bulletinSearchResults =
//         bulletins &&
//         bulletins.filter((item) => {
//           return item.themeForTheQuarter
//             .toLocaleLowerCase()
//             .includes(query.toLocaleLowerCase());
//         });
//       setFilteedBulletins(bulletinSearchResults);
//     }
//   };

//   return { handleSearch, loading };
// };
