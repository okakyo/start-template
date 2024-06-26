import React from "react";
import { Center } from "@chakra-ui/react";
import { AuthPage } from "@refinedev/chakra-ui"
export default function AuthLayout({ children }: { children: React.ReactElement }) {
  return <>
    {children}
  </>
}
