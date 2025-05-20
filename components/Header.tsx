"use client";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import ConnectWalletButton from "./ConnectWalletButton";
import ActiveChainSwitcher from "./ActiveChainSwitcher";

function Header() {
  const chains = [
    { key: "eth", label: "Ethereum" },
    { key: "bsc", label: "BSC" },
    { key: "matic", label: "Polygon" },
  ];

  return (
    <div className="w-full flex flex-col  sm:flex-row gap-4 sm:gap-6 md:gap-8">
      <div className="navbar w-full justify-center md:justify-end flex flex-col sm:flex-row rounded-sm sm:rounded-md  bg-content1 py-0 sm:py-0 md:py-4 px-0 sm:px-0 md:px-6">
        <div className="chainAndWallet  flex flex-col gap-3 sm:flex-row sm:gap-2 md:gap-2 items-center">
          <div className="flex w-full flex-row gap-2 justify-center items-center align-middle">
            <ConnectWalletButton />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;