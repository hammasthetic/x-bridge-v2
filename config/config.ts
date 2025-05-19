import { ChainOptions, polygonAmoy } from "thirdweb/chains";

import { elysiumChain } from "@/components/ConnectWalletButton";

export interface Token {
  key: string;
  label: string;
  tokenAddress: string;
  resourceId: string;
  decimals: number;
  isMintBurn: boolean;
}

export interface Chain {
  key: string;
  label: string;
  id: number;
  chainId: number;
  bridgeAddress: string;
  rpc: string[];
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  testnet: boolean;
  tokens: Token[];
  chain: Readonly<
    ChainOptions & {
      rpc: string;
    }
  >;
}

export const chains: Chain[] = [
  {
    key: "ely",
    label: "Elysium",
    chain: elysiumChain,
    chainId: 1338,
    id: 1338,
    bridgeAddress: "0x46bC8e1A66AE9EF5C92da1b24Fb37B22705716e2",
    rpc: ["https://rpc.atlantischain.network"],
    nativeCurrency: {
      decimals: 18,
      name: "Elysium",
      symbol: "ELYS",
    },
    testnet: true,
    tokens: [
      {
        key: "pyr",
        label: "X-PYR",
        tokenAddress: "0x7290113D7Be6a4111783266B7371C1c3979a2cf5",
        resourceId:
          "0x7E339b2E3B1C332EE51792A03c5d1327Ea901B6D000000000001388200000000",
        decimals: 18,
        isMintBurn: true,
      },
      {
        key: "usdt",
        label: "Tether USD",
        tokenAddress: "0x687f83f7b68bF27755c300F82341Ad9d98bB6877",
        resourceId:
          "0xE0354F683A9b5184a89898acec104491896153f0000000000001388200000000",
        decimals: 6,
        isMintBurn: false,
      },
    ],
  },
  {
    key: "amoy",
    label: "Polygon Amoy",
    chainId: 80002,
    chain: polygonAmoy,
    id: 80002,
    bridgeAddress: "0x52334Db58D304df0D979F223eE2415e5769721c6",
    rpc: ["https://rpc-amoy.polygon.technology"],
    nativeCurrency: {
      decimals: 18,
      name: "Matic",
      symbol: "MATIC",
    },
    testnet: true,
    tokens: [
      {
        key: "pyr",
        label: "X-PYR",
        tokenAddress: "0x7E339b2E3B1C332EE51792A03c5d1327Ea901B6D",
        resourceId:
          "0x7E339b2E3B1C332EE51792A03c5d1327Ea901B6D000000000001388200000000",
        decimals: 18,
        isMintBurn: true,
      },
      {
        key: "usdt",
        label: "Tether USD",
        tokenAddress: "0xE0354F683A9b5184a89898acec104491896153f0",
        resourceId:
          "0xE0354F683A9b5184a89898acec104491896153f0000000000001388200000000",
        decimals: 6,
        isMintBurn: false,
      },
    ],
  },
];

export const getToChains = (activeChainId: number): Chain[] => {
  return chains.filter((chain) => chain.chainId !== activeChainId);
};
export const getFromChains = (activeChainId: number): Chain[] => {
  return chains.filter((chain) => chain.chainId === activeChainId);
};

export const getTokens = (activeChainId: number): Token[] => {
  const chain = chains.find((chain) => chain.chainId === activeChainId);

  return chain ? chain.tokens : [];
};
export const getToken = (
  activeChainId: number,
  tokenKey: string,
): Token | undefined => {
  const chain = chains.find((chain) => chain.chainId === activeChainId);

  return chain
    ? chain.tokens.find((token) => token.key === tokenKey)
    : undefined;
};
