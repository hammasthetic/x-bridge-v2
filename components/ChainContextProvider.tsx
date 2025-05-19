import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: 1339,
  setSelectedChain: (chain: number) => {},
});

export default ChainContext;
