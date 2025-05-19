"use client";
import React from "react";

import SideBarStats from "./SideBarStats";
import SideBarMenuBar from "./SideBarMenuBar";
import SideBarLogo from "./SideBarLogo";

function Sidebar() {
  return (
    <div className="flex flex-col justify-start items-start align-top gap-10 rounded-small min-h-full">
      <SideBarLogo />
      <SideBarStats />
      <SideBarMenuBar />
    </div>
  );
}

export default Sidebar;
