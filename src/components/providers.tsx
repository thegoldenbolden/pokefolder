"use client";
import { SWRConfig } from "swr";

export function SWRProvider(props: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: async (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {props.children}
    </SWRConfig>
  );
}
