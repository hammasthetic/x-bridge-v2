"use client";
import React from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import ConnectWalletButton from "./ConnectWalletButton";
import ActiveChainSwitcher from "./ActiveChainSwitcher";

function Header() {
  const chains = [
    {
      key: "eth",
      label: "Ethereum",
    },
    {
      key: "bsc",
      label: "BSC",
    },
    {
      key: "matic",
      label: "Polygon",
    },
  ];

  return (
    <div className=" w-full flex flex-row  gap-10">
      <div className=" navbar w-full flex flex-row rounded-small justify-between bg-content1 py-2 px-5">
        <div className="balance" />
        <div className="chainAndWallet flex flex-row gap-5">
          <ActiveChainSwitcher  />
          <div className="wallet">
            <ConnectWalletButton />
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Header;
