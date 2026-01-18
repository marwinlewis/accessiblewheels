import { NextResponse } from "next/server";

const getShops = async () => {
  try {
    const { NEXT_PUBLIC_API_ORIGIN, API_AUTH_TOKEN } = process.env;
    const response = await fetch(
      `${NEXT_PUBLIC_API_ORIGIN}/api/shops?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${API_AUTH_TOKEN}`,
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return NextResponse.json({
        shops: data.data,
        status: response.status,
        statusText: response.statusText,
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch shops data" },
      { status: response.status },
    );
  } catch (err) {
    console.error("Shops route error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

const getPage = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/page?filters[slug][$eq]=${slug}&populate=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
    },
  );

  const data = await response.json();
  if (response.ok) {
    return NextResponse.json({
      page: data.data,
      status: response.status,
      statusText: response.statusText,
    });
  }
  return NextResponse.json(
    { error: "Failed to fetch shops data" },
    { status: response.status },
  );
};

export { getShops, getPage };
