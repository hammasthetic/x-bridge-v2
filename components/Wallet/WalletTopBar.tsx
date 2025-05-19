"use client";
import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import React from "react";

function WalletTopBar() {
  return (
    <div className=" topBar flex flex-row justify-between">
      <h1 className=" text-content2 text-lg font-bold align-middle flex items-center">
        Bridgeable Assets
      </h1>
      <div className=" flex flex-row justify-end gap-2 items-center align-middle">
        <Input
          isClearable
          color="primary"
          placeholder="Search"
          radius="sm"
          size="sm"
          startContent={<SearchIcon className=" text-primary" />}
          variant="underlined"
        />
      </div>
    </div>
  );
}

export default WalletTopBar;
