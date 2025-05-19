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

import { chains, Token } from "@/config/config";
import { getErc20ContractByAddress } from "@/config/contract";

interface TableItem {
  tokenKey: string;
  tokenName: string;
  balances: { [chainKey: string]: string }; // e.g., { ely: "1216.6", amoy: "657.98" }
}

export default function TokensTable() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<TableItem[]>([]);
  const [loadingState, setLoadingState] = useState<"loading" | "idle">(
    "loading",
  );
  const rowsPerPage = 5;

  const activeWallet = useActiveWallet();
  const address = activeWallet?.getAccount()?.address;

  // Fetch token balance for a given token and chain
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

  // Load token balances and group by token key
  useEffect(() => {
    if (!address) {
      setItems([]);
      setLoadingState("idle");

      return;
    }

    const fetchBalances = async () => {
      setLoadingState("loading");

      // Group tokens by key
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

      // Convert tokenMap to array for table
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

  // Calculate pagination
  const pages = Math.ceil(items.length / rowsPerPage);
  const paginatedItems = items.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  // Dynamic columns: one for token name, one for each chain's balance
  const columns = [
    { key: "tokenName", label: "Token" },
    ...chains.map((chain) => ({
      key: chain.key,
      label: `${chain.label} Balance`,
    })),
  ];

  return (
    <Table
      aria-label="Tokens table with balances per chain"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        ) : null
      }
      className="max-h-full"
      radius="sm"
      shadow="none"
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent="No tokens available"
        items={paginatedItems}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item.tokenKey}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.key === "tokenName"
                  ? item.tokenName
                  : item.balances[column.key] || "0"}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
