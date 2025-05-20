import { PixelifySans } from "@/config/fonts";
import { Dot } from "lucide-react";
import React from "react";

function SideBarStats() {
  return (
    <div className="stats flex flex-col gap-2  md:flex sm:gap-3 w-full px-3 sm:px-4 md:px-5 py-4 sm:py-5 md:py-6 text-xs sm:text-sm md:text-base bg-content1 rounded-sm sm:rounded-md">
      <div className="flex flex-row justify-between w-full">
        <h1>Wallet Status</h1>
        <h1 className="flex items-center gap-1">
          <Dot className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          Active
        </h1>
      </div>
      <div className="flex flex-row justify-between w-full">
        <h1>
          Transactions
          <span className={`${PixelifySans.className} text-primary text-[0.6rem] sm:text-xs md:text-sm align-top`}> +120%</span>
        </h1>
        <h1 className="text-primary">968,212</h1>
      </div>
      <div className="flex flex-row justify-between w-full">
        <h1>OPTS Users</h1>
        <h1 className="text-primary">301,200</h1>
      </div>
      <div className="flex flex-row justify-between w-full">
        <h1>Total Reserves</h1>
        <h1 className="text-primary">$979,308</h1>
      </div>
    </div>
  );
}

export default SideBarStats;