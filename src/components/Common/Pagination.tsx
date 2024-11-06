const PaginationButton = ({
  fetchDataHandler,
}: {
  fetchDataHandler: () => void;
}) => {
  return (
    <div
      onClick={() => fetchDataHandler()}
      className="text-center rounded-lg border p-3 border-slate-300 w-full cursor-pointer hover:bg-orange-500 hover:text-white hover:duration-600 hover:border-orange-500"
    >
      Load more
    </div>
  );
};

export default PaginationButton;
