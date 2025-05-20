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
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
      <div className="navbar w-full flex flex-col sm:flex-row rounded-sm sm:rounded-md justify-between bg-content1 py-2 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6">
        <div className="balance" />
        <div className="chainAndWallet flex flex-row gap-3 sm:gap-4 md:gap-5 items-center">
          <ActiveChainSwitcher />
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