import { NextResponse } from "next/server";

// Server-side geocode proxy using Nominatim (OpenStreetMap) for Leaflet.js
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    if (!q)
      return NextResponse.json(
        { error: "Missing query parameter 'q'" },
        { status: 400 }
      );

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q
    )}&countrycodes=in&format=json&limit=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "adapted-vehicle-app",
      },
    });
    if (!res.ok)
      return NextResponse.json(
        { error: "Geocoding service error" },
        { status: 502 }
      );

    const data = await res.json();
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    const top = data[0];
    const location = {
      lat: parseFloat(top.lat),
      lng: parseFloat(top.lon),
    };

    return NextResponse.json({
      formatted_address: top.display_name,
      location,
      addressType: top.addresstype,
    });
  } catch (err) {
    console.error("Geocode route error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
