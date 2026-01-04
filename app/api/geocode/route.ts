import { NextResponse } from "next/server";

// Server-side geocode proxy. Requires GOOGLE_MAPS_SERVER_API_KEY in environment.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    if (!q)
      return NextResponse.json(
        { error: "Missing query parameter 'q'" },
        { status: 400 }
      );

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key)
      return NextResponse.json(
        { error: "Missing server API key" },
        { status: 500 }
      );

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      q
    )}&components=country:IN&key=${encodeURIComponent(key)}`;

    console.log({ url });

    const res = await fetch(url);
    if (!res.ok)
      return NextResponse.json(
        { error: "Geocoding service error" },
        { status: 502 }
      );

    const data = await res.json();
    if (
      !data ||
      data.status !== "OK" ||
      !data.results ||
      data.results.length === 0
    ) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    const top = data.results[0];
    const location = top.geometry?.location || null;

    return NextResponse.json({
      formatted_address: top.formatted_address,
      location,
    });
  } catch (err) {
    console.error("Geocode route error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
