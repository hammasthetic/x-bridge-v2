"use client";
import { LoaderPinwheel } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { PixelifySans } from "@/config/fonts";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function Home() {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const redirect = () => {
    setTimeout(() => {
      // This is a workaround to ensure the loading state is shown for at least 1 second
      // before redirecting to the wallet or connect page.
      if (!activeAccount) {
        router.push("/connect");
        console.log("Redirecting to connect page...");
      } else {
        router.push("/wallet");
        console.log("Redirecting to wallet page...");
      }
    }, 2000);
  }
  useEffect(() => {
    if (activeAccount) {
      console.log("Active account detected:", activeAccount);
      redirect();
    }
    
  }, [activeAccount]);

  // Array to generate 10 auras with random properties
  const auras = Array.from({ length: 10 }, (_, i) => ({
    size: `w-${16 + Math.floor(Math.random() * 12)} h-${16 + Math.floor(Math.random() * 12)} sm:w-${24 + Math.floor(Math.random() * 12)} sm:h-${24 + Math.floor(Math.random() * 12)} md:w-${32 + Math.floor(Math.random() * 12)} md:h-${32 + Math.floor(Math.random() * 12)}`,
    opacity: `bg-primary/${15 + Math.floor(Math.random() * 16)}`,
    animation: `animate-aura-move-${(i % 10) + 1}`,
    top: `${10 + Math.random() * 80}%`,
    left: `${10 + Math.random() * 80}%`,
  }));

  return (
    <main className="flex flex-col min-h-screen justify-center items-center gap-6 p-4 sm:p-6 md:p-8 w-full relative overflow-hidden">
      {/* Aura Background */}
      <div className="absolute inset-0 z-[-5]">
        {auras.map((aura, i) => (
          <div
            key={i}
            className={`absolute ${aura.size} ${aura.opacity} rounded-full ${aura.animation} blur-lg sm:blur-3xl`}
            style={{ top: aura.top, left: aura.left }}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="w-full max-w-3xl flex flex-col text-center items-center gap-4 sm:gap-5 md:gap-6 justify-center z-0">
        <h1 className="flex items-center gap-1 sm:gap-2">
          <span className="font-bold animate-drip-expand text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary">
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
        <LoaderPinwheel className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary animate-spin-slow" />
      ) : (
        <ConnectWalletButton />
      )}
    </main>
  );
}
