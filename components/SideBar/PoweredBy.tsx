"use client";
import Link from "next/link";
import { Link2 } from "lucide-react";
import React from "react";
import { PixelifySans } from "@/config/fonts";

function PoweredBy() {
  return (
    <div className="opts grid grid-cols-1 sm:grid-cols-2  rounded-sm sm:rounded-md overflow-hidden">
      <div className="flex flex-col bg-primary justify-start gap-1 sm:gap-2 p-2 sm:p-2 md:p-4   ">
        <h1 className="font-bold text-sm sm:text-base md:text-lg">A Project By</h1>
        <Link href="https://www.linkedin.com/company/helenbit/" className={`${PixelifySans.className} flex flex-row items-center align-middle gap-2 underline text-lg sm:text-lg md:text-xl lg:text-2xl`}>HELENBIT TECHNOLOGIES <Link2/> </Link>
      </div>
      <div className="flex flex-col gap-1 p-4 sm:gap-2 bg-content1 w-full justify-center items-center">
        <p className="text-xs sm:text-sm md:text-base text-primary">Powered By</p>
        <h1 className={`${PixelifySans.className} text-lg sm:text-lg md:text-xl lg:text-2xl`}>
          Elysium X Polygon
        </h1>
      </div>
    </div>
  );
}

export default PoweredBy;