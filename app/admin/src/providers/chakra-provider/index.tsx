// app/providers.tsx
'use client'

import { ChakraProvider,extendTheme } from '@chakra-ui/react'
import { RefineThemes } from "@refinedev/chakra-ui";

export function ChakraUIProvider({ children }: { children: React.ReactNode }) {
    const customTheme = extendTheme({
    ...RefineThemes.Blue,
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
  });
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}
