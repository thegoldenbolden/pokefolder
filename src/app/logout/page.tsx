import { logout } from "@/actions/auth";
import { Logout } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  return (
    <main className="mt-36 px-3">
      <section className="mx-auto flex w-full max-w-sm flex-col gap-8 rounded-xl border border-border bg-muted p-6 text-muted-fg shadow-2xl shadow-border">
        <div>
          <h2 className="text-xl font-bold">Logout of Pokefolder?</h2>
          <p className="text-fg-soft">
            You can always log back in at any time.
          </p>
        </div>
        <form action={logout} className="flex w-full flex-col gap-2 rounded-xl">
          <Button className="grow gap-3 px-3 py-2" variant="outline">
            <Logout />
            Logout
          </Button>
        </form>
      </section>
    </main>
  );
}
