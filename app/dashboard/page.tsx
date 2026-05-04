import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { DashboardPanel } from "@/components/dashboard-panel";
import { DashboardThemeToggle } from "@/components/dashboard-theme-toggle";
import { SignOutForm } from "@/components/sign-out-form";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <main className="min-h-dvh bg-background p-6 text-foreground">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5">
          <div>
            <h1 className="font-semibold text-2xl">Operations Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Signed in as {session.user.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DashboardThemeToggle />
            <div className="rounded-md border border-border px-3 py-2 text-sm">
              <SignOutForm />
            </div>
          </div>
        </header>

        <DashboardPanel />
      </section>
    </main>
  );
}
