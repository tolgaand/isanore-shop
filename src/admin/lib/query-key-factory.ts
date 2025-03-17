import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export type TQueryKey<TKey> = {
  all: readonly [TKey];
  lists: () => readonly [...TQueryKey<TKey>["all"], "list"];
};

export type UseQueryOptionsWrapper<
  // Return type of queryFn
  TQueryFn = unknown,
  // Type thrown in case the queryFn rejects
  E = Error,
  // Query key type
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFn, E, TQueryFn, TQueryKey>,
  "queryKey" | "queryFn"
>;

export const queryKeysFactory = <T>(globalKey: T) => {
  const queryKeyFactory: TQueryKey<T> = {
    all: [globalKey],
    lists: () => [...queryKeyFactory.all, "list"],
  };
  return queryKeyFactory;
};
