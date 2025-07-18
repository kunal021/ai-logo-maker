"use client";

import { useSearchParams, useRouter } from "next/navigation";

export function usePageQuery(
  key: string = "string",
  defaultValue: string = ""
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentQuery = searchParams.get(key) || defaultValue;

  const setQuery = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const clearQuery = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return {
    currentQuery,
    setQuery,
    clearQuery,
  };
}
