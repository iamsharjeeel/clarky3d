import { NextResponse, type NextRequest } from "next/server";
import { legacyPathToSlug } from "@/lib/content/legacy";

export function middleware(request: NextRequest) {
  const legacy = request.nextUrl.searchParams.get("p");
  if (!legacy) {
    return NextResponse.next();
  }

  const slug = legacyPathToSlug(legacy);
  if (!slug) {
    const url = request.nextUrl.clone();
    url.pathname = "/work";
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/work/${slug}`;
  url.search = "";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/",
};
