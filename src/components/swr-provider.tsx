"use client";

import { SWRConfig } from "swr";

export function SWRProvider(props: React.ComponentProps<typeof SWRConfig>) {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
      {...props}
    >
      {props.children}
    </SWRConfig>
  );
}
