"use client";

import { Box, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Edit } from "@refinedev/chakra-ui";
import { useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import { Controller } from "react-hook-form";

export default function CategoryEdit() {

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <Edit contentProps={{
      my: 6,
      px: 12,
      py: 3,
      rounded: "xl",

    }}>
      <form onSubmit={handleSubmit(onFinish)}>
        <FormControl my={5} maxW="30rem">
          <FormLabel>名前</FormLabel>
          <Input required  {...register("name",{required: true})} />
          <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
        </FormControl>
        <FormControl my={5}  maxW="30rem">
          <FormLabel>メールアドレス</FormLabel>
          <Input required type="email" {...register("email",{required: true,})} />
          <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
        </FormControl>
      </form>
    </Edit>
  );
}
