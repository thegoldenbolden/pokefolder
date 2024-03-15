"use client";

import { getQueryKeys, getURL } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

function Searchbar(props: React.ComponentProps<"form">) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const url = new URL(`${getURL("/search")}`);

        const keys = getQueryKeys();

        keys.forEach((q) => {
          const value = form.getAll(q);
          if (value.length && value[0].toString().length) {
            url.searchParams.set(q, value.toString());
          }
        });

        url.href = decodeURIComponent(url.href);
        url.href = url.href.replaceAll(/(,\++)/gi, ",");

        if (pathname === "/search") {
          window.history.pushState(null, "", url.href);
        } else {
          router.push(url.href);
        }
      }}
      {...props}
    />
  );
}

export { Searchbar };
