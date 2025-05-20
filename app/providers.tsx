"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { ThirdwebProvider } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createThirdwebClient } from "thirdweb";
import { ToastProvider } from "@heroui/toast";

import ChainContext from "@/components/ChainContextProvider";

export const thirdWebClient = createThirdwebClient({
  clientId: "f76f50283af21db4ef0e6eec33b378eb",
});

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [selectedChain, setSelectedChain] = React.useState(1339);

  return (
    <ThirdwebProvider>
      <HeroUIProvider navigate={router.push}>
        <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            themes={["light", "dark", "red", "green"]}
            {...themeProps}
          >
            <ToastProvider />
            {children}
          </NextThemesProvider>
        </ChainContext.Provider>
      </HeroUIProvider>
    </ThirdwebProvider>
  );
}