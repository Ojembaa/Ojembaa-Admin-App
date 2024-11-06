"use client";

import Image from "next/image";

const Header = ({ open }: { open: () => void }) => {
  return (
    <div className="bg-[#F4F4F4] h-[4rem] w-full flex justify-between md:justify-end lg:justify-between items-center  md:pr-[4.625rem] pr-[2.625rem] lg:pl-[25.8125rem] shadow-xl v-2 blur-4 bg-opacity-20">
      <p
        className={`text-[#304D30] text-base md:text-[1.5rem] lg:block hidden md-block font-bold font-charm`}
      >
        "Seventh-Day Adventist Church, Ogba | E-Bulletin "
      </p>
      <div
        className="flex items-center justify-center gap-5 ml-[1.625rem] w-fit md:hidden"
        onClick={() => open()}
      >
        <Image
          src={"/assets/svgs/logo-purple-dots.svg"}
          className=""
          alt="icon"
          width={44.9}
          height={44.9}
        />

        <Image
          src={"/assets/svgs/logo-dark.svg"}
          className=""
          alt="icon"
          width={59}
          height={62}
        />
      </div>

      <div className=" flex gap-x-[1.5625rem]">
        <Image
          src={"/assets/svgs/notification-icon.svg"}
          className=""
          alt="icon"
          width={28}
          height={28}
        />

        {/* <div className=" h-[2.625rem] w-[2.625rem] rounded-full bg-black"> */}
        <Image
          src={"/assets/svgs/avatar.svg"}
          className=""
          alt="icon"
          width={42}
          height={42}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;
