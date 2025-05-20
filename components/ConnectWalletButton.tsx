
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { defineChain } from "thirdweb";
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
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

import SideBarLogo from "./SideBar/SideBarLogo";

import { thirdWebClient } from "@/app/providers";
import { useRouter } from "next/navigation";

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

export default function ConnectWalletButton() {
  const activeWallet = useActiveWallet();
  const activeAccount = useActiveAccount();
  const walletAddress = activeAccount?.address;
  const walletId = activeWallet?.id;
  const { theme } = useTheme();
  const { data: walletImage, isLoading: loadingWalletImage } = useWalletImage(walletId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [buttonText, setButtonText] = useState("Copy Address");
  const [authenticChain, setAuthenticChain] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

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
    if (activeChain?.id === 1339 || activeChain?.id === 137 || activeChain?.id === 1) {
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
          className="flex flex-row gap-2 sm:gap-3 items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {loadingWalletImage ? (
            <div className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse bg-gray-200 rounded-full" />
          ) : (
            walletImage && (
              <Image
                alt="Wallet Image"
                className={`rounded-full transition-transform ${isHovered ? "scale-110" : ""}`}
                height={20}
                src={walletImage.trim()}
                width={20}
                sizes="(max-width: 640px) 20px, 24px"
              />
            )
          )}
          {walletAddress && (
            <>
              <span className="text-xs sm:text-sm md:text-base">
                {`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
              </span>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    color="primary"
                    radius="sm"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    <AccountProvider address={walletAddress} client={thirdWebClient}>
                      <AccountBalance />
                    </AccountProvider>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu color="primary" className="text-xs sm:text-sm">
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
        <Button
          className="text-xs sm:text-sm md:text-base"
          color="primary"
          radius="sm"
          size="sm"
          onPress={onOpen}
        >
          Connect Wallet
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="p-2 sm:p-4 md:p-6"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-col justify-center items-center w-full">
                  <SideBarLogo />
                </div>
              </ModalHeader>
              <ModalBody>
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
                  theme={theme as any}
                  wallets={wallets}
                  onConnect={() => {
                    onClose();
                    router.push("/wallet");
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="hidden">
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
          theme={theme as any}
          wallets={wallets}
        />
      </div>
    </>
  );
}
