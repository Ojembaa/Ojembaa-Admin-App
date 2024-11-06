export type TableProps = {
  data: any[];
  columns: any[];
  onClick?: () => void;
};

export default function Table({ data, columns, onClick }: TableProps) {
  return (
    <div className="md:w-[calc(100vw-23.5625rem)] md:max-w-[calc(100vw-23.5625rem)] w-[85vw] max-w-[85vw] overflow-auto font-poppins h-[calc(100vh-13.75rem)] max-h-[calc(100vh-13.75rem)]">
      <table className=" w-full table-auto">
        <thead className="whitespace-nowrap sticky top-0 z-20 bg-white">
          <tr>
            {columns.map(({ column, key }) => (
              <th
                key={key}
                className=" pt-6 pb-[1.3125rem] capitalize font-semibold text-center "
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row?.key}
              className={rowIndex % 2 === 0 ? "bg-[#D8D4E5]" : ""}
              onClick={onClick}
            >
              {columns.map(({ column, key }) => (
                <td
                  key={key}
                  className="font-normal pt-[.9375rem] pb-[.6875rem] px-5 text-center"
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
