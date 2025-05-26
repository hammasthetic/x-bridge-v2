"use client";
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  addToast,
} from "@heroui/react";
import { DollarSign, InfoIcon, LoaderIcon } from "lucide-react";
import {
  useActiveAccount,
  useActiveWalletChain,
  useReadContract,
  useSendAndConfirmTransaction,
  useWalletBalance,
} from "thirdweb/react";
import {
  prepareContractCall,
  PreparedTransaction,
  toTokens,
  toUnits,
} from "thirdweb";

import ActiveChainSwitcher from "../ActiveChainSwitcher";
import { thirdWebClient } from "../../app/providers";
import ConnectWalletButton, { elysiumChain } from "../ConnectWalletButton";

import {
  Chain,
  getFromChains,
  getToChains,
  getTokens,
  Token,
} from "@/config/config";
import {
  getBridgeContractByAddress,
  getErc20ContractByAddress,
} from "@/config/contract";

export default function BridgingTabs() {
  const [selected, setSelected] = useState("bridge");
  const [amount, setAmount] = useState("");
  const [toChain, setToChain] = useState<Chain | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [isCompleting, setCompleting] = useState(false);
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;
  const activeChain = useActiveWalletChain();
  const activeChainId = activeChain?.id;
  const toChains = getToChains(activeChainId || 1338);
  const tokens = getTokens(activeChainId || 1338);
  const [toToken, setToToken] = useState<Token | null>(null);
  const { data: balanceData, isLoading: isLoadingBalance } = useWalletBalance({
    chain: activeChain,
    address,
    client: thirdWebClient,
    tokenAddress: token?.tokenAddress,
  });
  const {
    data: currentApprovedAmount,
    isLoading: isLoadingApprovedAmount,
    refetch: refetchAllowance,
  } = useReadContract({
    contract: getErc20ContractByAddress({
      address: token?.tokenAddress,
      chain: activeChain,
    }),
    method: "allowance",
    params: [
      address as any,
      getFromChains(activeChainId || 1338)[0].bridgeAddress,
    ],
  });
  const { data: bridgingFee, isLoading: isLoadingBridgingFee } =
    useReadContract({
      contract: getBridgeContractByAddress({
        address: getFromChains(activeChainId || 1338)[0].bridgeAddress,
        chain: activeChain || elysiumChain,
      }),
      method: "feePercentage",
    });
  const { mutateAsync: sendApprovalTransaction, isPending: approvalPending } =
    useSendAndConfirmTransaction();
  const {
    mutateAsync: sendBridgeTransaction,
    isPending: bridgeTransactionPendiing,
  } = useSendAndConfirmTransaction();

  const approveAmount = async () => {
    if (!activeChain || !token || !amount) return;
    const contract = getErc20ContractByAddress({
      address: token?.tokenAddress,
      chain: activeChain,
    });
    const transaction = prepareContractCall({
      contract,
      method: "approve",
      type: "eip1559",
      params: [
        getFromChains(activeChainId || 1338)[0].bridgeAddress,
        toUnits(amount, token?.decimals),
      ],
    });

    await sendApprovalTransaction(transaction as PreparedTransaction, {
      onSuccess(data) {
        addToast({
          title: "Success",
          description: `Funds Approved`,
          color: "success",
          size: "lg",
          variant: "solid",
        });
      },
      onError(error) {
        addToast({
          title: "Failed",
          description: `${error.message}`,
          color: "danger",
          size: "lg",
          variant: "solid",
        });
      },
    });
  };

  const bridgeTransaction = async () => {
    if (!activeChain || !toChain?.chainId || !token || !amount) return;
    const contract = getBridgeContractByAddress({
      address: getFromChains(activeChainId || 1338)[0].bridgeAddress,
      chain: activeChain || elysiumChain,
    });
    const transaction = prepareContractCall({
      contract,
      method: "lockOrBurn",
      type: "eip1559",
      params: [
        token?.tokenAddress,
        toUnits(amount, token.decimals),
        BigInt(toChain?.chainId),
      ],
    });

    await sendBridgeTransaction(transaction as PreparedTransaction, {
      async onSuccess(data) {
        addToast({
          title: "Success",
          description: `Bridging Started`,
          color: "success",
          size: "lg",
          variant: "solid",
        });
        await refetchAllowance();
      },
      onError(error) {
        addToast({
          title: "Bridging Failed",
          description: `${error.message}`,
          color: "danger",
          size: "lg",
          variant: "solid",
        });
      },
    });
    setCompleting(true);
    setTimeout(() => {
      refetchDestinationBalance();
      setCompleting(false);
    }, 30000);
  };

  const {
    data: DestinationBalanceData,
    isLoading: isLoadingDestinationBalance,
    refetch: refetchDestinationBalance,
  } = useWalletBalance({
    chain: toChain?.chain,
    address,
    client: thirdWebClient,
    tokenAddress: toToken?.tokenAddress || "",
  });

  React.useEffect(() => {
    setToChain(toChains[0] || null);
    setToken(tokens[0] || null);
  }, [activeChainId]);

  

  return (
    <div className="relative w-full flex flex-col gap-3 sm:gap-4">
      <Card className="w-full max-w-3xl mx-auto" shadow="none">
        <CardBody className="p-3 sm:p-4 md:p-6">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            className="text-[0.65rem] sm:text-xs md:text-sm"
            selectedKey={selected}
            size="sm"
            onSelectionChange={(key) => setSelected(String(key))}
          >
            <Tab key="bridge" title="Bridge">
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <ActiveChainSwitcher label="From" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-[0.65rem] sm:text-xs md:text-sm text-content2 p-3 sm:p-4 border-1 border-content2 rounded-sm sm:rounded-md">
                  <div className="flex justify-start">
                    <h1>Send</h1>
                  </div>
                  <div className="flex justify-end">
                    {isLoadingBalance ? (
                      <LoaderIcon className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <h1>
                        MAX{" : "}
                        <span className="text-primary">
                          {Number(balanceData?.displayValue).toFixed(1)}{" "}
                          {balanceData?.symbol}
                        </span>
                      </h1>
                    )}
                  </div>
                  <div className="flex justify-start">
                    <Input
                      classNames={{
                        base: "bg-transparent",
                        input: "text-primary bg-transparent",
                        label: "!text-content2",
                      }}
                      color="primary"
                      label="Amount"
                      placeholder="0"
                      radius="sm"
                      size="sm"
                      startContent={
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                      }
                      type="number"
                      value={amount}
                      variant="underlined"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Select
                      className="w-full sm:max-w-28"
                      classNames={{
                        base: "justify-end bg-transparent",
                        mainWrapper: "justify-end bg-transparent",
                        value: "!text-primary bg-transparent",
                        listboxWrapper: "rounded-sm sm:rounded-md",
                        popoverContent: "rounded-sm sm:rounded-md",
                        innerWrapper: "bg-transparent",
                        label: "!text-content2",
                        selectorIcon: "!text-content2",
                      }}
                      color="primary"
                      fullWidth={false}
                      label="Select token"
                      size="sm"
                      variant="underlined"
                      onChange={(e) => {
                        setToken(
                          tokens.find((t) => t.key === e.target.value) || null,
                        );
                        setToToken(
                          toChain?.tokens.find(
                            (t) => t.key === e.target.value,
                          ) || null,
                        );
                      }}
                    >
                      {tokens.map((coin) => (
                        <SelectItem
                          key={coin.key}
                          className="text-[0.65rem] sm:text-xs md:text-sm"
                        >
                          {coin.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <Select
                      className="text-[0.65rem] sm:text-xs md:text-sm"
                      classNames={{
                        label:
                          "!text-primary text-xs sm:text-sm md:text-base font-bold",
                        selectorIcon: "!text-primary",
                        listboxWrapper: "rounded-sm sm:rounded-md",
                        popoverContent: "rounded-sm sm:rounded-md",
                      }}
                      fullWidth={false}
                      label="To"
                      labelPlacement="outside-left"
                      placeholder="Select chain"
                      selectionMode="single"
                      size="sm"
                      variant="underlined"
                      onChange={(e) =>
                        setToChain(
                          toChains.find((c) => c.key === e.target.value) ||
                            null,
                        )
                      }
                    >
                      {toChains.map((chain) => (
                        <SelectItem
                          key={chain.key}
                          className="text-[0.65rem] sm:text-xs md:text-sm"
                        >
                          {chain.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-content2 p-3 sm:p-4 border-1 border-content2 rounded-sm sm:rounded-md transition-all duration-300 ${isCompleting || isLoadingDestinationBalance ? "bg-primary/10 animate-processing" : ""}`}
                    style={{
                      animation:
                        isCompleting || isLoadingDestinationBalance
                          ? "processing 1.5s ease-in-out infinite"
                          : "none",
                    }}
                  >
                    {isCompleting && (
                      <div className="col-span-1 sm:col-span-2 flex justify-center items-center gap-2 text-[0.65rem] sm:text-xs md:text-sm text-primary mb-2">
                        <LoaderIcon className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Processing on {toChain?.label}...</span>
                      </div>
                    )}
                    <div className="flex flex-col justify-start w-full gap-1">
                      <h1 className="flex justify-start items-center gap-1 text-[0.65rem] sm:text-xs md:text-sm">
                        <InfoIcon className="text-content2 w-2 h-2 sm:w-3 sm:h-3" />
                        Balance Addition
                      </h1>
                      <h1 className="flex gap-1 text-foreground text-xs sm:text-sm">
                        <DollarSign
                          className={`text-content2 w-3 h-3 sm:w-4 sm:h-4 ${isCompleting || isLoadingDestinationBalance ? "animate-spin-slow" : ""}`}
                        />
                        {amount
                          ? Number(amount) -
                            (Number(bridgingFee) / 100 / 100) * Number(amount)
                          : 0}
                      </h1>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-1">
                      <h1 className="flex justify-start items-center gap-1 text-[0.65rem] sm:text-xs md:text-sm">
                        <InfoIcon className="text-content2 w-2 h-2 sm:w-3 sm:h-3" />
                        Balance on {toChain?.label}
                      </h1>
                      <h1 className="flex gap-1 text-foreground text-xs sm:text-sm">
                        <DollarSign
                          className={`text-content2 w-3 h-3 sm:w-4 sm:h-4 ${isCompleting || isLoadingDestinationBalance ? "animate-spin-slow" : ""}`}
                        />
                        {Number(DestinationBalanceData?.displayValue).toFixed(
                          1,
                        )}{" "}
                        {DestinationBalanceData?.symbol}
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 sm:gap-2">
                    {isLoadingBridgingFee ? (
                      <LoaderIcon className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <p className="text-[0.65rem] sm:text-xs md:text-sm text-content2">
                        Bridging Fee: {`${Number(Number(bridgingFee) / 100)}%`}
                      </p>
                    )}
                    {token &&
                    currentApprovedAmount &&
                    Number(toTokens(currentApprovedAmount, token?.decimals)) >=
                      Number(amount) ? (
                      <Button
                        className="text-[0.65rem] sm:text-xs md:text-sm"
                        color="primary"
                        isDisabled={
                          !address ||
                          !activeChain ||
                          !toChain ||
                          !token ||
                          !amount ||
                          (currentApprovedAmount &&
                            Number(
                              toTokens(currentApprovedAmount, token?.decimals),
                            ) < Number(amount)) ||
                          Number(amount) <= 0 ||
                          Number(amount) > Number(balanceData?.displayValue) ||
                          isLoadingApprovedAmount ||
                          isCompleting
                        }
                        isLoading={bridgeTransactionPendiing}
                        radius="sm"
                        variant="ghost"
                        onPress={async () => await bridgeTransaction()}
                      >
                        Start Bridging
                      </Button>
                    ) : (
                      <Button
                        className="text-[0.65rem] sm:text-xs md:text-sm"
                        color="primary"
                        isDisabled={
                          !address ||
                          !activeChain ||
                          !toChain ||
                          !token ||
                          !amount ||
                          Number(amount) <= 0 ||
                          Number(amount) > Number(balanceData?.displayValue) ||
                          isLoadingApprovedAmount
                        }
                        isLoading={approvalPending}
                        radius="sm"
                        variant="ghost"
                        onPress={async () => await approveAmount()}
                      >
                        Approve Amount
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab key="liquidity" isDisabled title="Liquidity" />
            <Tab key="nft" isDisabled title="NFT" />
          </Tabs>
        </CardBody>
      </Card>
      {!activeAccount && (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md rounded-sm sm:rounded-md">
          <ConnectWalletButton />
        </div>
      )}
    </div>
  );
}
