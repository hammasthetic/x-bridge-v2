"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { defineChain } from "thirdweb";
import { lightTheme, darkTheme } from "thirdweb/react";
import {
  AccountBalance,
  AccountProvider,
  ConnectEmbed,
  useActiveAccount,
  useActiveWallet,
  useActiveWalletChain,
  useWalletImage,
} from "thirdweb/react";
import { polygonAmoy } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";
import { useTheme } from "next-themes";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import { thirdWebClient } from "@/app/providers";

export const fortunaWallet = createWallet("tech.elysium.fortuna" as any);
export const elysiumChain = defineChain({
  id: 1338,
  name: "Elysium Testnet",
  rpc: "https://rpc.atlantischain.network",
  nativeCurrency: {
    name: "ELY",
    symbol: "ELY",
    decimals: 18,
  },
});
export const wallets = [
  createWallet("walletConnect"),
  createWallet("io.metamask"),
  createWallet("com.safepal"),
  createWallet("com.coinbase.wallet"),
];

// Define custom Thirdweb themes
const thirdwebThemes = {
  light: lightTheme({
    colors: {
      modalBg: "transparent",
      primaryButtonBg: "linear-gradient(90deg, #0087CD 0%, #339FD7 100%)",
      primaryButtonText: "#1F2937",
      secondaryButtonBg: "#F9FAFB",
      secondaryButtonText: "#9CA3AF",
      secondaryButtonHoverBg: "#E5E7EB",
      connectedButtonBg: "#0087CD",
      connectedButtonBgHover: "#006CA4",
      primaryText: "#1F2937",
      secondaryText: "#9CA3AF",
      accentText: "#0087CD",
      accentButtonBg: "#006CA4",
      accentButtonText: "#FFFFFF",
      modalOverlayBg: "rgba(0, 0, 0, 0.5)",
      tooltipBg: "#1F2937",
      tooltipText: "#FFFFFF",
      inputAutofillBg: "#F9FAFB",
      scrollbarBg: "#E5E7EB",
      tertiaryBg: "#006CA4",
      separatorLine: "#E5E7EB",
      secondaryIconColor: "#9CA3AF",
      secondaryIconHoverBg: "#E5E7EB",
      secondaryIconHoverColor: "#1F2937",
      skeletonBg: "#F9FAFB",
      selectedTextColor: "#FFFFFF",
      selectedTextBg: "#0087CD",
      borderColor: "transparent",
      danger: "#e5484D",
      success: "#30A46C",
    },
    
  }),
  dark: darkTheme({
    colors: {
      modalBg: "transparent",
      primaryButtonBg: "linear-gradient(90deg, #00D7CD 0%, #33DFD7 100%)",
      primaryButtonText: "#E5E7EB",
      secondaryButtonBg: "#2D2D2D",
      secondaryButtonText: "#6B7280",
      secondaryButtonHoverBg: "#3F3F46",
      connectedButtonBg: "#00D7CD",
      connectedButtonBgHover: "#00A9A4",
      primaryText: "#E5E7EB",
      secondaryText: "#6B7280",
      accentText: "#00D7CD",
      accentButtonBg: "#00A9A4",
      accentButtonText: "#FFFFFF",
      modalOverlayBg: "rgba(0, 0, 0, 0.7)",
      tooltipBg: "#E5E7EB",
      tooltipText: "#1A1A1A",
      inputAutofillBg: "#2D2D2D",
      scrollbarBg: "#3F3F46",
      tertiaryBg: "#00D7CD",
      separatorLine: "#3F3F46",
      secondaryIconColor: "#6B7280",
      secondaryIconHoverBg: "#3F3F46",
      secondaryIconHoverColor: "#E5E7EB",
      skeletonBg: "#2D2D2D",
      selectedTextColor: "#1A1A1A",
      selectedTextBg: "#00D7CD",
      borderColor: "transparent",
      danger: "#e5484D",
      success: "#30A46C",
    },
    
  }),
  red: darkTheme({
    colors: {
      modalBg: "transparent",
      primaryButtonBg: "linear-gradient(90deg, #DD3E52 0%, #EE6569 100%)",
      primaryButtonText: "#E0E0E0",
      secondaryButtonBg: "#006CA4",
      secondaryButtonText: "#6A6A6A",
      secondaryButtonHoverBg: "#DD3E52",
      connectedButtonBg: "#DD3E52",
      connectedButtonBgHover: "#C70833",
      primaryText: "#E0E0E0",
      secondaryText: "#6A6A6A",
      accentText: "#DD3E52",
      accentButtonBg: "#C70833",
      accentButtonText: "#FFFFFF",
      modalOverlayBg: "rgba(0, 0, 0, 0.7)",
      tooltipBg: "#E0E0E0",
      tooltipText: "#151515",
      inputAutofillBg: "#252525",
      scrollbarBg: "#3A3A3A",
      tertiaryBg: "#DD3E52",
      separatorLine: "#3A3A3A",
      secondaryIconColor: "#6A6A6A",
      secondaryIconHoverBg: "#DD3E52",
      secondaryIconHoverColor: "#E0E0E0",
      skeletonBg: "#DD3E52",
      selectedTextColor: "#151515",
      selectedTextBg: "#DD3E52",
      borderColor: "transparent",
      danger: "#e5484D",
      success: "#30A46C",
    },
    
  }),
  green: darkTheme({
    colors: {
      modalBg: "transparent",
      primaryButtonBg: "linear-gradient(90deg, #9fc131 0%, #B0D44B 100%)",
      primaryButtonText: "#E0E0E0",
      secondaryButtonBg: "#7AA128",
      secondaryButtonText: "#6A6A6A",
      secondaryButtonHoverBg: "#3A3A3A",
      connectedButtonBg: "#9fc131",
      connectedButtonBgHover: "#7AA128",
      primaryText: "#E0E0E0",
      secondaryText: "#6A6A6A",
      accentText: "#9fc131",
      accentButtonBg: "#7AA128",
      accentButtonText: "#FFFFFF",
      modalOverlayBg: "rgba(0, 0, 0, 0.7)",
      tooltipBg: "#E0E0E0",
      tooltipText: "#151515",
      inputAutofillBg: "#252525",
      scrollbarBg: "#3A3A3A",
      tertiaryBg: "#9fc131",
      separatorLine: "#3A3A3A",
      secondaryIconColor: "#6A6A6A",
      secondaryIconHoverBg: "#3A3A3A",
      secondaryIconHoverColor: "#E0E0E0",
      skeletonBg: "#9fc131",
      selectedTextColor: "#151515",
      selectedTextBg: "#9fc131",
      borderColor: "transparent",
      danger: "#e5484D",
      success: "#30A46C",
    },
    
  }),
};

