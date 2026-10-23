import { authorize } from "@/lib/api-auth";
import { errorResponse } from "@/lib/record-store";
import { objectBody, RequestError } from "@/lib/record-policy";
import { readJson } from "@/lib/request-body";
import { allocationBalance, diversionVariance, curtailmentExposure } from "@/lib/fp-features";
const FNS: Record<string, (r: Record<string, unknown>[]) => unknown> = { allocationBalance: allocationBalance, diversionVariance: diversionVariance, curtailmentExposure: curtailmentExposure };
export async function POST(request: Request) {
  try {
    await authorize("write");
    const body = objectBody(await readJson(request as never));
    const fn = FNS[String(body.feature ?? "")];
    if (!fn) throw new RequestError("Unknown fallback feature", 404);
    if (!Array.isArray(body.records)) throw new RequestError("records array of own records is required", 422);
    // Offline deterministic fallback only — never calls a provider, regardless of keys.
    return Response.json({ result: fn(body.records as Record<string, unknown>[]) });
  } catch (e) { return errorResponse(e); }
}
