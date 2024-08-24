"use client";

import { GetManyResponse, useMany, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@refinedev/chakra-ui";

import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { HStack, Table, TableContainer, Tbody, Th, Thead, Tr, Td, Box, IconButton, Button, Text } from "@chakra-ui/react";
import { ListPagination } from "@components/pagination";



export default function BlogPostList() {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
        cell: function render({ getValue }) {
          return (
            <Box overflow="hidden" maxW="200px">
              <Text isTruncated>{getValue() as string}</Text>
            </Box>
          )
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return new Date(getValue<any>()).toLocaleString(undefined, {
            timeZone: "UTC",
          });
        },
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
    refineCore: {
      setCurrent,
      pageCount,
      current,
      pageSize
    },
  } = useTable({
    columns,
  });

  return (
    <List createButtonProps={{ colorScheme: "green", variant: "solid" }}>
      <TableContainer>
        <Table variant='striped'>
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
