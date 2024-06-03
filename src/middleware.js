import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const response = await fetch("http://localhost:3001/api");

    if (response.status === 200) {
      // Proceed with the request
      return NextResponse.next();
    } else {
      // Show <noserver/> component
      const html = "<noserver/>";
      return new NextResponse(html, {
        headers: { "Content-Type": "text/html" },
      });
    }
  } catch (error) {
    // If there's an error (e.g., server is down), show <noserver/> component
    const html = "<h1>oopss<h1/>";
    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  }
}

// Specify the paths where this middleware should run
export const config = {
  matcher: "/:path*",
};
