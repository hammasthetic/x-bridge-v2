import { PixelifySans } from "@/config/fonts";
import React from "react";

function SideBarLogo() {
  return (
    <div className="logo bg-content1 w-full flex items-center justify-center py-2 sm:py-3 md:py-4 rounded-sm sm:rounded-md">
      <h1 className="flex items-center gap-1 sm:gap-2">
        <span className="font-light text-xl sm:text-2xl md:text-3xl text-primary">X</span>
        <span className="text-lg sm:text-xl md:text-2xl">.</span>
        <span className={`${PixelifySans.className} text-content1 text-lg sm:text-xl md:text-2xl`}>BRIDGE</span>
      </h1>
    </div>
  );
}

export default SideBarLogo;