import { clerkMiddleware } from "@clerk/nextjs/server";

// Use Clerk's direct Frontend API connection. The opt-in proxy does not
// support development instances, which are used for this evaluation app.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
