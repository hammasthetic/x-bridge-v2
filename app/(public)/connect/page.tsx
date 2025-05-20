"use client";
import { LoaderPinwheel } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";

import { PixelifySans } from "@/config/fonts";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function Home() {
  const activeAccount = useActiveAccount();

  return (
    <main className="flex flex-col min-h-screen justify-center transition-all items-center gap-6 p-4 sm:p-6 md:p-8 w-full">
      <div className="w-full max-w-3xl flex flex-col text-center items-center gap-4 sm:gap-5 md:gap-6 justify-center">
        <h1 className="flex items-center gap-1 sm:gap-2">
          <span className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary">
            X
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl">.</span>
          <span
            className={`${PixelifySans.className} text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl`}
          >
            BRIDGE
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-md mx-auto">
          Start roaming the chain worlds with <br className="sm:inline" /> no
          limits.
        </p>
      </div>
      {activeAccount ? (
        <LoaderPinwheel className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary animate-spin-slow " />
      ) : (
        <ConnectWalletButton />
      )}
    </main>
  );
}
