import { Discord } from "@/components/icons";
import { Link } from "@/components/ui/link";
import { isAuthenticated } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  if (await isAuthenticated()) {
    redirect("/");
  }

  return (
    <main className="mt-36 px-3">
      <section className="mx-auto flex w-full max-w-sm flex-col gap-8 rounded-xl border border-border bg-muted p-6 text-muted-fg shadow-2xl shadow-border">
        <div>
          <p className="text-fg-soft">Welcome back!</p>
          <h2 className="text-xl font-bold">Login to Pokefolder</h2>
        </div>
        <div className="flex w-full flex-col gap-2 rounded-xl">
          <Link
            className="grow gap-3 rounded-md px-3 py-2"
            variant="outline"
            href="/login/discord"
          >
            <Discord />
            Login with Discord
          </Link>
        </div>
      </section>
    </main>
  );
}
