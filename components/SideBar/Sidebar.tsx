"use client";
import React from "react";
import SideBarStats from "./SideBarStats";
import SideBarMenuBar from "./SideBarMenuBar";
import SideBarLogo from "./SideBarLogo";

export default function Sidebar({ showStats = true }) {
  return (
    <div className="flex flex-col justify-start items-start gap-0 sm:gap-0 md:gap-8 rounded-sm sm:rounded-md min-h-full">
      <SideBarLogo />
      {showStats && <SideBarStats />}
      <SideBarMenuBar showStats={showStats} />
    </div>
  );
}