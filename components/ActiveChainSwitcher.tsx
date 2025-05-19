import { Select, SelectItem } from "@heroui/react";
import React from "react";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import { polygonAmoy } from "thirdweb/chains";
import { Chain } from "thirdweb";

import { elysiumChain } from "./ConnectWalletButton";

// Define the chain configuration type for type safety
interface ChainConfig {
  key: string;
  label: string;
  chain: Chain;
}

function ActiveChainSwitcher({ label }: { label: string }) {
  const switchChainTW = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();

  // Define the chains array with type
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

  // Find the key of the currently active chain
  const activeChainKey =
    chains.find((chain) => chain.chain.id === activeChain?.id)?.key ??
    chains[0].key; // Fallback to first chain if no match

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
      // Optionally, show a user-facing error (e.g., toast notification)
    }
  };

  return (
    <div className="chain">
      <Select
        className="w-56 text-sm"
        classNames={{
          listbox: "rounded-small",
          selectorIcon: "rounded-small",
          listboxWrapper: "rounded-small",
          innerWrapper: "rounded-small",
          popoverContent: "rounded-small",
        }}
        color="primary"
        isDisabled={!switchChainTW} // Disable if no wallet is connected
        label={label}
        labelPlacement="outside-left"
        radius="sm"
        selectedKeys={[activeChainKey]} // Use controlled selectedKeys
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
          <SelectItem key={chain.key} color="primary">
            {chain.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default ActiveChainSwitcher;
