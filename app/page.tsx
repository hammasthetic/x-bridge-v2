import { Divider } from "@heroui/react";

import WalletTopBar from "@/components/Wallet/WalletTopBar";
import TokensTable from "@/components/Wallet/TokensTable";
export default function Home() {
  return (
    <main className="main flex flex-col gap-5">
      <WalletTopBar />
      <Divider orientation="horizontal" />
      <TokensTable />
    </main>
  );
}
