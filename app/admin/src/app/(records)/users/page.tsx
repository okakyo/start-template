import { useTable } from "@refinedev/core";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import { List, ShowButton, DeleteButton, DateField } from "@refinedev/chakra-ui";
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack, Text} from "@chakra-ui/react";


export default function UserListPage() {
  return (
    <List>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
          </Tbody>
        </Table>
      </TableContainer>
    </List>
  );
}
