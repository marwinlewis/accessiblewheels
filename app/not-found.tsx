import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Not Found!",
    robots: "noindex",
  };
}

export default function NotFound() {
  return (
    <>
      <h1>404 - Page not found!</h1>
      <p>
        <Link href="/">Go back home</Link>
      </p>
    </>
  );
}
