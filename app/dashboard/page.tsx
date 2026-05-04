import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { DashboardThemeToggle } from "@/components/dashboard-theme-toggle";
import { SignOutForm } from "@/components/sign-out-form";

const chartData = [
  { label: "Mon", value: 22 },
  { label: "Tue", value: 31 },
  { label: "Wed", value: 18 },
  { label: "Thu", value: 42 },
  { label: "Fri", value: 35 },
  { label: "Sat", value: 26 },
  { label: "Sun", value: 39 },
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const maxValue = Math.max(...chartData.map((day) => day.value));

  return (
    <main className="min-h-dvh bg-background p-6 text-foreground">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5">
          <div>
            <h1 className="font-semibold text-2xl">Operations Dashboard</h1>
            <h1 className="font-semibold text-2xl">Node.js Dashboard</h1>
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

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 font-medium text-lg">Dashboard Inputs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              Full name
              <input
                className="rounded-md border border-border bg-background px-3 py-2"
                name="fullName"
                placeholder="Jane Doe"
                type="text"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Department
              <input
                className="rounded-md border border-border bg-background px-3 py-2"
                name="department"
                placeholder="Sales"
                type="text"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:col-span-2">
              Project title
              <input
                className="rounded-md border border-border bg-background px-3 py-2"
                name="projectTitle"
                placeholder="Q2 Revenue Dashboard"
                type="text"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:col-span-2">
              Notes
              <textarea
                className="min-h-28 rounded-md border border-border bg-background px-3 py-2"
                name="notes"
                placeholder="Add your dashboard notes here..."
              />
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 font-medium text-lg">Weekly Activity</h2>
          <div className="space-y-3">
            {chartData.map((item) => (
              <div
                className="grid grid-cols-[48px_1fr_48px] items-center gap-3"
                key={item.label}
              >
                <span className="text-muted-foreground text-sm">
                  {item.label}
                </span>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-blue-500 dark:bg-blue-400"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-right text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
