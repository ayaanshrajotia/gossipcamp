import { access } from "fs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPaths = path === "/login" || path === "/signup";
    const accessToken = request.cookies.get("accessToken")?.value || "";

    if (publicPaths && accessToken) {
        return NextResponse.redirect(new URL("/home", request.nextUrl));
    }

    if (!publicPaths && !accessToken) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    return;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/home", "/login", "/signup"],
};
