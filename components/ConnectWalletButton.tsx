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

  const { data: walletImage, isLoading: loadingWalletImage } =
    useWalletImage(walletId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [buttonText, setButtonText] = useState("Copy Address");
  const activeChain = useActiveWalletChain();
  const [authenticChain, setAuthenticChain] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const handleCopyAddress = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText(walletAddress);
        setButtonText("Copied");
        // Revert to "Copy Address" after 2 seconds
        setTimeout(() => {
          setButtonText("Copy Address");
        }, 2000);
      } catch (error) {
        console.error("Failed to copy address:", error);
        // Optionally handle error (e.g., keep text as "Copy Address")
      }
    }
  };

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
          className="flex flex-row gap-2 items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {loadingWalletImage ? (
            <div className="w-6 h-6 animate-pulse bg-gray-200 rounded-full" />
          ) : (
            walletImage && (
              <Image
                alt="Wallet Image"
                className={`rounded-full ${isHovered ? "scale-110" : ""}`}
                height={24}
                src={walletImage}
                width={24}
              />
            )
          )}
          {walletAddress && (
            <>
              <span className="text-sm">{`${walletAddress.slice(0, 4)}...${walletAddress.slice(39)}`}</span>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button color="primary" radius="sm" size="sm">
                    <AccountProvider
                      address={walletAddress}
                      client={thirdWebClient}
                    >
                      <AccountBalance />
                    </AccountProvider>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu color="primary">
                  <DropdownItem key="address" onPress={handleCopyAddress}>
                    {buttonText}
                  </DropdownItem>
                  <DropdownItem
                    key="disconnect"
                    color="danger"
                    onPress={async () => {
                      await activeWallet.disconnect();
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
          className=" text-sm"
          color="primary"
          radius="sm"
          size="sm"
          onPress={onOpen}
        >
          Connect Wallet
        </Button>
      )}
      {/* <Button className=" text-sm" color="primary" radius="sm" size="sm" onPress={onOpen}>
              Connect Wallet
            </Button> */}
      <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-col justify-between items-center align-middle ">
                  {theme === "dark" ? <SideBarLogo /> : <SideBarLogo />}
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
                  onConnect={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
