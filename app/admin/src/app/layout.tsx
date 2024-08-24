import { DevtoolsProvider } from "@providers/devtools";
import routerProvider from "@refinedev/nextjs-router";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { Refine } from "@refinedev/core";
import { Metadata } from "next";
import React, { Suspense } from "react";

import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/data-provider";
import { ChakraProvider } from "@chakra-ui/react";
import { useNotificationProvider } from "@refinedev/chakra-ui";


export const metadata: Metadata = {
  title: "Refine",
  description: "Generated by create refine app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Suspense>
          <ChakraProvider>
            <RefineKbarProvider>
              <DevtoolsProvider>
                <Refine
                  routerProvider={routerProvider}
                  dataProvider={dataProvider}
                  authProvider={authProvider}
                  notificationProvider={useNotificationProvider}
                  resources={[
                    {
                      name: "users",
                      list: "/users",
                      create: "/users/create",
                      edit: "/users/edit/:id",
                      show: "/users/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },{
                      name: "posts",
                      list: "/posts",
                      create: "/posts/create",
                      edit: "/posts/edit/:id",
                      show: "/posts/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "jClVKB-qCclcW-JsUeBY",
                  }}
                >
                  {children}
                  <RefineKbar />
                </Refine>
              </DevtoolsProvider>
            </RefineKbarProvider>
          </ChakraProvider>
        </Suspense>
      </body>
    </html>
  );
}
