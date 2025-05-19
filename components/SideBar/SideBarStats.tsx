import { Dot } from "lucide-react";
import React from "react";

import { PixelifySans } from "@/app/layout";

function SideBarStats() {
  return (
    <div className="stats flex flex-col gap-2 w-full  px-4 py-7 text-md ">
      <div className=" flex flex-row justify-between w-full ">
        <h1>wallet status</h1>
        <h1 className="flex">
          <Dot color="green" />
          active
        </h1>
      </div>
      <div className=" flex flex-row justify-between w-full">
        <h1>
          transactions
          <span
            className={
              PixelifySans.className + " text-primary text-xs align-top"
            }
          >
            {" "}
            +120%
          </span>
        </h1>
        <h1 className=" text-primary">968212</h1>
      </div>
      <div className=" flex flex-row justify-between w-full">
        <h1>opts users</h1>
        <h1 className="text-primary">301200</h1>
      </div>
      <div className=" flex flex-row justify-between w-full">
        <h1>total reserves</h1>
        <h1 className="text-primary">$979308</h1>
      </div>
    </div>
  );
}

export default SideBarStats;
