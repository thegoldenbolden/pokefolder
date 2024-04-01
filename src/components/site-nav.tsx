import { ActiveLink, type ActiveLinkProps } from "@/components/active-link";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import { Suspense } from "react";

const linkClasses: ActiveLinkProps["classes"] = {
  default: "rounded-none border-b-2 border-b-transparent group h-12 py-1",
  active: "border-b-primary",
  inactive: "hover:border-b-primary/70 focus-visible:border-b-primary/70",
};

export function SiteNav() {
  return (
    <div className="sticky top-0 z-50 h-12 border-b border-b-border bg-canvas px-3 lg:px-0">
      <ScrollArea>
        <nav aria-label="site links">
          <ul className="mx-auto flex w-full max-w-screen-xl items-stretch text-sm tracking-wide">
            <li className="flex items-end">
              <ActiveLink classes={linkClasses} href="/">
                <span className="rounded-sm px-2 py-1 group-data-[active=true]:bg-primary group-data-[active=true]:text-primary-fg">
                  Home
                </span>
              </ActiveLink>
            </li>
            <li className="flex items-end">
              <ActiveLink classes={linkClasses} href="/search">
                <span className="rounded-sm px-2 py-1 group-data-[active=true]:bg-primary group-data-[active=true]:text-primary-fg">
                  Search
                </span>
              </ActiveLink>
            </li>
            <li className="flex items-end">
              <ActiveLink classes={linkClasses} href="/sets">
                <span className="rounded-sm px-2 py-1 group-data-[active=true]:bg-primary group-data-[active=true]:text-primary-fg">
                  Expansions
                </span>
              </ActiveLink>
            </li>
            <li className="flex items-end">
              <Suspense>
                <AuthLink classes={linkClasses} />
              </Suspense>
            </li>
          </ul>
        </nav>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

async function AuthLink(props: Omit<ActiveLinkProps, "href">) {
  // const user = await getUser();
  const user = null;

  if (!user) {
    return (
      <ActiveLink {...props} href="/login">
        <span className="rounded-sm px-2 py-1 group-data-[active=true]:bg-primary group-data-[active=true]:text-primary-fg">
          Login
        </span>
      </ActiveLink>
    );
  }

  return (
    <ActiveLink {...props} href="/logout">
      <span className="rounded-sm px-2 py-1 group-data-[active=true]:bg-primary group-data-[active=true]:text-primary-fg">
        Logout
      </span>
    </ActiveLink>
  );
}