export default function ConnectWalletButton() {
  const activeWallet = useActiveWallet();
  const activeAccount = useActiveAccount();
  const walletAddress = activeAccount?.address;
  const walletId = activeWallet?.id;
  const { theme, systemTheme } = useTheme();
  const { data: walletImage, isLoading: loadingWalletImage } =
    useWalletImage(walletId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonText, setButtonText] = useState("Copy Address");
  const [authenticChain, setAuthenticChain] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Determine Thirdweb theme based on current theme
  const getThirdwebTheme = () => {
    if (theme === "system") {
      return systemTheme === "light"
        ? thirdwebThemes.light
        : thirdwebThemes.dark;
    }

    return (
      thirdwebThemes[`${(theme as "light") || "red" || "dark" || "green"}`] ||
      thirdwebThemes.light
    ); // Fallback to light
  };

  const handleCopyAddress = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText(walletAddress);
        setButtonText("Copied");
        setTimeout(() => {
          setButtonText("Copy Address");
        }, 2000);
      } catch (error) {
        console.error("Failed to copy address:", error);
      }
    }
  };

  const activeChain = useActiveWalletChain();

  useEffect(() => {
    if (
      activeChain?.id === 1339 ||
      activeChain?.id === 137 ||
      activeChain?.id === 1
    ) {
      setAuthenticChain(true);
    } else {
      setAuthenticChain(false);
      setIsHovered(false);
    }
  }, [activeChain]);

  return (
    <>
      {activeWallet ? (
        <div
          className="flex flex-row gap-2 sm:gap-3 items-center transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {loadingWalletImage ? (
            <div className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse bg-content2 rounded-full" />
          ) : (
            walletImage && (
              <Image
                alt="Wallet Image"
                className={`rounded-full transition-transform duration-200 ${isHovered ? "scale-110" : ""}`}
                height={20}
                sizes="(max-width: 640px) 20px, 24px"
                src={walletImage.trim()}
                width={20}
              />
            )
          )}
          {walletAddress && (
            <>
              <span className="text-[0.65rem] sm:text-xs md:text-sm">
                {`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
              </span>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    className="text-[0.65rem] sm:text-xs md:text-sm"
                    color="primary"
                    radius="sm"
                    size="sm"
                    variant="bordered"
                  >
                    <AccountProvider
                      address={walletAddress}
                      client={thirdWebClient}
                    >
                      <AccountBalance />
                    </AccountProvider>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  className="text-[0.65rem] sm:text-xs md:text-sm"
                  color="primary"
                >
                  <DropdownItem key="address" onPress={handleCopyAddress}>
                    {buttonText}
                  </DropdownItem>
                  <DropdownItem
                    key="disconnect"
                    color="danger"
                    onPress={async () => {
                      await activeWallet.disconnect();
                      router.push("/connect");
                    }}
                  >
                    Disconnect
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center w-full max-w-3xl mx-auto">
          {/* Drawer Container */}
          <div
            className={`fixed bottom-0 left-0 right-0 w-full sm:w-[90%] md:w-[80%] max-w-3xl mx-auto transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            } bg-content1/95 backdrop-blur-sm rounded-t-sm sm:rounded-t-md shadow-md p-4 sm:p-5 md:p-6 z-50`}
          >
            <div className="flex justify-center mb-3">
              <Button
                className="text-[0.65rem] w-full sm:text-xs md:text-sm hover:scale-105 transition-all duration-200"
                color="primary"
                radius="sm"
                size="sm"
                variant="flat"
                onPress={onClose}
              >
                Close
              </Button>
            </div>
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
                padding: "0",
                border: "none",
              }}
              theme={getThirdwebTheme()}
              wallets={wallets}
              onConnect={() => {
                onClose();
                router.push("/wallet");
              }}
            />
          </div>
          {/* Overlay */}
          {isOpen && (
            <div
            role="button"
              className="fixed w-full inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
          )}
          {/* Connect Wallet Button */}
          <Button
            className="w-full text-[0.65rem] sm:text-xs md:text-sm hover:scale-105 transition-all duration-200"
            color="primary"
            radius="sm"
            size="sm"
            variant="bordered"
            onPress={isOpen ? onClose : onOpen}
          >
            {isOpen ? "Close" : "Connect Wallet"}
          </Button>
        </div>
      )}
      <style>{`
        @keyframes slide-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-down {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
