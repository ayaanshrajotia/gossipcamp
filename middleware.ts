import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RootState, store } from "./lib/store";

// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
    const state: RootState = store.getState();

    const userData = state.user;
    console.log(userData);

    const publicRoutes =
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/signup";

    if (publicRoutes && !userData) {
        return NextResponse.redirect(new URL("/home", request.nextUrl));
    }

    if (!publicRoutes && userData) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [],
};
