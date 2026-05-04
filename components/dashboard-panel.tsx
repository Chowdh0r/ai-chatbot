"use client";

import { useMemo, useState } from "react";

type DashboardForm = {
  department: string;
  fullName: string;
  notes: string;
  projectTitle: string;
};

const baseChartData = [
  { label: "Mon", value: 22 },
  { label: "Tue", value: 31 },
  { label: "Wed", value: 18 },
  { label: "Thu", value: 42 },
  { label: "Fri", value: 35 },
  { label: "Sat", value: 26 },
  { label: "Sun", value: 39 },
];

const initialForm: DashboardForm = {
  department: "",
  fullName: "",
  notes: "",
  projectTitle: "",
};

export function DashboardPanel() {
  const [draft, setDraft] = useState<DashboardForm>(initialForm);
  const [submitted, setSubmitted] = useState<DashboardForm>(initialForm);

  const boost = useMemo(() => {
    const totalLength = Object.values(submitted).join("").length;
    return Math.min(14, Math.floor(totalLength / 8));
  }, [submitted]);

  const chartData = useMemo(
    () =>
      baseChartData.map((item) => ({
        ...item,
        value: Math.min(100, item.value + boost),
      })),
    [boost]
  );

  const maxValue = Math.max(...chartData.map((day) => day.value));

  return (
    <>
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-medium text-lg">Dashboard Inputs</h2>

        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(draft);
          }}
        >
          <label className="flex flex-col gap-2 text-sm">
            Full name
            <input
              className="rounded-md border border-border bg-background px-3 py-2"
              name="fullName"
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  fullName: event.target.value,
                }))
              }
              placeholder="Jane Doe"
              type="text"
              value={draft.fullName}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Department
            <input
              className="rounded-md border border-border bg-background px-3 py-2"
              name="department"
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  department: event.target.value,
                }))
              }
              placeholder="Sales"
              type="text"
              value={draft.department}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm md:col-span-2">
            Project title
            <input
              className="rounded-md border border-border bg-background px-3 py-2"
              name="projectTitle"
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  projectTitle: event.target.value,
                }))
              }
              placeholder="Q2 Revenue Dashboard"
              type="text"
              value={draft.projectTitle}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm md:col-span-2">
            Notes
            <textarea
              className="min-h-28 rounded-md border border-border bg-background px-3 py-2"
              name="notes"
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
              placeholder="Add your dashboard notes here..."
              value={draft.notes}
            />
          </label>

          <div className="md:col-span-2">
            <button
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-500"
              type="submit"
            >
              Submit and update dashboard
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-medium text-lg">Weekly Activity</h2>
        <p className="mb-4 text-muted-foreground text-sm">
          Last submitted by {submitted.fullName || "-"} (
          {submitted.department || "-"})
        </p>
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
    </>
  );
}
