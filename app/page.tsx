"use client";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

import { PixelifySans } from "@/config/fonts";

export default function Home() {
  const activeAccount = useActiveAccount();
  const router = useRouter();

  const redirect = () => {
    setTimeout(() => {
      // This is a workaround to ensure the loading state is shown for at least 1 second
      // before redirecting to the wallet or connect page.
      if (!activeAccount) {
        router.push("/connect");
      } else {
        router.push("/wallet");
      }
    }, 1000);
  }
  useEffect(() => {
    redirect();
  }, [activeAccount]);

  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center bg-transparent p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 z-[-5]">
        <div className="absolute w-8 h-8 sm:w-8 sm:h-8 md:w-14 md:h-14 bg-primary/20 rounded-full animate-aura-move-1 blur-lg sm:blur-3xl" />
        <div className="absolute w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10 bg-primary/25 rounded-full animate-aura-move-2 blur-lg sm:blur-3xl" />
        <div className="absolute w-6 h-6 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-primary/15 rounded-full animate-aura-move-3 blur-lg sm:blur-3xl" />
        <div className="absolute w-8 h-8 sm:w-8 sm:h-8 md:w-14 md:h-14 bg-primary/20 rounded-full animate-aura-move-1 blur-lg sm:blur-3xl" />
        <div className="absolute w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10 bg-primary/25 rounded-full animate-aura-move-2 blur-lg sm:blur-3xl" />
        <div className="absolute w-6 h-6 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-primary/15 rounded-full animate-aura-move-3 blur-lg sm:blur-3xl" />
      </div>
      <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 max-w-md mx-auto z-0">
        <LoaderPinwheel className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary animate-spin-slow" />
        <h1 className="flex animate-pulse items-center gap-1 sm:gap-2">
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
    </div>
  );
}
