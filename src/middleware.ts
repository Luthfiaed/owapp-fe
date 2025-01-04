import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get("access_token")

    if (!cookie) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile',
        '/products'
    ]
}