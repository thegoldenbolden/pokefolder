'use client';
import { SWRConfig as SWRSWRConfig } from 'swr';

export default function SWRConfig(props: React.PropsWithChildren) {
  return (
    <SWRSWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: async (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {props.children}
    </SWRSWRConfig>
  );
}
