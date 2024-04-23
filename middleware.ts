import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import axiosInstance from "./app/utils/axios";
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPaths = path === "/login" || path === "/signup";
    const accessToken = request.cookies.get("AccessToken")?.value || "";
    const profile = request.cookies.get("profile")?.value || "";
    if (
        accessToken &&
        profile === "null" &&
        path !== "/home" &&
        !path.startsWith("/explore") &&
        path !== "/create-avatar"
    ) {
        return NextResponse.redirect(new URL("/home", request.nextUrl));
    }

    if (
        accessToken &&
        profile === "null" &&
        (path === "/home" ||
            path.startsWith("/explore") ||
            path === "/create-avatar")
    ) {
        return;
    }

    if (accessToken && profile !== "null" && path === "/create-avatar") {
        return NextResponse.redirect(new URL("/home", request.nextUrl));
    }

    if (publicPaths && accessToken && profile !== "null") {
        return NextResponse.redirect(new URL("/home", request.nextUrl));
    }

    if (!publicPaths && !accessToken) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    if (accessToken && profile === "null" && path !== "/create-avatar") {
        return NextResponse.redirect(
            new URL("/create-avatar", request.nextUrl)
        );
    }

    return;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/home",
        "/login",
        "/signup",
        "/create-avatar",
        "/explore/:path*",
        "/rooms/:path*",
    ],
};
