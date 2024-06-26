"use client";

import graphqlDataProvider, { GraphQLClient } from "@refinedev/graphql";

const API_URL = "https://localhost:5050/graphql";

export const client = new GraphQLClient(API_URL);

export const dataProvider = graphqlDataProvider(client);
