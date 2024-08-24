"use client";

import { Avatar, Box, Container, Flex, Heading, VStack, Table, Text,Tr,Td, Tbody, Thead, TableContainer, Grid, GridItem, SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { Show, Title } from "@refinedev/chakra-ui";
import { useGo, useList, useNavigation, useOne, useResource, useShow } from "@refinedev/core";
import { useRouter } from "next/router";
import React from "react";

export default function CategoryShow() {
  const { queryResult } = useShow({});
  const go = useGo();
  const { data } = queryResult;

  const record = data?.data;
  const postList = useList({
    resource: "posts",
    filters: [{
      field: "author_id",
      operator: "eq",
      value: record?.id
    }]
  })

  const postListData = postList.data?.data;
  return (
    <Show>
      <Flex w="full">
        <VStack maxW="md" mt={12} px={4} py={6}>
          <Avatar size="2xl" name={record?.name} src={record?.thumbnailUrl} />
          <Box mt={6}>
            <Heading size="lg">{ record?.name ?? ""}</Heading>
            <Text fontSize="lg" mt={2} color="gray.600" textOverflow="ellipsis">{ record?.id }</Text>
          </Box>
        </VStack>
        <SimpleGrid spacing={4} w="full">
          <Card>
            <CardBody>
              <Heading size="md">Title</Heading>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Flex>
      <TableContainer>
        <Table mt={12}>
          <Thead>
            <Tr>
              <Td>Title</Td>
            </Tr>
          </Thead>
          <Tbody>

          {!postListData ? <></> : postListData.map((post: any) => (
            <Tr cursor="pointer" _hover={{ bg: "gray.700" }} transitionDuration="150ms"
              onClick={() => go({
                to: {
                  resource: "posts",
                  action: "show",
                  id: post.id,
                  }
            })} key={post.id}>
              <Td>{post.title}</Td>
            </Tr>
          ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Show>
  );
}
