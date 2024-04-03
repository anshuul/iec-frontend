import { NextResponse } from 'next/server';

let requestedPath;

export default function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token');

    // If it's a protected route and not logged in, store the requested URL and redirect to the login page
    if (!isPublicPath && !token) {
        requestedPath = path;
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // On the login route, continue to the current page if logged in
    if (path === '/login' && token) {
        const url = request.nextUrl.clone();
        url.pathname = requestedPath || '/';
        return NextResponse.redirect(url);
    }

    // Allow access if authorized
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/sales-marketing',
        '/store-purchase',
        '/production/:path*',
        '/quality',
    ]
};