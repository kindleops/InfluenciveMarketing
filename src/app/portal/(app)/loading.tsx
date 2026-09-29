import { Skeleton } from "@/components/portal/ui";

/** Layout-preserving placeholder while a section's data loads. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" style={{ display: "grid", gap: "1.5rem", paddingTop: "0.5rem" }}>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <Skeleton h={14} w={140} />
        <Skeleton h={34} w="min(420px, 70%)" />
        <Skeleton h={16} w="min(560px, 90%)" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <Skeleton h={132} r={16} />
        <Skeleton h={132} r={16} />
        <Skeleton h={132} r={16} />
        <Skeleton h={132} r={16} />
      </div>
      <Skeleton h={320} r={16} />
    </div>
  );
}
