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
} from "@heroui/react";
import {
  ArrowDownIcon,
  ArrowUpDown,
  Bitcoin,
  BitcoinIcon,
  DollarSign,
  GrapeIcon,
  InfoIcon,
  LoaderIcon,
} from "lucide-react";
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
import { elysiumChain } from "../ConnectWalletButton";

import RecentTransactions from "./RecentTransactions";

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

export default function BirdgingTabs() {
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
  const { data: currentApprovedAmount, isLoading: isLoadingApprovedAmount } =
    useReadContract({
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

    await sendApprovalTransaction(transaction as PreparedTransaction);
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

    await sendBridgeTransaction(transaction as PreparedTransaction);
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

  // Set default toChain and token when active chain changes
  React.useEffect(() => {
    setToChain(toChains[0] || null);
    setToken(tokens[0] || null);
  }, [activeChainId]);

  return (
    <div className="flex justify-center w-full p-5 gap-2">
      <Card className="max-w-full p-0" shadow="none">
        <CardBody className="p-0">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={(key) => setSelected(String(key))}
          >
            <Tab key="bridge" title="Bridge">
              <div className="flex flex-col gap-7">
                <div className="grid grid-cols-3 justify-between">
                  <ActiveChainSwitcher label="From" />
                  <div className="flex justify-end items-center col-span-1">
                    <GrapeIcon className="text-primary" size={20} />
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 text-sm gap-2 text-content2 p-6 border-1 border-content2 rounded-md">
                    <div className="flex justify-start">
                      <h1>send</h1>
                    </div>
                    <div className="flex justify-end">
                      {isLoadingBalance ? (
                        <LoaderIcon className=" animate-spin" />
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
                        size="lg"
                        startContent={<DollarSign />}
                        type="number"
                        value={amount}
                        variant="underlined"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Select
                        className="max-w-28 bg-none"
                        classNames={{
                          base: "justify-end bg-transparent",
                          mainWrapper: "justify-end bg-transparent",
                          value: "!text-primary bg-transparent",
                          listboxWrapper: "rounded-small",
                          popoverContent: "rounded-small",
                          innerWrapper: "bg-transparent",
                          label: "!text-content2",
                          selectorIcon: "!text-content2",
                        }}
                        color="primary"
                        fullWidth={false}
                        label="Select token"
                        size="lg"
                        variant="underlined"
                        onChange={(e) => {
                          setToken(
                            tokens.find((t) => t.key === e.target.value) ||
                              null,
                          );
                          setToToken(
                            toChain?.tokens.find(
                              (t) => t.key === e.target.value,
                            ) || null,
                          );
                        }}
                      >
                        {tokens.map((coin) => (
                          <SelectItem key={coin.key}>{coin.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="relative w-full flex justify-center mb-5">
                    <div className="max-w-fit p-2 rounded-md absolute mx-auto -top-4 bg-primary">
                      <ArrowUpDown className="" size={20} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-7">
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <Select
                          className="text-sm"
                          classNames={{ label: "!text-primary" }}
                          fullWidth={false}
                          label="To"
                          labelPlacement="outside-left"
                          placeholder="Select chain"
                          selectorIcon={<ArrowDownIcon />}
                          size="sm"
                          startContent={<BitcoinIcon />}
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
                              startContent={<Bitcoin size={15} />}
                            >
                              {chain.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div
                      className={`To grid grid-cols-2 gap-2 text-content2 p-6 border-1 border-content2 rounded-md ${isCompleting || isLoadingDestinationBalance ? "  animate-pulse" : ""}`}
                    >
                      <div className="flex-row justify-start w-full">
                        <h1 className="flex justify-start items-center gap-1">
                          <InfoIcon className="text-content2" size={10} />
                          Balance Addition
                        </h1>
                        <div>
                          <h1 className="flex gap-2 text-foreground">
                            <DollarSign className="text-content2" />
                            {amount
                              ? Number(amount) -
                                (Number(bridgingFee) / 100 / 100) *
                                  Number(amount)
                              : 0}
                          </h1>
                        </div>
                      </div>
                      <div className="flex-row justify-start w-full">
                        <h1 className="flex justify-start items-center gap-1">
                          <InfoIcon className="text-content2" size={10} />
                          Balance on {toChain?.label}
                        </h1>
                        <div>
                          <h1 className="flex gap-2 text-foreground">
                            <DollarSign className="text-content2" />
                            {Number(
                              DestinationBalanceData?.displayValue,
                            ).toFixed(1)}{" "}
                            {DestinationBalanceData?.symbol}
                          </h1>
                        </div>
                      </div>
                      <div />
                    </div>
                    <div className="flex flex-col gap-2">
                      {isLoadingBridgingFee ? (
                        <LoaderIcon className="animate-spin" />
                      ) : (
                        <p className="text-sm text-content2">
                          Bridging Fee:{" "}
                          {`${Number(Number(bridgingFee) / 100)}%`}
                        </p>
                      )}
                      {token &&
                      currentApprovedAmount &&
                      Number(
                        toTokens(currentApprovedAmount, token?.decimals),
                      ) >= Number(amount) ? (
                        <Button
                          color="primary"
                          isDisabled={
                            !address ||
                            !activeChain ||
                            !toChain ||
                            !token ||
                            !amount ||
                            (currentApprovedAmount &&
                              Number(
                                toTokens(
                                  currentApprovedAmount,
                                  token?.decimals,
                                ),
                              ) < Number(amount)) ||
                            Number(amount) <= 0 ||
                            Number(amount) >
                              Number(balanceData?.displayValue) ||
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
                          color="primary"
                          isDisabled={
                            !address ||
                            !activeChain ||
                            !toChain ||
                            !token ||
                            !amount ||
                            Number(amount) <= 0 ||
                            Number(amount) >
                              Number(balanceData?.displayValue) ||
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
              </div>
            </Tab>
            <Tab key="liquidity" isDisabled title="Liquidity" />
            <Tab key="nft" isDisabled title="NFT" />
          </Tabs>
        </CardBody>
      </Card>
      {/* <div className="recentTransactions">
        <RecentTransactions />
      </div> */}
    </div>
  );
}
