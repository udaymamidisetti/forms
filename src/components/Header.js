import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-[#3b3b3be6]/[0.9]">
      <div className="h-[80px] max-w-[1120px] m-auto flex items-center justify-between">
        <div className="">
          <h1 className="text-[white] font-semibold">Our Logo</h1>
        </div>
        <div className="flex gap-[50px] items-center">
          <button className="bg-[#ec971f] text-[14px] pl-[20px] pr-[20px] pt-[7px] pb-[7px] text-[white] rounded-[3px]">
            Sign Up
          </button>
          <h1 className="text-[#ffffff] text-[1rem] cursor-pointer">TRY IT</h1>
          <h1 className="text-[#cccccc] hover:text-[white] cursor-pointer">
            PRO
          </h1>
          <h1 className="text-[#cccccc] hover:text-[white] cursor-pointer">
            LEARN
          </h1>
          <h1 className="text-[#cccccc] hover:text-[white] cursor-pointer">
            SIGN IN
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
