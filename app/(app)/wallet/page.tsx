import { Divider } from "@heroui/react";

import WalletTopBar from "@/components/Wallet/WalletTopBar";
import TokensTable from "@/components/Wallet/TokensTable";
export default function Home() {
  return (
    <main className="w-full animate-appearance-in  max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <WalletTopBar />
      <Divider orientation="horizontal" />
      <TokensTable />
    </main>
  );
}
