import { Button } from "@heroui/react";
import {
  Wallet,
  AlignVerticalDistributeEnd,
  SendToBack,
  FlaskConical,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function SideBarMenuBar() {
  return (
    <div className="menu flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-content1 w-full grow justify-between rounded-sm sm:rounded-md">
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-primary text-lg sm:text-xl md:text-2xl">Menu</h1>
        <div className="navbar justify-center flex md:flex-col gap-3 sm:gap-4 flex-row">
          <Button
            as={Link}
            className="flex flex-col md:flex-row gap-2 hover:text-primary-400 text-content2 text-sm sm:text-base"
            href="/wallet"
            variant="light"
          >
            <Wallet className="w-4 h-4" /> Wallet
          </Button>
          <Button
            as={Link}
            className="flex flex-col md:flex-row gap-2 hover:text-primary-400 text-content2 text-sm sm:text-base"
            href="/bridge"
            variant="light"
          >
            <AlignVerticalDistributeEnd className="w-4 h-4" /> Bridge
          </Button>
          <Button
            as={Link}
            className="flex flex-col gap-2 md:flex-row md:gap-0 hover:text-primary-400 text-content2 text-sm sm:text-base"
            href="#"
            variant="light"
          >
            <SendToBack className="w-4 h-4" /> Transactions
          </Button>
          <Button
            as={Link}
            className="flex flex-col md:flex-row gap-2 hover:text-primary-400 text-content2 text-sm sm:text-base"
            href="#"
            variant="light"
          >
            <FlaskConical className="w-4 h-4" /> Testnet
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SideBarMenuBar;