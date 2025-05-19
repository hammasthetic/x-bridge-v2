"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
} from "@heroui/react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TransactionsTable() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useSWR(
    `https://swapi.py4e.com/api/people?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  const rowsPerPage = 5;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState =
    isLoading || data?.results.length === 0 ? "loading" : "idle";

  return (
    <Table
      aria-label="Example table with client async pagination"
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
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      className=" max-h-full text-xs"
      radius="sm"
      shadow="none"
    >
      <TableHeader>
        <TableColumn key="name" className=" text-xs">
          name
        </TableColumn>
        <TableColumn key="height">date</TableColumn>
        <TableColumn key="mass">amount</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.results ? (data?.results as Array<any>).slice(0, 5) : []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={(item as any)?.name} className=" text-xs">
            {(columnKey) => (
              <TableCell className="text-xs">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
