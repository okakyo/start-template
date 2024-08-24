"use client";

import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
  usePagination,
} from "@refinedev/chakra-ui";

import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import { HStack, Table, TableContainer, Tbody, Th, Thead, Tr, Td, Box, IconButton, Button } from "@chakra-ui/react";
import { ListPagination } from "@components/pagination";

export default function UserList() {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "name",
        accessorKey: "name",
        header: "名前",
      },
      {
        id: "email",
        accessorKey: "email",
        header: "メールアドレス",
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "作成日時",
        cell: function render({ getValue }) {
          return new Date(getValue() as string).toLocaleString();
        }
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <HStack>
              <ShowButton hideText size="sm" recordItemId={getValue() as number} />
              <EditButton hideText size="sm" recordItemId={getValue() as number} />
              <DeleteButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
            </HStack>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
    }
  } = useTable({
    columns
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List createButtonProps={{ colorScheme: "green", variant: "solid" }}>
      <TableContainer mt={12}>
        <Table>
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ListPagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      />
    </List>
  );
}
