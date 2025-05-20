"use client";
import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import React from "react";

function WalletTopBar() {
  return (
    <div className="flex flex-row justify-between items-center p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto">
      <h1 className="text-content2 text-base sm:text-lg md:text-xl font-bold flex items-center">
        Bridgeable Assets
      </h1>
      <div className="flex flex-row justify-end gap-2 items-center w-full sm:w-auto max-w-xs">
        <Input
          isClearable
          color="primary"
          placeholder="Search"
          radius="sm"
          size="sm"
          startContent={<SearchIcon className="text-primary w-4 h-4 sm:w-5 sm:h-5" />}
          variant="underlined"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default WalletTopBar;