const COUNTER_KEY = "muhamad-rusdiana-portfolio-visitors-v1";
const COUNTER_ORIGIN = "https://countapi.mileshilliard.com/api/v1";

export const dynamic = "force-dynamic";

type CounterResponse = {
  value?: number | string;
};

async function requestCount(action: "get" | "hit") {
  const response = await fetch(`${COUNTER_ORIGIN}/${action}/${COUNTER_KEY}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error("Counter request failed");

  const data = (await response.json()) as CounterResponse;
  const count = Number(data.value);
  if (!Number.isFinite(count)) throw new Error("Invalid counter response");

  return count;
}

function counterResponse(count: number) {
  return Response.json(
    { count },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

function unavailableResponse() {
  return Response.json(
    { error: "Visit counter is temporarily unavailable." },
    { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function GET() {
  try {
    return counterResponse(await requestCount("get"));
  } catch {
    return unavailableResponse();
  }
}

export async function POST() {
  try {
    return counterResponse(await requestCount("hit"));
  } catch {
    return unavailableResponse();
  }
}
