"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@heroui/react";
import { useActiveWallet } from "thirdweb/react";
import { Chain, readContract, toTokens } from "thirdweb";

import ConnectWalletButton from "../ConnectWalletButton";

import { chains, Token } from "@/config/config";
import { getErc20ContractByAddress } from "@/config/contract";

interface TableItem {
  tokenKey: string;
  tokenName: string;
  balances: { [chainKey: string]: string };
}

export default function TokensTable() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<TableItem[]>([]);
  const [loadingState, setLoadingState] = useState<"loading" | "idle">("loading");
  const rowsPerPage = 5;

  const activeWallet = useActiveWallet();
  const address = activeWallet?.getAccount()?.address;

  const getBalance = async (token: Token, chain: Chain): Promise<string> => {
    try {
      const contract = getErc20ContractByAddress({
        address: token.tokenAddress,
        chain,
      });
      const balance = await readContract({
        contract,
        method: "balanceOf",
        params: [address!],
      });

      return toTokens(balance, token.decimals);
    } catch (error) {
      console.error(
        `Error fetching balance for ${token.label} on ${chain.name}:`,
        error,
      );
      return "0";
    }
  };

  useEffect(() => {
    if (!address) {
      setItems([]);
      setLoadingState("idle");
      return;
    }

    const fetchBalances = async () => {
      setLoadingState("loading");
      const tokenMap: {
        [key: string]: {
          name: string;
          balances: { [chainKey: string]: string };
        };
      } = {};

      for (const chain of chains) {
        for (const token of chain.tokens) {
          if (!tokenMap[token.key]) {
            tokenMap[token.key] = {
              name: token.label,
              balances: {},
            };
          }
          const balance = await getBalance(token, chain.chain);
          tokenMap[token.key].balances[chain.key] = balance;
        }
      }

      const tableItems: TableItem[] = Object.entries(tokenMap).map(
        ([tokenKey, data]) => ({
          tokenKey,
          tokenName: data.name,
          balances: data.balances,
        }),
      );

      setItems(tableItems);
      setLoadingState("idle");
    };

    fetchBalances();
  }, [address]);

  const pages = Math.ceil(items.length / rowsPerPage);
  const paginatedItems = items.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const columns = [
    { key: "tokenName", label: "Token" },
    ...chains.map((chain) => ({
      key: chain.key,
      label: `${chain.label} Balance`,
    })),
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        aria-label="Tokens table with balances per chain"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center py-4">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)}
                className="text-sm sm:text-base"
              />
            </div>
          ) : null
        }
        className="w-full max-w-7xl mx-auto"
        radius="sm"
        shadow="none"
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.key}
              className="text-xs sm:text-sm md:text-base"
            >
              {column.key === "tokenName" ? (
                column.label
              ) : (
                <span className="hidden sm:inline">{column.label}</span>
              )}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={<ConnectWalletButton />}
          items={paginatedItems}
          loadingContent={<Spinner size="lg" />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.tokenKey}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className="text-xs sm:text-sm md:text-base"
                >
                  {column.key === "tokenName"
                    ? item.tokenName
                    : item.balances[column.key] || "0"}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}