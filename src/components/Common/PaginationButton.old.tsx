import React from "react";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const PaginationButton = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: (val: number) => void;
  totalPages: number;
}) => {
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 2,
      },
    },
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          showNextButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-orange-400 rounded-md ">
              <ChevronRightIcon
                width={15}
                color="white"
                className="font-bold"
              />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-orange-400 rounded-md">
              <ChevronLeftIcon width={15} color="white" className="font-bold" />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-8"
        pageClassName="block border- border-solid border-orange-400 hover:bg-orange-500 w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-[#304D30] text-white"
      />
    </motion.div>
  );
};

export default PaginationButton;
//Inspiration from here: https://www.youtube.com/watch?v=GWsS2eYFZOk
