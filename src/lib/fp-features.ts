// Deterministic offline fallback over the app's own records. Never calls a provider.
export type FpRecord = Record<string, unknown>;
export const FP_LABEL = "Deterministic fallback — no AI provider called";
export function filterRecords(rows: FpRecord[], opts: { q?: string; status?: string } = {}): FpRecord[] {
  const q = (opts.q ?? "").trim().toLowerCase(); const status = (opts.status ?? "").trim();
  return rows.filter(r => (!status || String(r.status ?? "") === status) && (!q || Object.values(r).some(v => v != null && String(v).toLowerCase().includes(q))));
}
export function filterTasks<T extends FpRecord>(rows: T[], opts: { q?: string; status?: string; priority?: string } = {}): T[] {
  const q = (opts.q ?? "").trim().toLowerCase();
  return rows.filter(r => (!opts.status || String(r.status ?? "") === opts.status) && (!opts.priority || String(r.priority ?? "") === opts.priority) && (!q || [r.title, r.description].some(v => v != null && String(v).toLowerCase().includes(q))));
}
export function recordsToCsv(rows: FpRecord[], columns?: string[]): string {
  const cols = columns ?? Object.keys(rows[0] ?? {});
  const esc = (v: unknown) => { const s = v == null ? "" : v instanceof Date ? v.toISOString() : typeof v === "object" ? JSON.stringify(v) : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return [cols.join(","), ...rows.map(r => cols.map(c => esc(r[c])).join(","))].join("\n");
}
export function exportRecords(rows: FpRecord[], format: string, columns?: string[]) {
  if (format === "csv") return { contentType: "text/csv; charset=utf-8", body: recordsToCsv(rows, columns) };
  if (format === "json") return { contentType: "application/json", body: JSON.stringify(rows, null, 2) };
  throw new Error("Choose JSON or CSV");
}
function num(v: unknown): number { const n = Number(v); return Number.isFinite(n) ? n : 0; }
export function summarize(feature: string, label: string, records: FpRecord[], primaryField: string) {
  const rows = Array.isArray(records) ? records : [];
  const totalPrimary = rows.reduce((s, r) => s + num(r[primaryField]), 0);
  const open = rows.filter(r => !["Approved", "Closed", "DONE"].includes(String(r.status ?? ""))).length;
  const doneFalse = rows.filter(r => r.done === false).length;
  const emptyPrimary = rows.filter(r => r[primaryField] == null || r[primaryField] === "").length;
  return { aiGenerated: false as const, source: "deterministic-fallback", label: FP_LABEL, feature, title: label,
    summary: `${label}: ${rows.length} record(s) reviewed; ${open} not approved/closed; primary total ${totalPrimary}.`,
    findings: [`Records reviewed: ${rows.length}`, `Not approved/closed: ${open}`, `done=false count: ${doneFalse}`, `Empty ${primaryField}: ${emptyPrimary}`, `Primary (${primaryField}) total: ${totalPrimary} (0 preserved when none)`],
    metrics: { records: rows.length, open, doneFalse, emptyPrimary, totalPrimary, hasRecords: rows.length > 0 } };
}

export function allocationBalance(records: FpRecord[]) { return summarize("allocationBalance", "Water allocation balance", records, "allocationUnits"); }

export function diversionVariance(records: FpRecord[]) { return summarize("diversionVariance", "Diversion and delivery variance", records, "cumulativeUnits"); }

export function curtailmentExposure(records: FpRecord[]) { return summarize("curtailmentExposure", "Curtailment and transfer exposure", records, "units"); }

export const FP_FEATURES = [allocationBalance, diversionVariance, curtailmentExposure] as const;
