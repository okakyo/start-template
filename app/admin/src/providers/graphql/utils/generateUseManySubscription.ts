



type GenerateUseManySubscriptionParams = {
  resource: import camelCase from "camelcase";
import * as gql from "gql-query-builder";
import type { BaseKey, MetaQuery } from "@refinedev/core";string;
  meta: MetaQuery;
  ids?: BaseKey[];
};

type GenerateUseManySubscriptionReturnValues = {
  variables: any;
  query: string;
  operation: string;
};

export const generateUseManySubscription = ({
  resource,
  meta,
  ids,
}: GenerateUseManySubscriptionParams): GenerateUseManySubscriptionReturnValues => {
  if (!ids) {
    console.error(
      "[useSubscription]: `ids` is required in `params` for graphql subscriptions",
    );
  }

  const camelResource = camelCase(resource);

  const operation = meta.operation ?? camelResource;

  const { query, variables } = gql.subscription({
    operation,
    variables: {
      where: {
        value: { id_in: ids },
        type: "JSON",
      },
    },
    fields: meta.fields,
  });

  return { query, variables, operation };
};
