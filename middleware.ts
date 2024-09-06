import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoutes = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/api/uploadthing",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  
  // If it's an UploadThing request or a public route, allow it
  if (isPublicRoutes(req)) {
    return NextResponse.next();
  }

  // If user is not logged in and trying to access a protected route
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};