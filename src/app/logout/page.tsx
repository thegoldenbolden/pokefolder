import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main>
      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </main>
  );
}
