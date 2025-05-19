import { Button } from "@heroui/react";
import {
  Wallet,
  AlignVerticalDistributeEnd,
  SendToBack,
  FlaskConical,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function SideBarMenuBar() {
  return (
    <div className="menu flex flex-col gap-10 px-10 py-5 bg-content1 h-full w-full grow justify-between rounded-small">
      <div className=" space-y-8">
        <h1 className="text-primary text-2xl">menu</h1>
        <div className=" navbar flex flex-col gap-5 px-5">
          <Button
            as={Link}
            className=" flex flex-row gap-2 hover:text-primary-400 text-content2"
            href="/"
            variant="light"
          >
            <Wallet /> Wallet
          </Button>
          <Button
            as={Link}
            className=" flex flex-row gap-2 hover:text-primary-400 text-content2"
            href="/bridge"
            variant="light"
          >
            <AlignVerticalDistributeEnd /> Bridge
          </Button>
          <Button
            as={Link}
            className=" flex flex-row gap-2 hover:text-primary-400 text-content2"
            href="#"
            variant="light"
          >
            <SendToBack /> Transactions
          </Button>
          <Button
            as={Link}
            className=" flex flex-row gap-2 hover:text-primary-400 text-content2"
            href="#"
            variant="light"
          >
            <FlaskConical /> Testnet
          </Button>
        </div>
      </div>
      {/* <div className="addNetwork">
        <Button
          fullWidth
          className="text-primary text-sm"
          radius="sm"
          size="sm"
          startContent={<WalletCards size={20} />}
        >
          Add network to wallet
        </Button>
      </div> */}
    </div>
  );
}

export default SideBarMenuBar;
