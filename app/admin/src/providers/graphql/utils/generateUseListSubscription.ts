





type GenerateUseListSubscriptionParams = {
  resource: string;
  meta: MetaQuery;
  paginatimport { generateFilter } from "./generateFilter";
import { generateSort } from "./generateSort";
import camelCase from "camelcase";
import * as gql from "gql-query-builder";
import type {
  MetaQuery,
  Pagination,
  CrudSorting,
  CrudFilters,
} from "@refinedev/core";ion?: Pagination;
  sorters?: CrudSorting;
  filters?: CrudFilters;
};

type GenerateUseListSubscriptionReturnValues = {
  variables: any;
  query: string;
  operation: string;
};

export const generateUseListSubscription = ({
  resource,
  meta,
  pagination,
  sorters,
  filters,
}: GenerateUseListSubscriptionParams): GenerateUseListSubscriptionReturnValues => {
  const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

  const sortBy = generateSort(sorters);
  const filterBy = generateFilter(filters);

  const camelResource = camelCase(resource);

  const operation = meta.operation ?? camelResource;

  const { query, variables } = gql.subscription({
    operation,
    variables: {
      ...meta.variables,
      sort: sortBy,
      where: { value: filterBy, type: "JSON" },
      ...(mode === "server"
        ? {
            start: (current - 1) * pageSize,
            limit: pageSize,
          }
        : {}),
    },
    fields: meta.fields,
  });

  return { query, variables, operation };
};
