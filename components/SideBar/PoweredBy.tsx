"use client";
import { PixelifySans } from "@/app/layout";
import { Button } from "@heroui/react";
import { QrCode, Send } from "lucide-react";
import React from "react";

function PoweredBy() {
  return (
    <div className="opts grid grid-cols-2 rounded-small overflow-hidden">
      <div className=" flex flex-col bg-primary justify-start gap-2 px-10 py-7">
        <h1 className="font-light ">A Project By</h1>
        <h1 className={` text-3xl font-bold  ${PixelifySans.className}`}>HELENBIT TECHNOLOGIES</h1>
        <div className=" flex flex-row justify-start gap-5">
          <Button
            className=" bg-content1 text-primary"
            radius="sm"
            size="sm"
            startContent={<QrCode size={20} />}
          >
            Deposit
          </Button>
          <Button
            className=" bg-content1 text-primary"
            radius="sm"
            size="sm"
            startContent={<Send size={20} />}
          >
            Send
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1 bg-content1 w-full justify-center items-center align-middle">
        <p className=" text-sm text-primary">Powered By</p>
        <h1 className={` text-5xl   ${PixelifySans.className}`}>
          Elysium X Polygon
        </h1>
      </div>
    </div>
  );
}

export default PoweredBy;
