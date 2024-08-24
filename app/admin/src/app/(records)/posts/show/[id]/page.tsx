"use client";

import { Box, Heading } from "@chakra-ui/react";
import { Show } from "@refinedev/chakra-ui";
import { useNavigation, useOne, useResource, useShow } from "@refinedev/core";
import React from "react";

export default function BlogPostShow() {
  const { queryResult } = useShow({});
  const { data } = queryResult;

  const record = data?.data;

  return (
    <Show>
      <Box>
        <Box mt={3}>
          <Heading>ID</Heading>
          <div>{ record?.id ?? ""}</div>
        </Box>
        <Box mt={3}>
          <Heading>Title</Heading>
          <div>{record?.title ?? ""}</div>
          </Box>
      </Box>
    </Show>
  );
}
