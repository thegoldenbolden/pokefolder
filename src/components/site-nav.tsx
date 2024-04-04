import { ActiveLink, type ActiveLinkProps } from "@/components/active-link";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import { Suspense } from "react";

const linkClasses: ActiveLinkProps["classes"] = {
  default:
    "rounded-none group font-semibold outline-none focus-visible:outline-none border-b-2 text-fg-soft border-b-transparent group h-12 py-1",
  active: "border-b-primary text-fg",
  inactive:
    "hover:border-b-primary/70 hover:text-fg focus-visible:border-b-primary/70",
};

export function SiteNav() {
  return (
    <div className="sticky top-0 z-50 h-12 border-b border-b-border bg-canvas px-3 lg:px-0">
      <ScrollArea>
        <nav aria-label="site links">
          <ul className="mx-auto flex w-full max-w-screen-xl items-stretch text-sm tracking-wide">
            <li className="flex items-end">
              <ActiveLink classes={linkClasses} href="/">
                <span className="rounded-sm px-2 py-1 text-fg-soft group-focus-visible:ring group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-canvas group-data-[active=true]:text-fg">
                  Home
                </span>
              </ActiveLink>
            </li>
            <li className="flex items-end">
              <ActiveLink classes={linkClasses} href="/search">
                <span className="rounded-sm px-2 py-1 text-fg-soft group-focus-visible:ring group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-canvas group-data-[active=true]:text-fg">
                  Search
                </span>
              </ActiveLink>
            </li>
            <li className="flex items-end">
              <ActiveLink classes={linkClasses} href="/sets">
                <span className="rounded-sm px-2 py-1 text-fg-soft group-focus-visible:ring group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-canvas group-data-[active=true]:text-fg">
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
        <span className="rounded-sm px-2 py-1 text-fg-soft group-focus-visible:ring group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-canvas group-data-[active=true]:text-fg">
          Login
        </span>
      </ActiveLink>
    );
  }

  return (
    <ActiveLink {...props} href="/logout">
      <span className="rounded-sm px-2 py-1 text-fg-soft group-focus-visible:ring group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-canvas group-data-[active=true]:text-fg">
        Logout
      </span>
    </ActiveLink>
  );
}
