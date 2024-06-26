




type GenerateUseOneSubscriptionParams = {
  resource: import camelCase from "camelcase";
import * as gql from "gql-query-builder";
import pluralize from "pluralize";
import type { MetaQuery, BaseKey } from "@refinedev/core";string;
  meta: MetaQuery;
  id?: BaseKey;
};

type GenerateUseOneSubscriptionReturnValues = {
  variables: any;
  query: string;
  operation: string;
};

export const generateUseOneSubscription = ({
  resource,
  meta,
  id,
}: GenerateUseOneSubscriptionParams): GenerateUseOneSubscriptionReturnValues => {
  if (!id) {
    console.error(
      "[useSubscription]: `id` is required in `params` for graphql subscriptions",
    );
  }

  const singularResource = pluralize.singular(resource);
  const camelResource = camelCase(singularResource);

  const operation = meta.operation ?? camelResource;

  const { query, variables } = gql.subscription({
    operation,
    variables: {
      id: { value: id, type: "ID", required: true },
    },
    fields: meta.fields,
  });

  return { query, variables, operation };
};
