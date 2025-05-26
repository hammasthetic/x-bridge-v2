"use client";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ConnectEmbed, useActiveAccount } from "thirdweb/react";

import { elysiumChain, wallets } from "@/components/ConnectWalletButton";
import { polygonAmoy } from "thirdweb/chains";
import { thirdWebClient } from "./providers";
import { PixelifySans } from "@/config/fonts";

export default function Home() {
  const activeAccount = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (activeAccount?.address) {
      router.push("/wallet");
    } else {
      router.push("/connect");
    }
  }, [activeAccount]);

  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center bg-transparent p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute w-full inset-0 -z-10">
        <div className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-primary/20 rounded-full animate-aura-move-1 blur-lg sm:blur-3xl" />
        <div className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-primary/25 rounded-full animate-aura-move-2 blur-lg sm:blur-3xl" />
        <div className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-primary/15 rounded-full animate-aura-move-3 blur-lg sm:blur-3xl" />
        <div className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-primary/30 rounded-full animate-aura-move-4 blur-lg sm:blur-3xl" />
        <div className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-primary/20 rounded-full animate-aura-move-4 blur-lg sm:blur-3xl" />
        <div className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-primary/25 rounded-full animate-aura-move-3 blur-lg sm:blur-3xl" />
        <div className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-primary/15 rounded-full animate-aura-move-2 blur-lg sm:blur-3xl" />
        <div className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-primary/30 rounded-full animate-aura-move-1 blur-lg sm:blur-3xl" />
      </div>
      <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 max-w-md mx-auto">
        <LoaderPinwheel className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary animate-spin-slow " />
        <h1 className="flex animate-pulse animate-drip-expand  items-center gap-1 sm:gap-2">
          <span className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary animate-pulse">
            X
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl text-gray-300">
            .
          </span>
          <span
            className={`${PixelifySans.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-100`}
          >
            BRIDGE
          </span>
        </h1>
      </div>
      <div className=" hidden">
       <ConnectEmbed
                        autoConnect={true}
                        chain={elysiumChain}
                        chains={[elysiumChain, polygonAmoy]}
                        client={thirdWebClient}
                        showAllWallets={false}
                        showThirdwebBranding={false}
                        style={{
                          width: "100%",
                          background: "transparent",
                          padding: "0px !important",
                          border: "none !important",
                          marginBottom: "10px",
                        }}
                        wallets={wallets}
                        className="hidden"
                      />
                      </div>
    </div>
  );
}
