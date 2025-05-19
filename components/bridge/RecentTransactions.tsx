import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import React from "react";

import TransactionsTable from "./TransactionsTable";

function RecentTransactions() {
  return (
    <div className=" flex flex-col gap-2">
      <Input
        isClearable
        classNames={{
          inputWrapper: "text-primary",
          helperWrapper: "text-primary",
          base: "text-primary",
          mainWrapper: "text-primary",
          description: "text-primary",
          input: "text-primary",
          innerWrapper: "text-primary",
          label: "text-primary",
        }}
        color="primary"
        placeholder="Recent Transactions"
        radius="sm"
        size="sm"
        startContent={<SearchIcon className=" text-primary" />}
        variant="underlined"
      />
      <TransactionsTable />
    </div>
  );
}

export default RecentTransactions;
