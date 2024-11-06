import { IKeywords } from "@/common/interfaces";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function Search({ onSearch }: IKeywords) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className=" bg-white w-[17.9375rem] h-[2.9375rem] border border-black rounded-lg flex pl-[.9375rem] gap-x-5 font-poppins">
      <Image
        src={"/assets/svgs/search-icon.svg"}
        className=""
        alt="icon"
        width={18}
        height={18}
      />
      <input
        type="text"
        value={searchQuery}
        className=" w-full h-full focus:outline-none rounded-lg"
        placeholder="Search..."
        onChange={handleInputChange}
      />
    </div>
  );
}
