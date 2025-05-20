"use client";
import { Select, SelectItem } from "@heroui/react";
import React from "react";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import { polygonAmoy } from "thirdweb/chains";
import { Chain } from "thirdweb";

import { elysiumChain } from "./ConnectWalletButton";

interface ChainConfig {
  key: string;
  label: string;
  chain: Chain;
}

function ActiveChainSwitcher({ label,isOut }: { label?: string,isOut?:boolean }) {
  const switchChainTW = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();

  const chains: ChainConfig[] = [
    {
      key: "ely",
      label: "Elysium",
      chain: elysiumChain,
    },
    {
      key: "pol",
      label: "Polygon",
      chain: polygonAmoy,
    },
  ];

  const activeChainKey =
    chains.find((chain) => chain.chain.id === activeChain?.id)?.key ??
    chains[0].key;

  const handleChainSwitch = async (selectedKey: string) => {
    try {
      const selectedChain = chains.find((chain) => chain.key === selectedKey);
      if (selectedChain && switchChainTW) {
        await switchChainTW(selectedChain.chain);
      } else {
        console.warn("No chain found for key:", selectedKey);
      }
    } catch (error) {
      console.error("Failed to switch chain:", error);
    }
  };

  return (
    <div className="chain w-full flex items-center">
      <Select
        className="w-full sm:w-40 md:w-48 text-xs sm:text-sm md:text-base"
        classNames={{
          listbox: "rounded-sm sm:rounded-md",
          selectorIcon: "rounded-sm sm:rounded-md",
          listboxWrapper: "rounded-sm sm:rounded-md",
          innerWrapper: "rounded-sm sm:rounded-md",
          popoverContent: "rounded-sm sm:rounded-md",
          label: "!text-primary text-sm sm:text-base md:text-lg font-bold",
        }}
        color="primary"
        isDisabled={!switchChainTW}
        label={label ? label : undefined}
        labelPlacement="outside"
        radius="sm"
        selectedKeys={[activeChainKey]}
        size="sm"
        variant="underlined"
        onChange={(e) => {
          const selectedKey = e.target.value;
          if (selectedKey) {
            handleChainSwitch(selectedKey);
          }
        }}
      >
        {chains.map((chain) => (
          <SelectItem key={chain.key} color="primary" className="text-xs sm:text-sm md:text-base">
            {chain.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default ActiveChainSwitcher;