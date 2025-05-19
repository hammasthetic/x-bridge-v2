import React from "react";

import { PixelifySans } from "@/app/layout";

function SideBarLogo() {
  return (
    <div className="logo bg-content1 w-full flex items-center align-middle justify-center py-1 rounded-small  ">
      <h1 className="">
        <span className=" font-light text-3xl text-primary ">X</span>
        <span className="text-2xl">.</span>
        <span className={PixelifySans.className + " text-2xl"}>BRIDGE</span>
      </h1>
    </div>
  );
}

export default SideBarLogo;
